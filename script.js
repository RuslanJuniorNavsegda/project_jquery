$(document).ready(function () {
  let newImages = [
    { src: "./img/nature4.jpg", category: "nature" },
    { src: "./img/city4.jpg", category: "cities" },
    { src: "./img/nature5.jpg", category: "nature" },
    { src: "./img/city5.jpg", category: "cities" },
  ];

  function updateImageCount() {
    const visibleCount = $(".gallery .item:visible").length;
    $("#imageCount").text(`Отображено изображений: ${visibleCount}`);
  }

  $(".filter-buttons button").click(function () {
    const filter = $(this).attr("data-filter");

    $(".filter-buttons button").removeClass("active");
    $(this).addClass("active");

    if (filter === "all") {
      $(".gallery .item").fadeIn();
    } else {
      $(".gallery .item").fadeOut();
      $(`.gallery .item.${filter}`).fadeIn();
    }

    updateImageCount();
  });

  $(".gallery .item").fadeIn();
  updateImageCount();

  $("#loadMore").click(function () {
    if (newImages.length > 0) {
      const image = newImages.shift();
      $(".gallery").append(`
        <div class="item ${image.category}">
          <img src="${image.src}" alt="${image.category}">
          <button class="delete-btn">Удалить</button>
        </div>
      `);
      updateImageCount();
    } else {
      alert("Больше изображений нет!");
    }
  });

  $(".gallery").on("click", ".delete-btn", function () {
    $(this).parent().remove();
    updateImageCount();
  });

  $("#searchInput").on("input", function () {
    const query = $(this).val().toLowerCase();
    $(".gallery .item").each(function () {
      const category = $(this).attr("class").split(" ")[1];
      if (category.toLowerCase().includes(query)) {
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }
    });
    updateImageCount();
  });

  $("#shuffleBtn").click(function () {
    const items = $(".gallery .item").toArray();
    items.sort(() => Math.random() - 0.5);
    $(".gallery").html(items);
  });
});
