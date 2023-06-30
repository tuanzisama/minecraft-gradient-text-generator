<template>
  <footer class="cg-footer">
    <section class="cg-footer__section">
      "Minecraft" 是 Mojang Synergies AB 的商标
      <Divider type="vertical" />
      <a href="https://github.com/tuanzisama" target="_blank">
        <Icon type="logo-github" />
        @tuanzisama
      </a>
      <Divider type="vertical" />
      <a
        href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=_z8lAFy5g4oHy5j68j1Yx-FK6spjSDKd&authKey=oYJwq0XWxSZ9uWnN1VW1om1HD2bwnCD%2BXXrVEk5ciPy9V%2Byp8ywAre89%2F6z52ksC&noverify=0&group_code=202653244"
        target="_blank"
      >
        <Icon type="md-color-wand" />
        元界MC - 社交×互动×游戏
      </a>
    </section>
    <section class="cg-footer__section">
      <a href="https://www.mcbbs.net/thread-1004671-1-1.html" target="_blank"> [广告] PlayerTitle × 一款有点好用的玩家称号插件 </a>
    </section>
  </footer>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.cg-footer {
  font-size: 12px;
  text-align: center;
  padding: 40px 0;
  &__section {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
