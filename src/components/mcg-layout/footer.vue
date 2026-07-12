<template>
  <footer class="cg-footer">
    <div>
      <t-link href="https://github.com/tuanzisama" target="_blank" theme="primary" style="font-weight: bold">
        @tuanzisama
      </t-link>
      <t-divider layout="vertical" />
      <t-link href="https://github.com/tuanzisama/minecraft-gradient-text-generator" target="_blank" theme="primary"
        style="font-weight: bold">
        Code source
        <i-material-symbols-open-in-new style="font-size: 16px; margin-left: 5px" />
      </t-link>
    </div>

    <div class="cg-footer-badger">
      <a class="badge-tag github-star" href="https://github.com/tuanzisama/minecraft-gradient-text-generator"
        target="_blank" rel="noopener noreferrer nofollow">
        <img alt="GitHub Repo stars"
          src="https://badgen.net/github/stars/tuanzisama/minecraft-gradient-text-generator?color=FDD835">
      </a>
      <a class="badge-tag mcg-wiki" href="https://github.com/tuanzisama/minecraft-gradient-text-generator/wiki" target="_blank"
        title="MCG Wiki" rel="noopener noreferrer nofollow">
        <img alt="MCG Wiki"
          src="https://img.shields.io/badge/Github-Wiki-blue?logo=github&logoColor=white">
      </a>
      <a class="badge-tag qq-group" href="https://qm.qq.com/q/wxxCCGLoHg" target="_blank"
        title="点击链接加入群聊【Minecraft 渐变文字生成器】" rel="noopener noreferrer nofollow">
        <img alt="Join QQ group"
          src="https://img.shields.io/badge/QQ%E7%BE%A4%20994713939-0099FF?logo=tencent-qq&logoColor=white">
      </a>
    </div>
    <p>{{ $t("common.not_affiliated_notice") }}</p>
    <p v-if="i18n.locale.value !== 'zh-CN'">{{ $t("common.translate_by", { author: $t("$internel.author") }) }}</p>
  </footer>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const i18n = useI18n()
</script>

<style lang="scss" scoped>
.cg-footer {
  font-size: 12px;
  text-align: center;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 16px var(--layout-padding-x);
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--td-text-color-footer);
  border-top: 1px solid var(--td-component-border);

  :deep(.t-link) {
    color: var(--td-text-color-footer-link);

    &:hover {
      color: var(--td-text-color-footer-link-hover);
    }
  }
}

.badge-tag {
  overflow: hidden;
  user-select: none;
  margin-right: 10px;
}
</style>
