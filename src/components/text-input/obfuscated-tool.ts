const OBFUSCATED_TAG = "SPAN";
const OBFUSCATED_CLASS = "mcg-obfuscated";
const OBFUSCATED_DATA_KEY = "mcgObfuscated";

export default class ObfuscatedTool {
  private api: any;
  private button: HTMLButtonElement | null = null;
  private iconClasses: { base: string; active: string };

  constructor({ api }: { api: any }) {
    this.api = api;
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  static get isInline() {
    return true;
  }

  static get shortcut() {
    return "CMD+K";
  }

  static get title() {
    return "Obfuscated";
  }

  static get sanitize() {
    return {
      span: {
        class: OBFUSCATED_CLASS,
        "data-mcg-obfuscated": "true",
      },
    };
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add(this.iconClasses.base, "ce-inline-tool--obfuscated");
    this.button.innerHTML = this.icon;
    return this.button;
  }

  surround(range: Range | null) {
    if (!range || range.collapsed) return;

    const selectedTag = this.findObfuscatedParent();

    if (selectedTag) {
      this.unwrapInsideTag(selectedTag, range);
      this.dispatchInput();
      return;
    }

    if (this.rangeHasObfuscated(range)) {
      this.unwrapFragmentRange(range);
      this.dispatchInput();
      return;
    }

    const wrapper = document.createElement("span");
    wrapper.classList.add(OBFUSCATED_CLASS);
    wrapper.dataset[OBFUSCATED_DATA_KEY] = "true";
    wrapper.append(range.extractContents());
    range.insertNode(wrapper);
    this.api.selection.expandToTag(wrapper);
    this.dispatchInput();
  }

  checkState() {
    const isActive = Boolean(this.findObfuscatedParent());
    this.button?.classList.toggle(this.iconClasses.active, isActive);
    return isActive;
  }

  private get icon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 8h10M7 12h10M7 16h10"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 7l6 10M15 7L9 17"></path>
      </svg>
    `;
  }

  private findObfuscatedParent(): HTMLElement | null {
    const selection = window.getSelection();
    let node = selection?.anchorNode ?? null;

    if (node?.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }

    while (node instanceof HTMLElement) {
      if (node.tagName === OBFUSCATED_TAG && node.classList.contains(OBFUSCATED_CLASS)) {
        return node;
      }
      node = node.parentElement;
    }

    return null;
  }

  private rangeHasObfuscated(range: Range) {
    if (this.findObfuscatedParent()) return true;

    const selectedContent = range.cloneContents();
    return Boolean(selectedContent.querySelector?.(`.${OBFUSCATED_CLASS}, [data-mcg-obfuscated="true"]`));
  }

  private unwrapFragmentRange(range: Range) {
    const fragment = range.extractContents();
    this.unwrapObfuscatedElements(fragment);
    range.insertNode(fragment);
  }

  private unwrapInsideTag(wrapper: HTMLElement, range: Range) {
    const parent = wrapper.parentNode;
    if (!parent) return;

    const beforeRange = range.cloneRange();
    beforeRange.selectNodeContents(wrapper);
    beforeRange.setEnd(range.startContainer, range.startOffset);

    const afterRange = range.cloneRange();
    afterRange.selectNodeContents(wrapper);
    afterRange.setStart(range.endContainer, range.endOffset);

    const before = beforeRange.cloneContents();
    const selected = range.cloneContents();
    const after = afterRange.cloneContents();

    const beforeWrapper = this.createWrapper();
    beforeWrapper.append(before);

    const afterWrapper = this.createWrapper();
    afterWrapper.append(after);

    if (beforeWrapper.textContent) {
      parent.insertBefore(beforeWrapper, wrapper);
    }
    parent.insertBefore(selected, wrapper);
    if (afterWrapper.textContent) {
      parent.insertBefore(afterWrapper, wrapper);
    }
    parent.removeChild(wrapper);
  }

  private unwrapObfuscatedElements(root: ParentNode) {
    root.querySelectorAll<HTMLElement>(`.${OBFUSCATED_CLASS}, [data-mcg-obfuscated="true"]`).forEach((element) => {
      const parent = element.parentNode;
      if (!parent) return;

      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      parent.removeChild(element);
    });

    if (root instanceof HTMLElement && this.isObfuscatedElement(root)) {
      root.classList.remove(OBFUSCATED_CLASS);
      root.removeAttribute("data-mcg-obfuscated");
    }
  }

  private isObfuscatedElement(element: HTMLElement) {
    return element.classList.contains(OBFUSCATED_CLASS) || element.dataset[OBFUSCATED_DATA_KEY] === "true";
  }

  private createWrapper() {
    const wrapper = document.createElement("span");
    wrapper.classList.add(OBFUSCATED_CLASS);
    wrapper.dataset[OBFUSCATED_DATA_KEY] = "true";
    return wrapper;
  }

  private dispatchInput() {
    this.button?.closest(".codex-editor")?.dispatchEvent(new InputEvent("input", { bubbles: true }));
  }
}
