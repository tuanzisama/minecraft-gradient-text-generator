<template>
  <section class="cg-body">
    <div class="cg-body__input">
      <slot name="input"></slot>
    </div>
    <div class="cg-body__output">
      <slot name="output"></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cg-body {
  display: flex;
  flex-direction: row;
  &__input {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 20px;
    min-width: 800px;
    &:deep(> *) {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &__output {
    display: flex;
    flex: 1;
    width: 0;
    min-width: 500px;
  }
}
</style>
