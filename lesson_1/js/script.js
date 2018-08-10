function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}
Container.prototype.render = function () {
  return this.htmlCode;
}
/* Задание 1. Улучшить базовый класс, добавив в него общий для всех метод remove(), который удаляет
контейнер.*/
/* Под удалением контейнра я понимаю очистка полей объекта и удаления его со страницы html*/
Container.prototype.remove = function () {
  let temp = document.getElementById(this.id);
  temp.parentNode.removeChild(temp);
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      this[key] = "";
    }
  }
}

function Menu(my_id, my_class, my_items) {
  Container.call(this);
  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {
  var result = "<ul class='" + this.className + "' id='" + this.id + "'>";
  for (var item in this.items) {
    if (this.items[item] instanceof MenuItem) {
      result += this.items[item].render();
    }
  }
  result += "</ul>";
  return result;
}


function MenuItem(my_href, my_name) {
  Container.call(this);
  this.className = "menu-item";
  this.href = my_href;
  this.name = my_name;
}
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
  return "<li class='" + this.className + "' href='" + this.href + "'>" + this.name + "</li>";
}

/*Задание 2. Создать наследника класса Menu – новый класс должен уметь строить меню 
со вложенными пунктами, т.е с подменю. Подсказка: главный секрет в обходе объекта пунктов меню и
проверке типов.*/
/* вспомогательный класс для подменю. состоит из заголовка меню и самого "подменю" */
function PodMenuItem(menu_item, pod_menu) {
  this.menu_item = menu_item;
  this.pod_menu = pod_menu;
}
PodMenuItem.prototype.render = function () {
  let result = "<li class='" + this.menu_item.className + "'>" + this.menu_item.name;
  result += this.pod_menu.render();
  result += "</li>";
  return result;
}
/* требуемый в задании класс, реализующий возможность создания меню с подменюшками */
function Dif_Menu(my_id, my_class, my_items) {
  Container.call(this);
  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}
Dif_Menu.prototype = Object.create(Container.prototype);
Dif_Menu.prototype.render = function () {
  var result = "<ul class='" + this.className + "' id='" + this.id + "'>";
  for (var item in this.items) {
    if (this.items[item] instanceof MenuItem || this.items[item] instanceof PodMenuItem) {
      result += this.items[item].render();
    }
  }
  result += "</ul>";
  return result;

}
var m_item1 = new MenuItem("/", "Главная");
var m_item2 = new MenuItem("/catalogue/", "Каталог");
var m_item3 = new MenuItem("/gallery/", "Галерея");
var m_item4 = new MenuItem("/pejas/", "Пейзажи");
var m_item5 = new MenuItem("/images/", "Картинки");

var m_items_podMenu1 = {
  0: m_item4,
  1: m_item5
};
var menu2 = new Menu("My_menu", "My_class", m_items_podMenu1);
let pod_menuItem1 = new PodMenuItem(m_item2, menu2);

var m_difItems = {
  0: m_item1,
  1: pod_menuItem1,
  2: m_item3
};
var bigMenu = new Dif_Menu("dif_menu", "dif_class", m_difItems);
var div = document.write(bigMenu.render());



/* Доделал третье задание */

/**
 * Класс, объекты которого описывают параметры гамбургера. 
 * 
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка {}
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
  try {
    if (!(size instanceof list_chr) || !(stuffing instanceof list_chr)) {
      throw error;
    }
    if (size.price < 0 || size.calories < 0 || stuffing.price < 0 || stuffing.calories < 0)
      throw HamburgerException;
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
  } catch (error) {
   error.show_error();
  }
}

function list_chr(name, price, calories) {
  this.name = name;
  this.price = price;
  this.calories = calories;
}
/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = new list_chr("small", 50, 20);
Hamburger.SIZE_LARGE = new list_chr("large", 100, 40);
Hamburger.STUFFING_CHEESE = new list_chr("cheese", 10, 20);
Hamburger.STUFFING_SALAD = new list_chr("salad", 20, 5);
Hamburger.STUFFING_POTATO = new list_chr("potato", 15, 10);
Hamburger.TOPPING_MAYO = new list_chr("mayo", 20, 5);
Hamburger.TOPPING_SPICE = new list_chr("spice", 15, 0);
/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 * 
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {
  let flag = false;
  this.toppings.forEach(element => {
    if(element.name == topping.name) {
      flag = true;
    }
  });
  if(!flag) {
    this.toppings.push(topping);
  }
}
let b = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
b.addTopping(Hamburger.TOPPING_MAYO);
b.addTopping(Hamburger.TOPPING_MAYO);
b.addTopping(Hamburger.TOPPING_SPICE);
/**
 * Убрать добавку, при условии, что она ранее была 
 * добавлена.
 * 
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
  for (const i in this.toppings) {
    if(this.toppings[i].name == topping.name) {
      if(this.toppings.length == 1) {
        this.toppings.pop();
        return;
      }
      this.toppings.splice(i, 1, this.toppings.pop());
    }
  }
}
// b.removeTopping(Hamburger.TOPPING_MAYO);
// b.removeTopping(Hamburger.TOPPING_SPICE);
// b.removeTopping(Hamburger.TOPPING_SPICE);
/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
  if(!this.toppings.length) {
    return "Добавок нет";
  }
  return this.toppings;
}
/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
  return this.size.name;
}
/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
  return this.stuffing.name;
}
/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
  let price = this.size.price + this.stuffing.price;
  this.toppings.forEach(el => {
    price += el.price;
  });
  return price;
}
/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
  let calories = this.size.calories + this.stuffing.calories;
  this.toppings.forEach(el => {
    calories += el.calories;
  });
  return calories;
}
/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * @constructor 
 */
function HamburgerException() {
  this.message = "Неверные входные данные";
}
HamburgerException.prototype.show_error = function() {
  console.log(this.message);  
}
/* объект ошибок */
var error = new HamburgerException();