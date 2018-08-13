/* задание из видео-урока */
/* реализую несколько функций, для работы с сервером */


/**
 * Класс для работы с сервером
 */
function App() {
  this.baseURL = "http://89.108.65.123";

  /**
   * Получение последнего сообщения
   */
  this.getLastMes = () => {
     fetch(`${this.baseURL}/getMessage`, {
      method: 'GET'
    }).then((waaaath_is_this) => {
      return waaaath_is_this.text();
    }).then((abra_cadabra) => {
      this.lastMessage = abra_cadabra;     
    }).catch(err => {
      console.log("Ошибка:", err);      
    });
    
  }
  /**
   * Отправить сообщение на сервер
   */
  this.sendMessage = () => {
    fetch(`${this.baseURL}/sendMessage`, {
      method: 'POST',
      body: "EyeLeo"
    }).then(() => {
       
    }).catch(err => {
      console.log("Ошибка:", err);      
    });
  }
  /**
   * Получение списка пользователей
   */
  this.getUsers = () => {
    fetch(`${this.baseURL}/user`, {
      method: 'GET'
    }).then((list_users) => {
       return list_users.json();
    }).then((list) => {
      this.array_users = list;
    }).catch(err => {
      console.log("Ошибка:", err);      
    }); 
  }
  this.getUserByNumber = (number) => {
   try {
    if(!(number instanceof Number)) {
      throw new Error("Номер пользователя может быть только числом");
    }
    this.num_user = number;
    
   } catch (er) {
     console.log(er);
   }
    fetch(`${this.baseURL}/user/${number}`,{
      method: "GET"
    }).then(body => {
      return body.json();
    }).then(user => {
      user = JSON.stringify(user);
      console.log(`Данные пользователя №${this.num_user}: ${user}`);      
    }).catch(err => {

    });
  }
}



var a = new App();
//  a.getLastMes();
//  console.log(a.lastMessage);
//  setTimeout(() => {
//    console.log(a.lastMessage);
//  }, 500);
//  // a.sendMessage();
//  a.getUsers();
//  console.log(a.array_users);
//  setTimeout(() => {
//   a.array_users.forEach(elem => {console.log(elem)});
//  }, 500);
// a.getUserByNumber(1);






function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}
Container.prototype.render = function () {
  return this.htmlCode;
}
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
















/* Доделал третье задание из первого урока*/

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
    if (element.name == topping.name) {
      flag = true;
    }
  });
  if (!flag) {
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
    if (this.toppings[i].name == topping.name) {
      if (this.toppings.length == 1) {
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
  if (!this.toppings.length) {
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
HamburgerException.prototype.show_error = function () {
  console.log(this.message);
}
/* объект ошибок */
var error = new HamburgerException();