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
        <span class="material-symbols-outlined" style="font-size: 16px; margin-left: 5px;">open_in_new</span>
      </t-link>
    </div>

    <div class="cg-footer-badger">
      <a class="badge-tag github-star" href="https://github.com/tuanzisama/minecraft-gradient-text-generator"
        target="_blank" rel="noopener noreferrer nofollow">
        <img alt="GitHub Repo stars"
          src="https://badgen.net/github/stars/tuanzisama/minecraft-gradient-text-generator?color=FDD835">
      </a>
      <a class="badge-tag qq-group" href="https://qm.qq.com/q/wxxCCGLoHg" target="_blank"
        title="点击链接加入群聊【Minecraft 渐变颜色生成器】" rel="noopener noreferrer nofollow">
        <img alt="GitHub Repo stars"
          src="https://img.shields.io/badge/QQ%E7%BE%A4%20994713939-0099FF?logo=tencent-qq&logoColor=white">
      </a>
    </div>
    <!-- needs to move another position -->
    <!-- <t-link href="https://www.mcbbs.net/thread-1004671-1-1.html" target="_blank" theme="warning">
        [广告] PlayerTitle × 一款有点好用的玩家称号插件
      </t-link> -->
    <p>"Minecraft" 是 Mojang Synergies AB 的商标</p>
  </footer>
</template>

<style lang="scss" scoped>
.cg-footer {
  font-size: 12px;
  text-align: center;
  padding: 40px 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.badge-tag {
  overflow: hidden;
  user-select: none;
  margin-right: 10px;
}
</style>
