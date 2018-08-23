const BASE_URL = "http://89.108.65.123:8080";
class Cart {
  
  
  constructor() {
    $.ajax({
      url: `${BASE_URL}/shop`,
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
}


//let cart = new Cart();




$(".buy").on("click", function() {
  $(this).addClass("buy-done");
  $(this).siblings(".remove").addClass("d-b");   

    $(this).siblings(".remove").addClass("remove-done");

  setTimeout(() => {
    $(this).addClass("d-n");
  }, parseFloat($(this).css("transition-duration"))*1000);
})
$(".remove").on("click", function() {
  $(this).toggleClass("remove-done");
  $(this).siblings(".buy").removeClass("d-n");
  $(this).siblings(".buy").removeClass("buy-done");
  setTimeout(() => {
    $(this).removeClass("d-b");    
  }, parseFloat($(this).css("transition-duration"))*1000);
})

