export default {
  app: {
    title: "Minecraft 渐变文字生成器",
    slogan: "支持超 {count} 款格式 / 混排样式 / 渐变预设",
    // timeago.js all locales: https://github.com/hustcc/timeago.js/tree/master/src/lang
    timeago_locale: "zh_CN",
  },
  common: {
    download_tip: "请留意浏览器下载提示",
    support_request: "希望支持其它插件/格式？",
    contact_developer: "联系开发者！",
    not_affiliated_notice: '"Minecraft" 是 Mojang Synergies AB 的商标',
    translate_by: "由 {author} 翻译",
    close: "关闭",
  },
  input: {
    placeholder: "试着写一点什么...",
    editor: {
      text: "文本",
      bold: "粗体",
      italic: "斜体",
      underline: "下划线",
      strikethrough: "删除线",
      add: "新增",
      toggler: {
        tune: "操作",
        drag_to_move: "拖拽以移动",
      },
      tune: {
        filter: "搜索组件...",
        delete: "删除",
        delete_confirm: "点击以确认删除",
        move_up: "向上移动",
        move_down: "向下移动",
      },
    },
  },
  picker: {
    color_list_exceed: "色彩数量超出阈值",
    color_incorrect: "不是16进制颜色",
    reset_confirm: "确认重置颜色吗？",
    button: {
      feeling_lucky: "试试手气",
      reset: "重置",
      presets: "预设",
      import: "导入",
    },
    presets: {
      title: "渐变色预设管理",
      button: {
        import: "导入",
        export: "导出",
        clear: "清空",
      },
      table: {
        column: {
          name: "名称",
          gradient: "渐变色",
          create_time: "创建时间",
          operate: "操作",
        },
        gradient_count: "{count} 个颜色",
        delete_confirm: "确认删除吗？",
      },
      clear_confirm: "确认重置颜色吗？",
      clear_success: "已清空所有预设",
      import_success: "已导入 {count} 条渐变色预设",
      import_failed: "无法识别此文件，请重试或联系开发者",
      export_success: "预设导出成功",
    },
    import: {
      title: "导入渐变色",
      confirm_button: "识别并导入",
      placeholder: "输入受支持的格式文本...",
      support_format: "支持格式",
      import_failed: "识别失败",
      rules: {
        json: "JSON",
        css: "CSS",
        split_with_comma: "以逗号分隔的文本",
      },
    },
    input: {
      placeholder: "16进制颜色",
      paste_is_empty: "请粘贴文本",
      paste_incorrect: "请粘贴16进制文字",
    },
  },
  processor: {
    usage_accurate_time: "处理时间 (精确): {time}ms",
    placeholder: "请选择生成器",
    adapter: {
      vanilla: {
        label: "原版 (1.16+)",
      },
      vanilla_compatible: {
        label: "原版 (1.16+, 兼容)",
      },
      standard: {
        label: "标准",
        hint: "会丢失格式",
      },
      cmi: {
        label: "CMI",
      },
      minimessage: {
        label: "MiniMessage (adventure-api)",
      },
      minimessage_gradient: {
        label: "MiniMessage#Gradient (adventure-api)",
      },
      minedown: {
        label: "MineDown",
      },
      stringified_nbt: {
        label: "Stringified NBT",
        hint: "需要改进",
      },
      trchat: {
        label: "TrChat",
      },
      chat_colors: {
        label: "Chat Colors",
      },
      motd: {
        label: "MOTD",
      },
      bbcode: {
        label: "BBCode",
      },
      json: {
        label: "JSON",
      },
      html: {
        label: "HTML",
      },
      csv: {
        label: "CSV",
      },
    },
    toolbar: {
      vanilla_char_code: "字符格式",
      copy: "复制",
      download: "下载",
      preview: "预览",
      preview_pip: "新窗口预览",
      share: "分享",
    },
  },
  output: {
    input_is_empty: "请先输入文本",
    copy_success: "复制成功 (ノ￣▽￣)",
    copy_failed: "复制失败，请尝试更新您的浏览器或联系开发者",
    download_success: "导出成功",
    download_failed: "导出失败，请联系开发者",
  },
  guide: {
    previous_button: "上一步",
    next_button: "下一步",
    finish_button: "完成",
    intro: {
      title: "欢迎使用 {app_title}",
      summary: "点按下一步查看用户引导",
    },
    step1: {
      title: "如何为文字设置样式？",
    },
    step2: {
      title: "那些好看的样式我该怎么用？",
    },
  },
};
