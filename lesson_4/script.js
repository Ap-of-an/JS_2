/* задание 1,2 */
/* У вас есть большой текст, в котором для обозначения диалогов 
используются одинарные кавычки. Придумать шаблон, который меняет 
одинарные кавычки на двойные. */
/* Улучшить шаблон таким образом, чтобы конструкции типа aren’t 
не меняли одинарную кавычку на двойную. */
let str_1 = "'Привет, как твои дела?', спросил Миша. На что Анна ответила: 'Не плохо, спасибо. С регулярками вот разбираюсь' aren't 'daasd'  ";
let template_1 = /(?<=^|[^А-яё0-9)\w])'(.+?)'(?=[^А-яё0-9(\w]|$)/gmi;

let p_old = document.createElement("p");
p_old.innerText = str_1;

let p_new = document.createElement("p");
p_new.innerText = str_1.replace(template_1, "\"$1\"");

document.querySelector("#z1_2").appendChild(p_old).appendChild(p_new);

let btn_submit = document.querySelector("#submit");

let form = document.querySelector("#form");
form.onsubmit = () => {
  return false;
}