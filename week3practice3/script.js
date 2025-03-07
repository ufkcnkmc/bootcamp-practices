$(document).ready(function () {
  const API_URL = "https://randomuser.me/api/";
  const PROFILE_COUNT = 8;
  const SLIDER_COUNT = 8;

  const $profileCards = $("#profileCards");
  const $profileSlider = $("#profileSlider");
  const $loading = $("#loading");
  const $error = $("#error");
  const $refreshBtn = $("#refreshProfiles");

  loadProfiles();

  $refreshBtn.on("click", function () {
    $(this).addClass("shake");
    setTimeout(() => {
      $(this).removeClass("shake");
    }, 1000);
    
    $loading.show();
    
    if ($profileSlider.hasClass('slick-initialized')) {
      $profileSlider.slick('unslick');
    }
    
    Fancybox.close();
    
    loadProfiles();
  });

  $(document)
    .on("mouseenter", ".profile-card", function () {
      $(this).addClass("highlighted");
    })
    .on("mouseleave", ".profile-card", function () {
      $(this).removeClass("highlighted");
    });

  function loadProfiles() {
    $profileCards.empty();
    $profileSlider.empty();

    $loading.show();
    $error.hide();

    $.ajax({
      url: `${API_URL}?results=${PROFILE_COUNT + SLIDER_COUNT}`,
      dataType: "json",
      success: function (data) {
        $loading.hide();

        renderProfiles(data.results);
      },
      error: function () {
        $loading.hide();
        $error.show();
      },
    });
  }

  function renderProfiles(users) {
    $profileCards.empty();
    $profileSlider.empty();

    const profileUsers = users.slice(0, PROFILE_COUNT);
    const profileHtml = profileUsers
      .map((user, index) => createProfileCard(user, index))
      .join("");
    $profileCards.html(profileHtml);

    const sliderUsers = users.slice(PROFILE_COUNT);
    const sliderHtml = sliderUsers
      .map((user) => createSliderCard(user))
      .join("");
    $profileSlider.html(sliderHtml);

    initSlider();
    initFancybox();
    applyAnimations();
  }

  function createProfileCard(user, index) {
    const fullName = `${user.name.first} ${user.name.last}`;
    const email = user.email;
    const country = user.location.country;
    const city = user.location.city;
    const phone = user.phone;
    const age = user.dob.age;
    const gender = user.gender;
    const registeredDate = new Date(user.registered.date).toLocaleDateString(
      "tr-TR"
    );

    const card = `
      <div class="profile-card" data-animation="${getRandomAnimation()}" data-index="${index}">
        <div class="card-header">
          <div class="avatar">
            <img src="${user.picture.large}" alt="${fullName}">
          </div>
        </div>
        <div class="card-body">
          <div class="profile-name">${fullName}</div>
          <div class="profile-email">${email}</div>
          <div class="profile-location">
            <i class="fas fa-map-marker-alt"></i> ${city}, ${country}
          </div>
          <div class="profile-details">
            <div>
              <div class="detail-item">Yaş</div>
              <div class="detail-value">${age}</div>
            </div>
            <div>
              <div class="detail-item">Cinsiyet</div>
              <div class="detail-value">${
                gender === "male" ? "Erkek" : "Kadın"
              }</div>
            </div>
          </div>
          <a href="javascript:;" class="btn profile-details-btn" 
             data-fancybox="profile-${index}" 
             data-src="#modal-${index}">
            Detaylar
          </a>
        </div>
      </div>
      ${createModalHTML(user, index)}
    `;

    return card;
  }

  function createModalHTML(user, index) {
    const fullName = `${user.name.first} ${user.name.last}`;
    const email = user.email;
    const phone = user.phone;
    const country = user.location.country;
    const city = user.location.city;
    const age = user.dob.age;
    const gender = user.gender;
    const registeredDate = new Date(user.registered.date).toLocaleDateString(
      "tr-TR"
    );

    return `
        <div id="modal-${index}" style="display:none;" class="modal-content">
            <div class="modal-profile">
                <div class="modal-avatar">
                    <img src="${user.picture.large}" alt="${fullName}">
                </div>
                <h2>${fullName}</h2>
                <div class="modal-info">
                    <div class="modal-info-item">
                        <div class="modal-info-label">E-posta:</div>
                        <div class="modal-info-value">${email}</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Telefon:</div>
                        <div class="modal-info-value">${phone}</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Adres:</div>
                        <div class="modal-info-value">${
                          user.location.street.name
                        } ${user.location.street.number}, ${city}, ${country}</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Doğum Tarihi:</div>
                        <div class="modal-info-value">${new Date(
                          user.dob.date
                        ).toLocaleDateString("tr-TR")}</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Yaş:</div>
                        <div class="modal-info-value">${age}</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Cinsiyet:</div>
                        <div class="modal-info-value">${
                          gender === "male" ? "Erkek" : "Kadın"
                        }</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Kayıt Tarihi:</div>
                        <div class="modal-info-value">${registeredDate}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
  }

  function createSliderCard(user) {
    const fullName = `${user.name.first} ${user.name.last}`;

    const sliderCardHTML = `
      <div class="slider-card">
        <div class="slider-avatar">
          <img src="${user.picture.medium}" alt="${fullName}">
        </div>
        <div class="slider-name">${fullName}</div>
      </div>
    `;

    return sliderCardHTML;
  }

  function applyAnimations() {
    $(".profile-card").each(function (index) {
      const $this = $(this);
      setTimeout(() => {
        const animation = $this.data("animation");
        $this
          .css({
            opacity: "1",
            transform: "translateY(0)",
          })
          .addClass(`animated ${animation}`);

        $this.find(".profile-details-btn").off("click").on("click", function () {
          $this.addClass("bounce");
          setTimeout(() => $this.removeClass("bounce"), 1000);
        });
      }, 100 * index);
    });
  }

  function initSlider() {
    if ($profileSlider.hasClass('slick-initialized')) {
      $profileSlider.slick('unslick');
    }
    
    $profileSlider.slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }

  function initFancybox() {
    Fancybox.bind("[data-fancybox]", {
      dragToClose: false,
      autoFocus: false,
      placeFocusBack: false,
      compact: false,
      idle: false,
      backdropClick: "close",
      mainClass: "dark-theme",
      l10n: {
        CLOSE: "Kapat",
        NEXT: "Sonraki",
        PREV: "Önceki",
      },
      template: {
        closeButton:
          '<button data-fancybox-close class="f-button is-close-btn"><i class="fa fa-times"></i></button>',
      },
    });
  }

  function getRandomAnimation() {
    const animations = ["fadeIn", "slideDown"];
    const randomIndex = Math.floor(Math.random() * animations.length);
    return animations[randomIndex];
  }
});
