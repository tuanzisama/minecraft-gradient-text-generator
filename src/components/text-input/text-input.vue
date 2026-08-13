<template>
  <mcg-card class="text-input">
    <div class="text-input__inner" ref="inputRef"></div>
  </mcg-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, shallowRef } from "vue";
import EditorJS from '@editorjs/editorjs';
import Underline from '@editorjs/underline';
import Strikethrough from '@sotaproject/strikethrough';
import ObfuscatedTool from "./obfuscated-tool";
import { isEmpty } from "lodash-es";
import { useI18n } from "vue-i18n";
import { randomObfuscatedText } from "@/utils/obfuscated";

const i18n = useI18n()

const props = withDefaults(defineProps<TextInputProps>(), {});
const emit = defineEmits<TextInputEmit>();
const inputRef = ref<HTMLDivElement>();

const editorInstance = shallowRef();
let obfuscatedPreviewTimer: number | null = null;
let domMutationObserver: MutationObserver | null = null;
let syncDebounceTimer: number | null = null;
let isSyncingEditor = false;
let lastSavedText = "";

type EditorSavedBlock = { data: { text: string } };
type EditorSaveResult = { blocks: EditorSavedBlock[] };

const privateValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const scheduleSync = () => {
  if (syncDebounceTimer !== null) return;
  syncDebounceTimer = window.setTimeout(() => {
    syncDebounceTimer = null;
    syncEditorValue();
  }, 150);
};

onMounted(() => {
  const instance = new EditorJS({
    holder: inputRef.value,
    placeholder: i18n.t("input.placeholder"),
    inlineToolbar: ['bold', 'italic', 'underline', 'strikethrough', 'obfuscated'],
    tools: {
      underline: Underline,
      strikethrough: Strikethrough,
      obfuscated: {
        class: ObfuscatedTool,
        shortcut: "CMD+K",
        config: {
          onChange: () => syncEditorValue(),
        },
      }
    },
    i18n: {
      messages: {
        toolNames: {
          "Text": i18n.t("input.editor.text"),
          "Bold": i18n.t("input.editor.bold"),
          "Italic": i18n.t("input.editor.italic"),
          "Underline": i18n.t("input.editor.underline"),
          "Strikethrough": i18n.t("input.editor.strikethrough"),
          "Obfuscated": i18n.t("input.editor.obfuscated"),
        },
        ui: {
          "blockTunes": {
            "toggler": {
              "Click to tune": i18n.t("input.editor.toggler.tune"),
              "or drag to move": i18n.t("input.editor.toggler.drag_to_move")
            }
          },
          "toolbar": {
            "toolbox": {
              "Add": i18n.t("input.editor.add")
            }
          },
          "popover": {
            "Filter": i18n.t("input.editor.tune.filter"),
          }
        },
        "blockTunes": {
          "delete": {
            "Delete": i18n.t("input.editor.tune.delete"),
            "Click to delete": i18n.t("input.editor.tune.delete_confirm")
          },
          "moveUp": {
            "Move up": i18n.t("input.editor.tune.move_up")
          },
          "moveDown": {
            "Move down": i18n.t("input.editor.tune.move_down")
          }
        }
      },
    },
    onChange: (api) => syncEditorValue(api)
  })
  editorInstance.value = instance
  obfuscatedPreviewTimer = window.setInterval(updateObfuscatedPreview, 90);

  // EditorJS's own onChange can stop firing after custom inline tool operations.
  // Observe the editor DOM directly and sync on real content changes instead.
  // Attribute-only mutations (e.g. the obfuscated preview animation) are ignored.
  domMutationObserver = new MutationObserver((mutations) => {
    const hasContentMutation = mutations.some((mutation) => mutation.type !== "attributes");
    if (hasContentMutation) scheduleSync();
  });
  if (inputRef.value) {
    domMutationObserver.observe(inputRef.value, { childList: true, subtree: true, characterData: true });
  }
})

onUnmounted(() => {
  editorInstance.value?.destroy()
  if (obfuscatedPreviewTimer !== null) {
    window.clearInterval(obfuscatedPreviewTimer);
  }
  if (syncDebounceTimer !== null) {
    window.clearTimeout(syncDebounceTimer);
  }
  domMutationObserver?.disconnect();
})

const updateObfuscatedPreview = () => {
  inputRef.value?.querySelectorAll<HTMLElement>(".mcg-obfuscated").forEach((element) => {
    const length = element.textContent?.length ?? 0;
    element.dataset.obfuscatedPreview = randomObfuscatedText(length);
  });
}

const stripVolatileAttributes = (html: string) => html.replace(/\sdata-obfuscated-preview="[^"]*"/g, "");

