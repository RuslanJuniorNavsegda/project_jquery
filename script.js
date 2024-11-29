$(document).ready(function () {
  // Фильтрация галереи
  $(".filter-buttons button").click(function () {
    const filter = $(this).attr("data-filter");

    // Активный класс на кнопке
    $(".filter-buttons button").removeClass("active");
    $(this).addClass("active");

    // Показываем или скрываем элементы
    if (filter === "all") {
      $(".gallery .item").fadeIn();
    } else {
      $(".gallery .item").fadeOut();
      $(`.gallery .item.${filter}`).fadeIn();
    }
  });

  // Открытие модального окна при клике на изображение
  $(".gallery .item img").click(function () {
    const src = $(this).attr("src");
    $("#modalImage").attr("src", src);
    $("#modal").fadeIn();
  });

  // Закрытие модального окна
  $("#closeModal, #modal").click(function () {
    $("#modal").fadeOut();
  });
});
