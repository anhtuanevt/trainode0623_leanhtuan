const ELEMENT_FORM_SUBMIT = document.getElementById("form_submit");
const ELEMENT_ADD_TASK_BTN = document.getElementById("add_task_button");

const ELEMENT_TASK_NAME = document.getElementById("task_name");
const ELEMENT_LEVEL = document.getElementById("inputDs");
const ELEMENT_SUBMIT = document.getElementById("submit_button");
const ELEMENT_CANCEL_FROM = document.getElementById("cancel_button");
const ELEMENT_ID_FORM = document.getElementById("id-form");

const ELEMENT_TEXT_BOX = document.getElementById("cancel_button");
const ELEMENT_ERROR_MSG = document.getElementById("error-message");
const ELEMENT_SEARCH_TXT = document.getElementById("search-text");
const ELEMENT_GO_BTN = document.getElementById("go-btn");
const ELEMENT_DROPDOWN_BTN = document.getElementById("go-btn");
const ELEMENT_DROPDOWN_LABEL = document.getElementById("default-dropdown");

const ELEMENT_BODY = document.getElementById('tbody');
const KEY_LOCAL = "item"

let open_form = false;
let data = [];

let isUpdate = false;

// modal confirm
let confirmModal = document.getElementById('confirmModal');
let confirmTitle = document.getElementById('modal-title');
let confirmText = document.getElementById('confirmText');
let confirmOK = document.getElementById('confirmOK');
let confirmCancel = document.getElementById('confirmCancel');

