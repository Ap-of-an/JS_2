$(document).ready(function () {
  let old_tab = $(".tabs li.active");
  let old_page = $(".pages-tabs li.active");

  $(".tabs li").on("click", function () {
    $(old_tab).removeClass("active");
    $(old_page).removeClass("active");
    $(this).addClass("active");
    old_tab = $(this);
    old_page = $($(".pages-tabs li").eq($(this).index()));
    old_page.addClass("active");
  });


  let btn_submit = document.querySelector("#submit");

  let form = document.querySelector("#form");
  form.onsubmit = () => {
    return false;
  }


  let array_sites = [];
  $.ajax({
    url: 'http://89.108.65.123/cities',
    dataType: "text",
    type: "GET",
    success: function (data, textStatus) {
      data = JSON.parse(data);
      for (const name_city of data) {
        array_sites.push(name_city.name);
      }
      array_sites.sort();
    },
    error: function (err) {
      console.error(err);
    }
  });

  let input_city = $("#city");
  let html_list = $("<ul class=\"list\" id=\"list\"></ul>");
  input_city.after(html_list);
  input_city.blur(function () {

  });
  input_city.focus(function () {
    input_city.on("input", function () {
      if (input_city.val().length >= 3) {
        setTimeout(function () {
          html_list.addClass("active");
          let str = input_city.val();
          let i = 0;
          let reg_exp = new RegExp(`^${str}[А-ЯЁа-яё\-]*`, 'gi');
          let array_li = [];
          for (const item of array_sites) {
            if (i < 5) {
              if (reg_exp.test(item)) {
                i++;
                array_li.push(item);
              }
            } else {
              break;
            }
          }
          let temp_str = "";
          html_list.empty();
          array_li.forEach(function (el) {
            temp_str += `<li>${el}</li>`;
          })
          html_list.append(temp_str);

          $("#list li").on("click", function () {
            let a = $(this).text();
            input_city.val(a);
            html_list.removeClass("active");
            input_city.focus();
          });
        }, 10);
      } else {
        html_list.removeClass("active");
      }
    });
  });
});