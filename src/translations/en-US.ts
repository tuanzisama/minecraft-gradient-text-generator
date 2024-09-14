export default {
  $internel: {
    author: "{'@'}tuanzisama, Google Translate, ChatGPT",
  },
  app: {
    title: "Minecraft Gradient Text Generator",
    slogan: "More than {count} formats / mixed styles / gradient presets",
    // timeago.js all locales: https://github.com/hustcc/timeago.js/tree/master/src/lang
    timeago_locale: "en_US",
  },
  common: {
    download_tip: "Pay attention to the browser download prompt.",
    support_request: "Want support for other Minecraft plugins or formats?",
    contact_developer: "Contact the developer!",
    not_affiliated_notice: '"Minecraft" is a trademark of Mojang Synergies AB.',
    translate_by: "Translate by {author}",
    close: "Close",
  },
  input: {
    placeholder: "Try to write something...",
    editor: {
      text: "Text",
      bold: "Bold",
      italic: "Italic",
      underline: "Underline",
      strikethrough: "Strikethrough",
      add: "Add",
      filter: "Filter",
      toggler: {
        tune: "Click to tune",
        drag: "or drag to move",
      },
      tune: {
        delete: "Delete",
        delete_confirm: "Click to delete",
        move_up: "Move up",
        move_down: "Move down",
      },
    },
  },
  picker: {
    color_list_exceed: "The number of colors exceeds the limit.",
    color_incorrect: "Not a hexadecimal color.",
    reset_confirm: "Reset colors?",
    button: {
      feeling_lucky: "Feeling Lucky",
      reset: "Reset",
      presets: "Presets",
      import: "Import",
    },
    presets: {
      title: "Gradient Preset Management",
      clear_confirm: "Reset colors?",
      clear_success: "All presets have been cleared.",
      import_success: "{count} gradient presets have been imported.",
      import_failed: "Unable to recognize the file. Please try again or contact the developer.",
      export_success: "Presets exported successfully.",
      button: {
        import: "Import",
        export: "Export",
        clear: "Clear",
      },
      table: {
        column: {
          name: "Name",
          gradient: "Gradient",
          create_time: "Time",
          operate: "Actions",
        },
        gradient_count: "{count} colors",
        delete_confirm: "Confirm deletion?",
      },
    },
    import: {
      title: "Import Gradient Colors",
      confirm_button: "Import",
      placeholder: "Enter text in a supported format...",
      support_format: "Supported Formats",
      import_failed: "Import Failed.",
      rules: {
        json: "JSON",
        css: "CSS",
        split_with_comma: "Comma separated text",
      },
    },
    input: {
      placeholder: "Hexadecimal color",
      paste_is_empty: "Clipboard is empty",
      paste_incorrect: "Clipboard data is not a hex color",
    },
  },
  processor: {
    usage_accurate_time: "Processing time (accurate): {time}ms",
    placeholder: "Select an adapter.",
    adapter: {
      vanilla: {
        label: "Vanilla (1.16+)",
      },
      vanilla_compatible: {
        label: "Vanilla (1.16+, Compatible)",
      },
      standard: {
        label: "Standard",
        hint: "May lost format",
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
        hint: "Needs update",
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
      vanilla_char_code: "Vanilla character code",
      copy: "Copy",
      download: "Download",
      preview: "Preview",
      preview_pip: "Preview by Picture-in-Picture",
      share: "Share",
    },
  },
  output: {
    input_is_empty: "Type text first.",
    copy_success: "Copy successful. (ノ￣▽￣)",
    copy_failed: "Copy failed. Try updating your browser or contact the developer.",
    download_success: "Export successful.",
    download_failed: "Export failed. Try to contact the developer.",
  },
  guide: {
    previous_button: "Previous",
    next_button: "Next",
    finish_button: "Done",
    intro: {
      title: "Welcome to {app_title}",
      summary: "Click Next to view the user guide.",
    },
    step1: {
      title: "How to format text?",
    },
    step2: {
      title: "How should I use those nice styles?",
    },
  },
};
