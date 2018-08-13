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
    }).then((body) => {
      return body.text();
    }).then((mes) => {
      btn_1.querySelector("#btn_lastMessage + p").innerText = mes;
    }).catch(err => {
      console.log("Ошибка:", err);
    });
  }
  /**
   * Отправить сообщение на сервер
   */
  this.sendMessage = (text) => {
    fetch(`${this.baseURL}/sendMessage`, {
      method: 'POST',
      body: text
    }).then((answer) => {
      input_2.value = "";
      return answer.text();
    }).then((answer) => {
      console.log(answer);
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
      // this.array_users = list;
      let lists_user_html = "";
      let item = "";
      for (const i in list) {
        item = "<li>Пользователь № " + (+i + 1);
        item += `<br><span>Имя: ${list[i].name}</span><br>`;
        item += `<span>Адрес почты: ${list[i].email}</span><br>`;
        item += `<span>Возраст: ${list[i].age}</span></li>`;
        lists_user_html += item;
      }
      list_users.innerHTML = lists_user_html;
    }).catch(err => {
      console.log("Ошибка:", err);
    });
  }
  /**
   * Получение данных пользователя по индексу
   */
  this.getUserByNumber = (number) => {

    try {
      if (typeof number != "number") {
        throw new Error("Номер пользователя может быть только числом");
      }
      this.num_user = number;
    } catch (er) {
      console.log(er);
      return;
    }

    fetch(`${this.baseURL}/user/${number}`, {
      method: "GET"
    }).then(body => {
      return body.json();
    }).then(user_obj => {
      let i = 0;
      for (const key in user_obj) {
        if (user_obj.hasOwnProperty(key)) {
          if (key == "name" || key == "email" || key == "age") {
            i++;
          }
        }
      }
      if (i != 3) {
        p_user.innerHTML = "Такого пользователя не существует";
        console.log("Неверный формат данных с сервера или ошибка в запросе");
        return;
      }
      let item = `Данные пользователя №_${+this.num_user}:`;
      item += `<br><span>Имя: ${user_obj.name}</span><br>`;
      item += `<span>Адрес почты: ${user_obj.email}</span><br>`;
      item += `<span>Возраст: ${user_obj.age}</span>`;
      p_user.innerHTML = item;

      user_obj = JSON.stringify(user_obj);
      console.log(`Данные пользователя №${this.num_user}: ${user_obj}`);
    }).catch(err => {
      console.log(err);
    });
  }
  /**
   * Добавление пользователя
   */
  this.addUser = (obj) => {
    const body = JSON.stringify(obj);
    fetch(`${this.baseURL}/user/`, {
      method: 'POST',
      body: body,
      credentials: 'include'
      // когда я отправил запрос, то данные успешно добавились на сервер, однако в консоле я получил вот такую ошибку, а так же сработал .catch()
      //Failed to load http://89.108.65.123/user/: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. Origin 'http://127.0.0.1:5500' is therefore not allowed access.
      // Вы не могли бы помочь понять, как оценивать такое поведение? Ведь данные были добавлены, однако запрос вроде как не удался... непонятно
    }).then(() => {
      name.value = "";
      email.value = "";
      age.value = "";
    }).catch((err) => {
      console.log(err);
    })
  }
}

var ajax_ = new App();

let btn_1 = document.querySelector("#btn_lastMessage");
btn_1.addEventListener("click", function () {
  ajax_.getLastMes();
});
let bnt_2 = document.querySelector("#btn_sendMessage");
let input_2 = document.querySelector("#sendMes");
bnt_2.addEventListener("click", function () {
  ajax_.sendMessage(input_2.value);
});
let bnt_3 = document.querySelector("#btn_getUsers");
let list_users = document.querySelector("#list");
bnt_3.addEventListener("click", function () {
  ajax_.getUsers();
});
let btn_4 = document.querySelector("#btn_getUserByNum");
let user = document.querySelector("#user");
let p_user = document.querySelector("#field_user");
btn_4.addEventListener("click", function () {
  ajax_.getUserByNumber(+user.value);
});
let btn_5 = document.querySelector("#addUser");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let age = document.querySelector("#age");
btn_5.addEventListener("click", function () {
  let obj = {
    name: name.value,
    email: email.value,
    age: age.value
  }
  ajax_.addUser(obj);
});







/* Далее задание из методички, урок 2 */
/* так как сервера, на котором формируется меню меню в JSON-формате,
 нет, то ниже я создаю объект, содержащий в себе меню */

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
  let result = "<ul class='" + this.className + "' id='" + this.id + "'>";
  for (let i in this.items) {
    let temp = new MenuItem('#', this.items[i]);
    result += temp.render();
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
  let result = "<li class='" + this.className + "' href='" + this.href + "'>";
  if (typeof this.name == "object") {
    result += this.name['caption'];
    result += new Menu("q", "w", this.name['content']).render();
    result += "</li>";
  }
  if (typeof this.name == "string") {
    result += this.name + "</li>";
  }
  return result;
}


/* создаю объект, соответствующий меню интернет-магазина */
const menuShop = {
  '1': 'Main',
  '2': {
    'caption': 'Catalog',
    'content': {
      '1': 'Name list',
      '2': 'Name list',
      '3': 'Name list'
    }
  },
  '3': {
    'caption': 'Discounts/promotions/sales',
    'content': {
      '1': {
        'caption': 'Daily discounts',
        'content': {
          '1': 'Sanday',
          '2': 'Monday',
          '3': 'Tuesday',
          '4': 'Wednesday',
          '5': 'Thursday',
          '6': 'Friday',
          '7': 'Saturday'
        }
      },
      '2': {
        'caption': 'Seasonal discounts',
        'content': {
          '1': 'Autumn',
          '2': 'Winter',
          '3': 'Spring',
          '4': 'Summer'
        }
      }
    }
  },
  '4': 'Blog',
  '5': 'Basket',
};


let myMenu = new Menu('menu', 'class_menu', menuShop);
let main_menu = document.querySelector("#main-menu");
main_menu.innerHTML = myMenu.render();

let galery = document.querySelector("#galery");
let res_galery = "";

const stat_json_nabor = {
  '1': {
    'href_': "../img/photo.jpg"
  },
  '2': {
    'href_': "../img/photo.jpg"
  },
  '3': {
    'href_': "../img/photo.jpg"
  },
  '4': {
    'href_': "../img/photo.jpg"
  },
  '5': {
    'href_': "../img/photo.jpg"
  },
  '6': {
    'href_': "../img/photo.jpg"
  },
  '7': {
    'href_': "../img/photo.jpg"
  }
}

for (const i in stat_json_nabor) {
  if (stat_json_nabor.hasOwnProperty(i)) {
    const el = stat_json_nabor[i];
    res_galery += `<a href=${el['href_']} target="_blank"><img src=${el['href_']}></a>`
  }
}
galery.innerHTML = res_galery;


/* последнее задание со звёздочкой совершенно не понял, было бы круто, если бы вы объяснили его :-) */







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