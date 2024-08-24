<template>
  <div class="mcg-guide" v-if="current >= 0">
    <t-guide v-model="current" :steps="steps" mode="dialog"
      :next-button-props="{ content: i18n.t('guide.next_button') }"
      :prev-button-props="{ content: i18n.t('guide.previous_button') }"
      :finish-button-props="{ content: i18n.t('guide.finish_button') }" @finish="onGuideFinishHandler" hide-skip />
  </div>
</template>

<script lang="ts" setup>
import { computed, createVNode, onMounted, ref } from 'vue';
import { useSearchParams } from '@/compostable/search-params';
import GuideBody from './guide-body.vue'
import { GuideProps } from 'tdesign-vue-next';
import { useI18n } from 'vue-i18n';
import TextFormatImage from '@/assets/images/guide/text-format.gif'
import HowToImportVideo from '@/assets/images/guide/how-to-import.mp4'

const USER_GUIDE_STORAGE_KEY = 'user-guide-202408'
const USER_GUIDE_SEARCH_PARAM = 'force_guide'

const i18n = useI18n();
const searchParams = useSearchParams()

const current = ref(-1);
const steps: GuideProps['steps'] = [
  {
    element: '.main-title',
    title: i18n.t('guide.intro.title', { 'app_title': i18n.t('app.title') }),
    body: () => createVNode(GuideBody, { summary: i18n.t('guide.intro.summary') }),
    placement: 'bottom-right',
  },
  {
    element: '.main-title',
    title: i18n.t('guide.step1.title'),
    body: () => createVNode(GuideBody, { picture: TextFormatImage }),
    placement: 'bottom-right',
  },
  {
    element: '.label-field',
    title: i18n.t('guide.step2.title'),
    body: () => createVNode(GuideBody, { video: HowToImportVideo }),
    placement: 'bottom',
  },
];

const isForceGuide = computed<boolean>(() => {
  return searchParams.get(USER_GUIDE_SEARCH_PARAM) === '1'
})

onMounted(() => {
  const isShowedUserGuide = localStorage.getItem(USER_GUIDE_STORAGE_KEY) === '1'
  if (!isShowedUserGuide || isForceGuide.value) {
    current.value = 0
  }
})

const onGuideFinishHandler = () => {
  localStorage.setItem(USER_GUIDE_STORAGE_KEY, '1')
}
</script>