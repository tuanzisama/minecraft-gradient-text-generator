<template>
  <section class="cg-body">
    <div class="cg-body__input">
      <slot name="input"></slot>
    </div>
    <div class="cg-body__right">
      <div class="cg-body__colorplate">
        <slot name="colorplate"></slot>
      </div>
      <div class="cg-body__output">
        <slot name="output"></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cg-body {
  width: 100%;
  height: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 var(--layout-padding-x);
  display: flex;
  gap: 12px;

  &__input {
    width: 35%;
    height: 100%;
    flex-shrink: 0;
  }

  &__right {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    gap: 12px;
  }

  &__colorplate {
    flex-shrink: 0;
  }

  &__output {
    flex: 1;
    height: 0;
  }
}
</style>
