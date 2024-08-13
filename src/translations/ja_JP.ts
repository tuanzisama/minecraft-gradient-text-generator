/**
 * Translated by ChatGPT based on Chinese language.
 */
export default {
  $internel: {
    author: "ChatGPT",
  },
  app: {
    title: "Minecraft グラデーションカラー生成器",
    slogan: "{count} を超える形式をサポート / 混合フォーマット / グラデーションプリセット",
    // timeago.js all locales: https://github.com/hustcc/timeago.js/tree/master/src/lang
    timeago_locale: "ja",
  },
  common: {
    download_tip: "ブラウザのダウンロードプロンプトに注意してください",
    support_request: "他のプラグイン/フォーマットをサポートしてほしい？",
    contact_developer: "開発者に連絡！",
    not_affiliated_notice: '"Minecraft" は Mojang Synergies AB の商標です',
    translate_by: "{author}が翻訳に参加しました",
    close: "閉じる",
  },
  input: {
    placeholder: "何かを書いてみてください...",
    editor: {
      text: "テキスト",
      bold: "太字",
      italic: "斜体",
      underline: "下線",
      strikethrough: "取り消し線",
      add: "追加",
      toggler: {
        tune: "操作",
        drag_to_move: "ドラッグして移動",
      },
      tune: {
        filter: "コンポーネントを検索...",
        delete: "削除",
        delete_confirm: "クリックして削除を確認",
        move_up: "上に移動",
        move_down: "下に移動",
      },
    },
  },
  picker: {
    color_list_exceed: "色の数が閾値を超えています",
    color_incorrect: "16進カラーではありません",
    reset_confirm: "色をリセットしてもよろしいですか？",
    button: {
      feeling_lucky: "もう一つ",
      reset: "リセット",
      presets: "プリセット",
      import: "インポート",
    },
    presets: {
      title: "グラデーションプリセット管理",
      button: {
        import: "インポート",
        export: "エクスポート",
        clear: "クリア",
      },
      table: {
        column: {
          name: "名前",
          gradient: "グラデーション",
          create_time: "作成時間",
          operate: "操作",
        },
        gradient_count: "{count} 色",
        delete_confirm: "削除してもよろしいですか？",
      },
      clear_confirm: "色をリセットしてもよろしいですか？",
      clear_success: "すべてのプリセットをクリアしました",
      import_success: "{count} 件のグラデーションプリセットをインポートしました",
      import_failed: "このファイルを認識できませんでした。再試行するか、開発者に連絡してください",
      export_success: "プリセットのエクスポートに成功しました",
    },
    import: {
      title: "グラデーションカラーをインポート",
      confirm_button: "認識してインポート",
      placeholder: "サポートされているフォーマットのテキストを入力してください...",
      support_format: "サポートフォーマット",
      import_failed: "認識に失敗しました",
      rules: {
        json: "JSON",
        css: "CSS",
        split_with_comma: "カンマで区切られたテキスト",
      },
    },
    input: {
      placeholder: "16進数カラー",
      paste_is_empty: "クリップボードが空です",
      paste_incorrect: "クリップボードのデータは16進数カラーではありません",
    },
  },
  processor: {
    usage_accurate_time: "処理時間 (正確): {time}ms",
    adapter: {
      vanilla: {
        label: "バニラ (1.16+)",
      },
      vanilla_compatible: {
        label: "バニラ (1.16+, 互換)",
      },
      standard: {
        label: "標準",
        hint: "フォーマットが失われます",
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
        hint: "改良が必要です",
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
      vanilla_char_code: "キャラクターフォーマット",
      copy: "コピー",
      download: "ダウンロード",
      preview: "プレビュー",
      preview_pip: "ピクチャ・イン・ピクチャ",
      share: "共有",
    },
  },
  output: {
    input_is_empty: "テキストを入力してください",
    copy_success: "コピー成功 (ノ￣▽￣)",
    copy_failed: "コピーに失敗しました。ブラウザを更新するか、開発者に連絡してください",
    download_success: "エクスポート成功",
    download_failed: "エクスポートに失敗しました。開発者に連絡してください",
  },
};
