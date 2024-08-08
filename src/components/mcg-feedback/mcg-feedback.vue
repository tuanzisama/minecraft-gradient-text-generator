<template>
  <t-dialog v-model:visible="dialogVisible" width="600px" confirm-btn="提交反馈" @confirm="onDialogConfirmHandler()"
    :confirm-loading="isLoading" :close-on-esc-keydown="false" :close-on-overlay-click="false" destroy-on-close>
    <template #header>
      <span>评价反馈</span>
      <span class="feedback-version">{{ FEEDBACK_STORAGE_KEY }}</span>
    </template>
    <t-space direction="vertical" style="width: 100%">
      <div>
        <label class="form-item">
          <span class="form-item__label">意见或建议</span>
          <div class="form-item__content">
            <t-textarea v-model="formData.comment" placeholder="请输入意见或建议" maxlength="500"
              :autosize="{ minRows: 3, maxRows: 5 }" />
          </div>
        </label>
        <label class="form-item">
          <span class="form-item__label">联系方式</span>
          <div class="form-item__content">
            <t-input v-model="formData.contact" placeholder="请输入联系方式 (例：QQ:123456 或 mail:abc#example.com)"
              maxlength="255" />
          </div>
        </label>
      </div>
      <a class="badge-tag qq-group" href="https://qm.qq.com/q/wxxCCGLoHg" target="_blank"
        title="点击链接加入群聊【Minecraft 渐变文字生成器】" rel="noopener noreferrer nofollow">
        <img alt="GitHub Repo stars"
          src="https://img.shields.io/badge/QQ%E7%BE%A4%20994713939-0099FF?logo=tencent-qq&logoColor=white">
      </a>
    </t-space>
  </t-dialog>
</template>

<script lang="ts" setup>
import { Button, MessagePlugin, NotificationInstance, NotifyPlugin, Space } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

const FEEDBACK_STORAGE_KEY = 'feedback-202408'

const dialogVisible = ref(false)
const isLoading = ref(false)
const formData = ref<{ star: number, comment: string, refer: string, contact: string }>({
  star: 99,
  comment: '',
  refer: '',
  contact: '',
})

onMounted(() => {
  const isFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY) === '1'
  if (!isFeedback) {
    const searchParams = new URLSearchParams(window.location.search);
    formData.value.refer = searchParams.get('ref') ?? searchParams.get('refer') ?? ''
    popupNotify()
  }
})

const popupNotify = async () => {
  const onAgreeClickHandler = () => {
    notify.close();
    dialogVisible.value = true
  }

  const notify = await NotifyPlugin.info({
    title: '你好！',
    duration: 0,
    content: (h) => {
      return h('p', [
        h('p', '开发者🍙希望听到你的意见或建议，这将帮助我改进此项目！欢迎评价反馈~'),
        h('p', 'Ciallo～(∠·ω< )⌒☆')
      ])
    },
    footer: (h) => {
      return h('div', { style: { marginTop: '10px', float: 'right' } }, {
        default: () => [
          h(Space, { align: 'center', size: 'small' }, {
            default: () => [
              h(Button, { theme: 'primary', variant: "text", size: 'small', onClick: () => onNeverNotifyClickHandler(notify) }, { default: () => '永不提醒 😠' }),
              h(Button, { theme: 'primary', variant: "dashed", size: 'small', onClick: () => notify.close() }, { default: () => '暂不 💨' }),
              h(Button, { theme: 'primary', size: 'medium', onClick: () => onAgreeClickHandler() }, { default: () => '好的 🎠' }),
            ]
          })
        ]
      })
    },
  })
}

const onDialogConfirmHandler = () => {
  if (formData.value.comment === '') {
    return MessagePlugin.warning("请填写意见或建议")
  } else if (formData.value.contact === '') {
    return MessagePlugin.warning("")
  }

  isLoading.value = true;
  fetch('https://api.mcg.tuanzi.ink/feedback', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData.value)
  })
    .then(async (res) => {
      if (res.status === 429) {
        MessagePlugin.error("请求太过频繁 😱")
      } else if (res.status === 200) {
        dialogVisible.value = false;
        MessagePlugin.success("提交成功 😘")
        localStorage.setItem(FEEDBACK_STORAGE_KEY, "1")
      } else {
        return Promise.reject(res)
      }
    }).catch((err) => {
      console.error(err);
      MessagePlugin.error("提交失败 😥")
    }).finally(() => {
      isLoading.value = false;
    })
}

const onNeverNotifyClickHandler = (notify: NotificationInstance) => {
  MessagePlugin.info("本次问卷将不再提示 😪")
  localStorage.setItem(FEEDBACK_STORAGE_KEY, "1")
  notify.close()
}
</script>

<style lang="scss" scoped>
.form-item {
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &__label {
    display: inline-block;
    margin-bottom: 5px;
  }
}

.feedback-version {
  font-size: 12px;
  color: #e8e8e8;
  font-weight: 400;
  margin-left: 15px;
  user-select: none;
  cursor: default;
}
</style>
