/* задание 1,2 */
/* У вас есть большой текст, в котором для обозначения диалогов 
используются одинарные кавычки. Придумать шаблон, который меняет 
одинарные кавычки на двойные. */
/* Улучшить шаблон таким образом, чтобы конструкции типа aren’t 
не меняли одинарную кавычку на двойную. */
let str_1 = "'Привет, как твои дела?', спросил Миша. На что Анна ответила: 'Не плохо, спасибо. С регулярками вот разбираюсь' aren't 'daasd'  ";
str_1 += "Анна сказала: 'Этим летом я буду отдыхать в Кот-д'Ивуар!' \n\
Учитель неожиданно заметил: 'Время истекло'.\n\
'Прямая речь'\n\
'Поезд ушёл, — с грустью подумала девушка, — теперь уж точно опоздаю!'\n\
'Что ж, поезд успел уйти, — с грустью подумал студент. – Теперь я точно не успею в институт!'.\n\
Мужчина с грустью подумал: 'Электричка ушла, теперь я точно опоздаю', — и быстро побежал на автобусную остановку.\n\
'Hello, friend!'\n\
'test'\n\
Test parents' aren't 'test test"
let template_1 = /(?<=^|[^А-яё0-9)\w])'(.+?)'(?=[^А-яё0-9(\w]|$)/gmi;
str_1 = str_1.replace(template_1, "\"$1\"");
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