const syncEditorValue = async (api?: { saver: { save: () => Promise<EditorSaveResult> } }) => {
  if (isSyncingEditor) {
    // A sync is already in flight, ensure a follow-up run captures latest DOM.
    scheduleSync();
    return;
  }

  const editor = editorInstance.value;
  if (!editor) return;

  isSyncingEditor = true;

  try {
    const saved = (api ? await api.saver.save() : await editor.save()) as EditorSaveResult | undefined;
    if (!saved) return;

    const { blocks } = saved;
    const normalizedBlocks = blocks.map((block) => ({
      ...block,
      data: { ...block.data, text: stripVolatileAttributes(block.data.text) },
    }));
    const savedText = JSON.stringify(normalizedBlocks.map((block) => block.data.text));
    if (savedText === lastSavedText) return;

    lastSavedText = savedText;
    const richTagChunk = parseBlocks(normalizedBlocks);

    privateValue.value = richTagChunk
    emit('on-change', richTagChunk)
  } finally {
    isSyncingEditor = false;
  }
}

const parseBlocks = (blocks: EditorSavedBlock[]) => {
  return blocks.map<RichTag[]>((block) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(block.data.text, "text/html")

    const nodes = Object.values(doc.body.childNodes).reduce((acc, node) => {
      if (node.nodeType === 3) {
        return acc.concat({ textNode: node, parentNodes: [] });
      } else {
        return acc.concat(textElementRecursion(node, [node]));
      }
    }, [] as NodeRecursionRecord[]);

    const chunks = nodes.map<RichTag>(record => {
      const textContent = record.textNode?.textContent;
      let richTag = { text: textContent } as RichTag

      const format = nodeNameParser(record.parentNodes);
      if (!isEmpty(format)) richTag.format = format

      return richTag;
    })

    return chunks
  })
}

const nodeNameParser = (nodes: ChildNode[]) => {
  const nodeNames = nodes.map(node => node.nodeName)
  let format: Partial<RichTag['format']> = {}
  if (nodeNames.includes('B')) {
    format.bold = true
  }
  if (nodeNames.includes('I')) {
    format.italic = true
  }
  if (nodeNames.includes('U')) {
    format.underlined = true
  }
  if (nodeNames.includes('S')) {
    format.strikethrough = true
  }
  if (nodes.some(isObfuscatedElement)) {
    format.obfuscated = true
  }
  return format as RichTag['format']
}

const isObfuscatedElement = (node: ChildNode) => {
  return node instanceof HTMLElement
    && (node.classList.contains('mcg-obfuscated') || node.dataset.mcgObfuscated === 'true')
}

const textElementRecursion = (node: ChildNode, parentNodes: ChildNode[] = []): NodeRecursionRecord[] => {
  return Object.values(node.childNodes).reduce((acc, item) => {
    if (item.nodeType === 3) {
      return acc.concat({ textNode: item, parentNodes });
    } else {
      return acc.concat(textElementRecursion(item, parentNodes.concat(item)));
    }
  }, [] as NodeRecursionRecord[]);
}
</script>

<script lang="ts">
export interface TextInputProps {
  modelValue: RichTagChunk;
}

export interface TextInputEmit {
  (e: "update:modelValue", value: TextInputProps["modelValue"]): void;
  (e: "on-change", value: TextInputProps["modelValue"]): void;
}

interface NodeRecursionRecord {
  textNode: ChildNode,
  parentNodes: ChildNode[]
}
</script>

<style lang="scss" scoped>
.text-input {
  width: 100%;
  height: 100%;

  &:deep(.mcg-card__body) {
    display: flex;
    flex-direction: column;
    padding: 20px 20px 10px 20px;
  }

  &__inner {
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-family: "Barlow", "Noto Sans SC", sans-serif;
    border: none;
    outline: none;
    resize: none;
    margin-bottom: 10px;
    @include custom-scrollbar();
    overflow-y: auto;

    &:deep(.codex-editor) {
      width: calc(100% - 5px);
      height: 100%;
    }

    &:deep(.mcg-obfuscated) {
      position: relative;
      color: transparent;
      caret-color: var(--td-text-color-primary, CanvasText);

      &::after {
        content: attr(data-obfuscated-preview);
        position: absolute;
        inset: 0 auto auto 0;
        color: var(--td-text-color-primary, CanvasText);
        white-space: pre;
        pointer-events: none;
      }
    }
  }

  &__toolbar {
    display: flex;
    align-items: center;

    .tool-wrapper {
      display: flex;

      .tool-item {
        width: 45px;
        height: 45px;
        margin-right: 5px;
        border-radius: 50%;
        cursor: pointer;
        transition: all .3s;
        user-select: none;
        text-align: center;

        &:hover {
          background: rgb(245, 245, 245);
        }

        &:active {
          background: rgb(224, 224, 224);
        }
      }
    }

    .text-length {
      margin-left: auto;
      opacity: .6;
    }
  }
}
</style>
