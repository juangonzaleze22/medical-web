import { Toolbar } from "ngx-editor";

export const TIME_AVAILABLE = [
    "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
]

export const CONFIG_MODAL = {
    enterAnimationDuration: '130ms', 
    exitAnimationDuration: '150ms',
}

export const TOOLBAR_EDITOR_INPUT: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['indent', 'outdent'],
    ['undo', 'redo'],
  ];