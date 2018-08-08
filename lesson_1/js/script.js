// function Car(color, wheels, engine) {
//   this.color = color;
//   this.wheels = wheels;
//   this.engine = engine;
// };

var audi = new Car("red", 4, {
  volume: 2.0,
  power: 225
});
var bmw = new Car("white", 4, {
  volume: 2.0,
  power: 194
});


function Vehicle() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.color = "white";
}
Vehicle.prototype.move = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

function Car() {
  // вызываем родительский конструктор
  Vehicle.call(this);
}


Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
var audi = new Car();
console.log('Audi – это машина?', audi instanceof Car); // true
console.log('Audi – это средство передвижения?', audi instanceof Vehicle); // true

function Car() {
  this.vinCode = "someVinCode";
}
Car.prototype.setVin = function (my_vin) {
  this.vinCode = my_vin;

}
var c1 = new Car();
c1.setVin("vin1");
var c2 = new Car();
c2.setVin("vin2");













function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}
let a = new Container();
Container.prototype.render = function () {
  return this.htmlCode;
}

function Menu(my_id, my_class, my_items) {
  Container.call(this);
  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}
let b = new Menu();
Menu.prototype = Object.create(Vehicle.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {}
var menu = new Menu("my_menu", "menu_class", {});
console.log(menu.render());


function MenuItem(my_href, my_name) {
  Container.call(this);
  this.className = "menu-item";
  this.href = my_href;
  this.name = my_name;
}
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
  return "<li class='" + this.className + "' href='" + this.href + "'>" + this.itemName + "</li>";
}
var m_item1 = new MenuItem("/", "Главная");
var m_item2 = new MenuItem("/catalogue/", "Каталог");
var m_item3 = new MenuItem("/gallery/", "Галерея");
var m_items = {
  0: m_item1,
  1: m_item2,
  2: m_item3
};

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







// /**
//  * Класс, объекты которого описывают параметры гамбургера. 
//  * 
//  * @constructor
//  * @param size        Размер
//  * @param stuffing    Начинка
//  * @throws {HamburgerException}  При неправильном использовании
//  */
// function Hamburger(size, stuffing) { ...
// }
// /* Размеры, виды начинок и добавок */
// Hamburger.SIZE_SMALL = ...
//   Hamburger.SIZE_LARGE = ...
//   Hamburger.STUFFING_CHEESE = ...
//   Hamburger.STUFFING_SALAD = ...
//   Hamburger.STUFFING_POTATO = ...
//   Hamburger.TOPPING_MAYO = ...
//   Hamburger.TOPPING_SPICE = ...
//   /**
//    * Добавить добавку к гамбургеру. Можно добавить несколько
//    * добавок, при условии, что они разные.
//    * 
//    * @param topping     Тип добавки
//    * @throws {HamburgerException}  При неправильном использовании
//    */
//   Hamburger.prototype.addTopping = function (topping)...
//   /**
//    * Убрать добавку, при условии, что она ранее была 
//    * добавлена.
//    * 
//    * @param topping   Тип добавки
//    * @throws {HamburgerException}  При неправильном использовании
//    */
//   Hamburger.prototype.removeTopping = function (topping)...
//   /**
//    * Получить список добавок.
//    *
//    * @return {Array} Массив добавленных добавок, содержит константы
//    *                 Hamburger.TOPPING_*
//    */
//   Hamburger.prototype.getToppings = function ()...
//   /**
//    * Узнать размер гамбургера
//    */
//   Hamburger.prototype.getSize = function ()...
//   /**
//    * Узнать начинку гамбургера
//    */
//   Hamburger.prototype.getStuffing = function ()...
//   /**
//    * Узнать цену гамбургера
//    * @return {Number} Цена в тугриках
//    */
//   Hamburger.prototype.calculatePrice = function ()...
//   /**
//    * Узнать калорийность
//    * @return {Number} Калорийность в калориях
//    */
//   Hamburger.prototype.calculateCalories = function ()...
//   /**
//    * Представляет информацию об ошибке в ходе работы с гамбургером. 
//    * Подробности хранятся в свойстве message.
//    * @constructor 
//    */
//   function HamburgerException(...) { ...
//   }