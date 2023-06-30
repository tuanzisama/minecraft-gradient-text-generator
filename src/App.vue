<template>
  <div class="cg-container">
    <mcg-header />
    <main class="cg-main">
      <color-list v-model="gradientColorList" />
      <div class="cg-content">
        <section class="cg-content--form">
          <Input v-model="inputVal" type="textarea" :rows="2" size="large" placeholder="输入欲加渐变的文字..." show-word-limit maxlength="100" />
        </section>
        <div class="cg-configration">
          <Form ref="formInline" :model="formData" :label-width="100" inline>
            <FormItem>
              <template #label>
                <div>
                  字符模式
                  <Tooltip content="客户端发送使用&，服务端发送使用§" placement="top-start">
                    <Icon type="md-alert" />
                  </Tooltip>
                </div>
              </template>
              <Switch v-model="formData.charMode">
                <template #open><span>&</span></template>
                <template #close><span>§</span></template>
              </Switch>
            </FormItem>
            <FormItem>
              <template #label>
                <div>
                  兼容模式
                  <Tooltip content="仅限服务器不支持&amp;&num;前缀发送Hex颜色" placement="top-start" max-width="200">
                    <Icon type="md-alert" />
                  </Tooltip>
                </div>
              </template>
              <Switch v-model="formData.compatibleMode" />
            </FormItem>
            <FormItem>
              <template #label>
                <div>
                  移除空格
                  <Tooltip content="移除空格/换行/制表符" placement="top-start">
                    <Icon type="md-alert" />
                  </Tooltip>
                </div>
              </template>
              <Switch v-model="formData.clearSpaceChar" />
            </FormItem>
          </Form>
        </div>
        <Card title="预览" class="preview-card">
          <template #extra>
            <span style="cursor: pointer" @click="onCopyClickHandler">复制</span>
          </template>
          <div class="gradient-bar" :style="`background: linear-gradient(to right, ${gradientColorList.join(', ')});`"></div>
          <div class="cg-result cg-result--preview">
            <VNodeComp :content="resultVNodes" />
          </div>
          <Divider />
          <div class="cg-result cg-result--raw" contenteditable>
            {{ resultVal }}
          </div>
        </Card>
      </div>
    </main>
    <mcg-footer />
  </div>
</template>

<script lang="ts" setup>
import { computed, h, reactive, ref, VNode } from "vue";
import ColorList from "./components/ColorList.vue";
import McgHeader from "./components/McgHeader.vue";
import McgFooter from "./components/McgFooter.vue";
import { VNode as VNodeComp } from "./utils/vnode";
import { Message } from "view-ui-plus";
import { genColorGradients } from "./utils/util";

const inputVal = ref("");
const gradientColorList = ref<string[]>([]);
const formData = reactive({
  charMode: true,
  compatibleMode: false,
  clearSpaceChar: true,
});

const inputFormatVal = computed<string>(() => {
  if (formData.clearSpaceChar) return inputVal.value.replace(/\t|\s|\r|\n/g, "");
  else return inputVal.value;
});

const gradientBarCss = computed<string>(() => {
  return `linear-gradient(${gradientColorList.value.join(", ")});`;
});

const resultVNodes = computed<VNode | VNode[]>(() => {
  if (gradientColorList.value.length < 2) {
    return inputFormatVal.value.split("").map((el) => h("span", el));
  } else {
    const gradientArray = genColorGradients(gradientColorList.value, inputFormatVal.value.length);

    return inputFormatVal.value.split("").map((el, index) => {
      return h("span", { style: { color: gradientArray[index] } }, el);
    });
  }
});

const resultVal = computed<string>(() => {
  if (gradientColorList.value.length < 2) {
    return inputFormatVal.value;
  } else {
    const gradientArray = genColorGradients(gradientColorList.value, inputFormatVal.value.length);
    return inputFormatVal.value.split("").reduce((acc, cur, index) => {
      const colorChar = formData.charMode ? "&" : "§";
      if (formData.compatibleMode) {
        const colorSplit = gradientArray[index]
          .slice(1)
          .split("")
          .map((c) => `${colorChar}${c}`)
          .join("");
        return `${acc}${colorChar}x${colorSplit}${cur}`;
      } else {
        return `${acc}${colorChar}${gradientArray[index]}${cur}`;
      }
    }, "");
  }
});

const onCopyClickHandler = () => {
  if (resultVal.value.length === 0) {
    Message.warning("请先输入文本哦");
    return;
  }
  navigator.clipboard
    .writeText(resultVal.value)
    .then(() => Message.success("复制成功啦"))
    .catch((err) => {
      Message.error("复制失败，请尝试更新您的浏览器");
      console.error(err);
    });
};
</script>

<style lang="less" scoped>
@import url("./assets/styles/mixins.less");
.cg-container {
  width: 96%;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  .cg-main {
    display: flex;
    .cg-content {
      flex: 1;
      padding: 0 20px;
      &--form {
        margin-bottom: 20px;
      }
    }
    .cg-configration {
      width: 100%;
      min-height: 60px;
      border: 1px dashed #dcdee2;
      border-radius: 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      &:deep(.ivu-form-item) {
        margin-bottom: 0 !important;
      }
    }
    .preview-card {
      :deep(.ivu-card-body) {
        position: relative;
        padding-top: 30px;
      }
      .gradient-bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 6px;
      }
    }
    .cg-result {
      width: 100%;
      height: 150px;
      overflow-x: hidden;
      overflow-y: auto;
      font-size: 20px;
      line-height: 25px;
      letter-spacing: 1px;
      .custom-scrollbar();
      outline: none;
      border: none;
      word-break: break-all;
      &--preview {
        height: 80px;
      }
      &--raw {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .cg-header {
    height: 100px !important;
  }
  .cg-main {
    flex-direction: column !important;
    :deep(.color-list) {
      flex-direction: row !important;
      .color-item {
        margin-right: 10px;
      }
    }
    .cg-content {
      padding: 0 !important;
    }
  }
}
</style>
