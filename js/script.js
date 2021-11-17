$(document).ready(function () {
  $(".carousel__iner").slick({
    speed: 1000,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icon/left.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icon/right.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  });
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
  });
  $(".catalog-item__btn").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  $("#order form").validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: "Укажите ваше имя",
      phone: "Укажите ваш телефон",
      email: {
        required: "Укажите вашу почту",
        email: "Ваш email адрес должен быть в фомате name@domain.com",
      },
    },
  });

  $("#consultation-form").validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: "Укажите ваше имя",
      phone: "Укажите ваш телефон",
      email: {
        required: "Укажите вашу почту",
        email: "Ваш email адрес должен быть в фомате name@domain.com",
      },
    },
  });

  $("#consultation form").validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: "Укажите ваше имя",
      phone: "Укажите ваш телефон",
      email: {
        required: "Укажите вашу почту",
        email: "Ваш email адрес должен быть в фомате name@domain.com",
      },
    },
  });

  $("input[name=phone]").mask("+7(999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });
});
