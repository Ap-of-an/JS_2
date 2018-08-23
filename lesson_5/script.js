const BASE_URL = "http://89.108.65.123:8080";
class Cart {
  
  
  constructor() {
    $.ajax({
      url: `${BASE_URL}/shop?user_id=_xutvksap8`,
      type: "GET",
      success: (data) => {
        this.user_id = data.user_id;
        this.cart = data.cart;
      },
      error: function (err) {
        console.error(err);
      }
    });
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
        this.comments.forEach((el) =>{
          if(el.comment_id == com_id) {
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
      success: (data) => {
      },
      error: function (err) {
        console.error(err);
      }
    });
  }
}

let cart = new Cart();


$(".buy").on("click", function() {
  $(this).addClass("buy-done");
  $(this).siblings(".remove").addClass("d-b");
    $(this).siblings(".remove").addClass("remove-done");
  setTimeout(() => {
    $(this).addClass("d-n");
  }, parseFloat($(this).css("transition-duration"))*1000);

  let price = $(this).parents(".price-btns").find(".price").text();
  let prod= $(this).parents(".product").find(".name").text();
  console.log(prod, price);
  cart.add_product(prod, price);
});


$(".remove").on("click", function() {
  $(this).toggleClass("remove-done");
  $(this).siblings(".buy").removeClass("d-n");
  $(this).siblings(".buy").removeClass("buy-done");
  setTimeout(() => {
    $(this).removeClass("d-b");    
  }, parseFloat($(this).css("transition-duration"))*1000);

  let prod= $(this).parents(".product").find(".name").text();
  let prod_id = "";
  cart.cart.forEach((el) => {
    if(el.product == prod) {
      prod_id = el.product_id;
      return;
    }
  });
  if(prod_id != "") {
    cart.del_product(prod_id);
  }
});

