<template>
  <section class="cg-body">
    <div class="cg-body__input">
      <slot name="input"></slot>
    </div>
    <div class="cg-body__right">
      <div class="cg-colorplate">
        <slot name="colorplate"></slot>
      </div>
      <div class="cg-output">
        <slot name="output"></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cg-body {
  width: 96%;
  margin: 0 auto;
  max-width: 1440px;

  display: flex;

  &__input {
    width: 35%;
    height: 100%;
    flex-shrink: 0;
    margin-right: 10px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;

    .cg-colorplate {
      flex-shrink: 0;
      margin-bottom: 10px;
    }

    .cg-output {
      flex: 1;
      height: 0;
    }
  }


}
</style>
