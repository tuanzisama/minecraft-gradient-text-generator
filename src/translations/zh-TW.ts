export default {
  app: {
    title: "Minecraft 漸層文字生成器",
    slogan: "支援超過 {count} 種格式 / 混排樣式 / 漸層預設",
    timeago_locale: "zh_TW",
  },
  common: {
    download_tip: "請留意瀏覽器下載提示",
    support_request: "希望支援其他插件/格式？",
    contact_developer: "聯絡開發者！",
    not_affiliated_notice: '"Minecraft" 是 Mojang Synergies AB 的商標',
    translate_by: "由 {author} 翻譯",
    close: "關閉",
  },
  input: {
    placeholder: "試著寫點什麼...",
    editor: {
      text: "文字",
      bold: "粗體",
      italic: "斜體",
      underline: "底線",
      strikethrough: "刪除線",
      add: "新增",
      toggler: {
        tune: "操作",
        drag_to_move: "拖曳以移動",
      },
      tune: {
        filter: "搜尋組件...",
        delete: "刪除",
        delete_confirm: "點擊以確認刪除",
        move_up: "向上移動",
        move_down: "向下移動",
      },
    },
  },
  picker: {
    color_list_exceed: "色彩數量超出閾值",
    color_incorrect: "不是16進位顏色",
    reset_confirm: "確認重置顏色嗎？",
    button: {
      feeling_lucky: "試試手氣",
      reset: "重置",
      presets: "預設",
      import: "匯入",
    },
    presets: {
      title: "漸層色預設管理",
      button: {
        import: "匯入",
        export: "匯出",
        clear: "清空",
      },
      table: {
        column: {
          name: "名稱",
          gradient: "漸層色",
          create_time: "建立時間",
          operate: "操作",
        },
        gradient_count: "{count} 個顏色",
        delete_confirm: "確認刪除嗎？",
      },
      clear_confirm: "確認重置顏色嗎？",
      clear_success: "已清空所有預設",
      import_success: "已匯入 {count} 條漸層色預設",
      import_failed: "無法識別此文件，請重試或聯絡開發者",
      export_success: "預設匯出成功",
    },
    import: {
      title: "匯入漸層色",
      confirm_button: "識別並匯入",
      placeholder: "輸入受支援的格式文字...",
      support_format: "支援格式",
      import_failed: "識別失敗",
      rules: {
        json: "JSON",
        css: "CSS",
        split_with_comma: "以逗號分隔的文字",
      },
    },
    input: {
      placeholder: "16進位顏色",
      paste_is_empty: "請貼上文字",
      paste_incorrect: "請貼上16進位文字",
    },
  },
  processor: {
    usage_accurate_time: "處理時間 (精確): {time}ms",
    placeholder: "請選擇生成器",
    adapter: {
      vanilla: {
        label: "原版 (1.16+)",
      },
      vanilla_compatible: {
        label: "原版 (1.16+, 相容)",
      },
      standard: {
        label: "標準",
        hint: "會丟失格式",
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
        hint: "需要改進",
      },
      trchat: {
        label: "TrChat",
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
      vanilla_char_code: "字元格式",
      copy: "複製",
      download: "下載",
      preview: "預覽",
      preview_pip: "新視窗預覽",
      share: "分享",
    },
  },
  output: {
    input_is_empty: "請先輸入文字",
    copy_success: "複製成功 (ノ￣▽￣)",
    copy_failed: "複製失敗，請嘗試更新您的瀏覽器或聯絡開發者",
    download_success: "匯出成功",
    download_failed: "匯出失敗，請聯絡開發者",
  },
  guide: {
    previous_button: "上一步",
    next_button: "下一步",
    finish_button: "完成",
    intro: {
      title: "歡迎使用 {app_title}",
      summary: "點按下一步查看使用者引導",
    },
    step1: {
      title: "如何為文字設定樣式？",
    },
    step2: {
      title: "那些好看的樣式該怎麼用？",
    },
  },
};
