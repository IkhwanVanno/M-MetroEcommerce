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

  // Ambil produk untuk gallery dari dummyjson
  $.ajax({
    url: "https://dummyjson.com/products?limit=4",
    method: "GET",
    success: function (response) {
      isiGallery(response.products);
    },
    error: function () {
      $("#gallery-section").html(
        "<p style='color:red;'>Gagal memuat produk.</p>"
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

  // Fungsi isi Gallery
  function isiGallery(products) {
    let html = "";
    $.each(products, function (i, item) {
      html += `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${item.thumbnail}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                        </div>
                    </div>
                </div>
            `;
    });
    $("#gallery-section").html(html);
  }
});
