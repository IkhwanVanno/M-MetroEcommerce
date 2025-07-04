// Navbar Menu
const links = document.querySelectorAll(".nav-link");
links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

$(document).ready(function () {
  // Ambil gambar untuk Carousel dari API picsum.photos
  $.ajax({
    url: "https://picsum.photos/v2/list?limit=5",
    method: "GET",
    success: function (data) {
      isiCarousel(data);
    },
    error: function () {
      $(".carousel-inner").html(
        "<p style='color:red;'>Gagal memuat gambar carousel.</p>"
      );
    },
  });

  // Fungsi isi Carousel
  function isiCarousel(data) {
    let carouselInner = "";
    let indicators = "";

    $.each(data, function (i, item) {
      let activeClass = i === 0 ? "active" : "";

      indicators += `
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${i}" class="${activeClass}" ${
        i === 0 ? 'aria-current="true"' : ""
      } aria-label="Slide ${i + 1}"></button>
            `;

      carouselInner += `
                <div class="carousel-item ${activeClass}">
                    <img src="${item.download_url}" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Photo by ${item.author}</h5>
                        <p>Gambar random dari picsum.photos</p>
                    </div>
                </div>
            `;
    });

    $(".carousel-inner").html(carouselInner);
    $(".carousel-indicators").html(indicators);
  }

  $.ajax({
    url: "https://dummyjson.com/products",
    method: "GET",
    success: function (response) {
      let products = response.products;

      // Isi Judul dan Deskripsi About
      $("#about-title").text(products[0].title);
      $("#about-description").text(products[0].description);

      // Gambar 1 (judul, deskripsi, gambar)
      $("#about-img-1 img").attr("src", products[1].thumbnail);
      $("#img-title-1").text(products[1].title);
      $("#img-desc-1").text(products[1].description);

      // Gambar 2 (judul, deskripsi, gambar)
      $("#about-img-2 img").attr("src", products[2].thumbnail);
      $("#img-title-2").text(products[2].title);
      $("#img-desc-2").text(products[2].description);
    },
    error: function () {
      alert("Gagal mengambil data dari API");
    },
  });
});
