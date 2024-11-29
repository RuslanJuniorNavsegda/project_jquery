$(document).ready(function () {
  // Список новых изображений для загрузки
  let newImages = [
    { src: "nature4.jpg", category: "nature" },
    { src: "city4.jpg", category: "cities" },
    { src: "nature5.jpg", category: "nature" },
    { src: "city5.jpg", category: "cities" },
  ];

  let currentIndex = 0;

  // Функция обновления счётчика изображений
  function updateImageCount() {
    const visibleCount = $(".gallery .item:visible").length;
    $("#imageCount").text(`Отображено изображений: ${visibleCount}`);
  }

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

    // Обновляем счётчик
    updateImageCount();
  });

  // Изначальный подсчёт при загрузке страницы
  $(".gallery .item").fadeIn(); // Изначально показываем все изображения
  updateImageCount();

  // Загрузка новых изображений
  $("#loadMore").click(function () {
    if (newImages.length > 0) {
      const image = newImages.shift(); // Берём первое изображение
      $(".gallery").append(`
        <div class="item ${image.category}">
          <img src="${image.src}" alt="${image.category}">
        </div>
      `);
      updateImageCount(); // Обновляем счётчик
    } else {
      alert("Больше изображений нет!");
    }
  });

  // Открытие модального окна при клике на изображение
  $(".gallery").on("click", ".item img", function () {
    const src = $(this).attr("src");
    $("#modalImage").attr("src", src);
    $("#modal").fadeIn();
  });

  // Закрытие модального окна
  $("#closeModal, #modal").click(function () {
    $("#modal").fadeOut();
  });

  // Слайд-шоу
  function slideShow() {
    const items = $(".gallery .item:visible");
    items.hide(); // Скрыть все видимые изображения
    $(items[currentIndex]).fadeIn(); // Показать текущее изображение
    currentIndex = (currentIndex + 1) % items.length; // Циклический переход
  }

  // setInterval(slideShow, 3000); // Менять изображение каждые 3 секунды
  slideShow(); // Запускаем слайд-шоу
});
