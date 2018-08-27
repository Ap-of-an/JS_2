const BASE_URL = "http://89.108.65.123:8080";
class Cart {

  constructor() {
    this.cart = [];
    this.all_st = 0;
    $.ajax({
      url: `${BASE_URL}/shop?user_id=_xutvksap8`,
      type: "GET",
      success: (data) => {
        this.user_id = data.user_id;
        this.cart = data.cart;
        this.update_cart();
      },
      error: function (err) {
        console.error(err);
      }
    });
  }
  all_price() {
    let result = 0;
    this.cart.forEach(el => {
      result += +el.price;
    })
    return result;
  }
  update_cart() {
    $("#number_tov").text(`${cart.cart.length}`);
    $("#stoimost").text(`${this.all_price()}`);
  }
  add_product(product, price) {
    $.ajax({
      url: `${BASE_URL}/shop?user_id=${this.user_id}&product=${product}&price=${price}`,
      type: "POST",
      success: (data) => {
        this.cart.push(data);
      },
      error: function (err) {
        console.error(err);
      }
    });
  }
  del_product(product_id) {
    $.ajax({
      url: `${BASE_URL}/shop?user_id=${this.user_id}&product_id=${product_id}`,
      type: "DELETE",
      success: (data) => {
        this.user_id = data.user_id;
        this.cart = data.cart;
      },
      error: function (err) {
        console.error(err);
      }
    });
  }
}

class Comments {
  constructor() {
    $.ajax({
      url: `${BASE_URL}/comments`,
      type: "GET",
      success: (data) => {
        this.comments = data;
      },
      error: function (err) {
        console.error(err);
      }
    });
  }

  addComment(com_text) {
    $.ajax({
      url: `${BASE_URL}/comments?text=${com_text}`,
      type: "POST",
      success: (data) => {
        this.comments.push(data);
      },
      error: function (err) {
        console.error(err);
      }
    });
  }

  likeComment(com_id) {
    $.ajax({
      url: `${BASE_URL}/comment_id=${com_id}`,
      type: "PATCH",
      success: (data) => {
        this.comments.forEach((el) => {
          if (el.comment_id == com_id) {
            el = data;
            return;
          }
        })
      },
      error: function (err) {
        console.error(err);
      }
    });
  }

  removeComment(com_id) {
    $.ajax({
      url: `${BASE_URL}/comment_id=${com_id}`,
      type: "DELETE",
      success: (data) => {},
      error: function (err) {
        console.error(err);
      }
    });
  }
}

let cart = new Cart();


$(".buy").on("click", function () {
  $(this).addClass("buy-done");
  $(this).siblings(".remove").addClass("d-b");
  $(this).siblings(".remove").addClass("remove-done");
  setTimeout(() => {
    $(this).addClass("d-n");
  }, parseFloat($(this).css("transition-duration")) * 1000);

  let price = $(this).parents(".price-btns").find(".price").text();
  let prod = $(this).parents(".product").find(".name").text();
  console.log(prod, price);
  cart.add_product(prod, price);
  cart.update_cart();
});


$(".remove").on("click", function () {
  $(this).toggleClass("remove-done");
  $(this).siblings(".buy").removeClass("d-n");
  $(this).siblings(".buy").removeClass("buy-done");
  setTimeout(() => {
    $(this).removeClass("d-b");
  }, parseFloat($(this).css("transition-duration")) * 1000);

  let prod = $(this).parents(".product").find(".name").text();
  let prod_id = "";
  cart.cart.forEach((el) => {
    if (el.product == prod) {
      prod_id = el.product_id;
      return;
    }
  });
  if (prod_id != "") {
    cart.del_product(prod_id);
    cart.update_cart();
  }
});



$("input").on("invalid", function () {
  $(this).effect("bounce", {
    times: 2
  }, "slow");
  console.log("Введено невное выражение в " + $(this));
})

$(".basket").droppable({
  hoverClass: "drop-hover",
  drop: function (event, ui) {
    cart.add_product(ui.draggable.find(".name").text(), ui.draggable.find(".price").text());
    cart.update_cart();
  },

});
$(".product").draggable({
  cursorAt: {
    left: 25,
    top: 0
  },
  helper: function () {
    return $("<div style='background-color: #ddd; width: 50px; height: 50px;'></div>");
  },
  cursor: "move"

});

setTimeout(function () {

}, 200);