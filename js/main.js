const createUnsplashUrl = (id, w = 640) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const ICONS = {
  arrowUpRight: `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  arrowRight: `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
};

/* ---------- CATEGORIES + RUNNING STRIP ---------- */
const projectCategories = [
  {
    label: "Вітальня",
    imageIds: [
      "photo-1768609239321-1cfe14893e80",
      "photo-1618221195710-dd6b41faaea6",
      "photo-1583847268964-b28dc8f51f92",
      "photo-1564078516393-cf04bd966897",
      "photo-1555041469-a586c61ea9bc",
      "photo-1567016376408-0226e4d0c1ea",
    ],
  },
  {
    label: "Офіс",
    imageIds: [
      "photo-1762983870490-63e5ba07105b",
      "photo-1497366754035-f200968a6e72",
      "photo-1497366811353-6870744d04b2",
      "photo-1587702068694-a909ef4aa346",
      "photo-1606744824163-985d376605aa",
    ],
  },
  {
    label: "Кухня",
    imageIds: [
      "photo-1556912167-f556f1f39fdf",
      "photo-1600489000022-c2086d79f9d4",
      "photo-1628745277862-bc0b2d68c50c",
      "photo-1632583824020-937ae9564495",
      "photo-1610177534644-34d881503b83",
      "photo-1616046229478-9901c5536a45",
    ],
  },
  {
    label: "Спальня",
    imageIds: [
      "photo-1642541070065-3912f347e7c6",
      "photo-1604580040660-f0a7f9abaea6",
      "photo-1653974123568-b5eff6d851e1",
      "photo-1562438668-bcf0ca6578f0",
    ],
  },
  {
    label: "Кафе",
    imageIds: [
      "photo-1648462908676-8305f0eff8e0",
      "photo-1612192527395-06b72da6b35a",
      "photo-1775059956734-78ffd2075cec",
    ],
  },
  {
    label: "Ванна",
    imageIds: [
      "photo-1638799869566-b17fa794c4de",
      "photo-1631889993959-41b4e9c6e3c5",
      "photo-1650894622076-e09ab837c502",
    ],
  },
];
const categoryList = document.getElementById("categoryList");
const galleryStripTrack = document.getElementById("galleryStripTrack");
const galleryStrip = document.querySelector(".gallery-strip");
const defaultCategory = projectCategories[1];
let activeCategory = defaultCategory;
let resizeTimer;

function createGalleryCard(imageId, categoryLabel) {
  return `
    <figure class="gallery-card">
      <img src="${createUnsplashUrl(imageId)}" alt="${categoryLabel} — приклад роботи FORMA" loading="lazy">
      <figcaption class="gallery-caption">/ ${categoryLabel}</figcaption>
    </figure>
  `;
}

function renderGalleryStrip(category) {
  activeCategory = category;
  const cards = category.imageIds
    .map((imageId) => createGalleryCard(imageId, category.label))
    .join("");

  galleryStripTrack.style.animation = "none";
  galleryStripTrack.innerHTML = cards;

  const cardsWidth = galleryStripTrack.scrollWidth || 1;
  const repeatCount = Math.max(
    1,
    Math.ceil(galleryStrip.clientWidth / cardsWidth),
  );
  const loopUnit = cards.repeat(repeatCount);

  galleryStripTrack.innerHTML = loopUnit.repeat(2);
  void galleryStripTrack.offsetWidth;
  galleryStripTrack.style.animation = "";
  galleryStripTrack.style.animationDuration = `${
    category.imageIds.length * repeatCount * 5.5
  }s`;
}

function selectCategory(category, selectedButton) {
  categoryList
    .querySelectorAll(".category-button")
    .forEach((button) => {
      const isSelected = button === selectedButton;
      button.classList.toggle("is-active", isSelected);
      button.setAttribute("aria-selected", String(isSelected));
    });
  renderGalleryStrip(category);
}

projectCategories.forEach((category, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `category-button${index === 1 ? " is-active" : ""}`;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", String(index === 1));
  button.innerHTML = `<span class="category-marker">/</span> ${category.label}`;
  button.addEventListener("click", () => selectCategory(category, button));
  categoryList.appendChild(button);
});

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => renderGalleryStrip(activeCategory), 200);
});

renderGalleryStrip(defaultCategory);

/* ---------- services (data + render + modal) ---------- */
const services = [
  {
    tag: "Консультація",
    title: "Дизайн-консультація",
    imageId: "photo-1762983870490-63e5ba07105b",
    summary:
      "Отримайте професійну консультацію щодо планування та організації простору.",
    description: [
      "Перша зустріч, на якій ми розбираємо ваш простір: що працює, а що заважає. Ви отримуєте чіткий план дій ще до старту проєкту.",
      "Підходить, якщо ви хочете зрозуміти потенціал приміщення, бюджет і послідовність робіт.",
    ],
    includedItems: [
      "Аналіз приміщення та ваших задач",
      "Рекомендації щодо планування та зонування",
      "Орієнтовний бюджет і терміни",
      "Підбірка референсів за вашим стилем",
    ],
  },
  {
    tag: "Воркшоп",
    title: "Майстерня виробництва",
    imageId: "photo-1610177534644-34d881503b83",
    summary:
      "Власна майстерня як місце для виготовлення та підготовки елементів інтер\u0027єру.",
    description: [
      "Частину елементів інтер\u0027єру ми виготовляємо у власній майстерні — це контроль якості та можливість зробити дійсно унікальні речі.",
      "Меблі за індивідуальними розмірами, декор та авторські рішення під ваш проєкт.",
    ],
    includedItems: [
      "Меблі за індивідуальними розмірами",
      "Авторський декор та акцентні елементи",
      "Контроль якості на кожному етапі",
      "Узгодження матеріалів і фурнітури",
    ],
  },
  {
    tag: "Клієнт",
    title: "Замовлення та онлайн-супровід",
    imageId: "photo-1497366811353-6870744d04b2",
    summary:
      "Обслуговування замовлень та онлайн-консультації для клієнтів з міста та поза його межами.",
    description: [
      "Якщо ви не в Одесі — це не проблема. Ми ведемо проєкти онлайн: відеозустрічі, цифрові креслення та супровід на кожному кроці.",
      "Ви бачите прогрес у зручному форматі та завжди на звʼязку з командою.",
    ],
    includedItems: [
      "Онлайн-зустрічі та узгодження",
      "Цифровий дизайн-проєкт і візуалізації",
      "Супровід закупівель",
      "Звіти про хід робіт",
    ],
  },
  {
    tag: "Замір",
    title: "Виїзд на об\u0027єкт",
    imageId: "photo-1564078516393-cf04bd966897",
    highlighted: true,
    summary:
      "Щоб максимізувати результат, ми виїжджаємо безпосередньо на об\u0027єкт.",
    description: [
      "Ми приїжджаємо на ваш обʼєкт, робимо точні заміри та звіряємо простір із затвердженим дизайном.",
      "Це гарантує, що все стане на свої місця — без сюрпризів під час реалізації.",
    ],
    includedItems: [
      "Точні заміри приміщення",
      "Перевірка комунікацій та особливостей",
      "Узгодження дизайну з реальним простором",
      "Фотофіксація для команди",
    ],
  },
  {
    tag: "Доставка",
    title: "Реалізація та доставка",
    imageId: "photo-1768609239321-1cfe14893e80",
    summary:
      "Фінальне оздоблення, налаштування та доставка готових рішень на ваш об\u0027єкт.",
    description: [
      "Завершальний етап: ми привозимо, монтуємо та налаштовуємо все так, щоб ви одразу могли користуватися простором.",
      "Ви отримуєте готовий результат «під ключ» — лишається тільки насолоджуватися.",
    ],
    includedItems: [
      "Доставка та монтаж меблів",
      "Фінальне оздоблення та декор",
      "Прибирання після робіт",
      "Гарантія на виконані роботи",
    ],
  },
];
const servicesList = document.getElementById("servicesList");

services.forEach((service, index) => {
  const serviceButton = document.createElement("button");
  serviceButton.type = "button";
  serviceButton.className = `service-row${service.highlighted ? " is-highlighted" : ""}`;
  serviceButton.innerHTML = `
    <span class="service-index">0${index + 1}</span>
    <div>
      <span class="service-tag">${service.tag}</span>
      <h3>${service.title}</h3>
      <p>${service.summary}</p>
    </div>
    <span class="service-arrow">${ICONS.arrowUpRight}</span>
  `;
  serviceButton.addEventListener("click", () => openServiceModal(service));
  servicesList.appendChild(serviceButton);
});

function openServiceModal(service) {
  const modalHtml = `
    <div class="modal-kicker">Послуга · ${service.tag}</div>
    <h2>${service.title}</h2>
    ${service.description.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    <h3 class="modal-section-title">Що входить</h3>
    <ul>${service.includedItems.map((item) => `<li>${item}</li>`).join("")}</ul>
    <button class="primary-button" type="button" data-contact-prefill="${service.title}">
      Залишити заявку
      ${ICONS.arrowUpRight}
    </button>
  `;

  openModal(modalHtml, createUnsplashUrl(service.imageId, 900));
}

/* ---------- BLOG (data + render + modal + more) ---------- */
const blogPosts = [
  {
    title: "Мінімалістичний інтер\u0027єр у білому",
    imageId: "photo-1768609239321-1cfe14893e80",
    excerpt:
      "Як використати білі відтінки, щоб простір дихав світлом і виглядав дорожче.",
    featured: true,
    readTime: "5 хв",
    paragraphs: [
      "Білий — це не «нудно», а основа, на якій будується відчуття простору й світла. Головна помилка — використати один холодний білий на всьому. Простір стає стерильним.",
      "Працюйте відтінками: теплий білий на стінах, молочний у текстилі, графіт чи дерево як акцент. Так зʼявляється глибина.",
      "Додайте 2–3 фактури: матову стіну, лляний текстиль, дерево. Саме фактура рятує мінімалізм від відчуття «порожньо».",
      "І памʼятайте про світло — і денне, і кілька рівнів штучного. Білий інтерʼєр оживає саме завдяки правильному освітленню.",
    ],
  },
  {
    title: "Поради для маленької спальні",
    imageId: "photo-1653974123568-b5eff6d851e1",
    excerpt: "Прості рішення, що візуально розширюють кімнату.",
    readTime: "4 хв",
    paragraphs: [
      "Маленька спальня — це не вирок. Перше правило: менше різних поверхонь і кольорів, більше повітря.",
      "Ліжко з підйомним механізмом замінює шафу для сезонних речей. Вертикальні полиці тягнуть погляд угору й «піднімають» стелю.",
      "Дзеркало навпроти вікна подвоює денне світло. А вузькі бра замість тумбочкових ламп звільняють поверхні.",
      "Світла, спокійна гама й один акцент (узголівʼя або текстиль) — і кімната працює на відпочинок.",
    ],
  },
  {
    title: "Як обрати акценти в декорі",
    imageId: "photo-1606744824163-985d376605aa",
    excerpt: "Колір, фактура та форма, що працюють разом.",
    readTime: "4 хв",
    paragraphs: [
      "Акцент — це те, за що чіпляється око. Якщо акцентів забагато, простір втомлює. Правило: один головний акцент на зону.",
      "Обирайте акцент за принципом контрасту: до спокійної бази — насичений колір або виразна фактура.",
      "Повторіть акцентний колір 2–3 рази в різних предметах — так він виглядатиме навмисним, а не випадковим.",
      "Форма теж акцент: одна округла лінія в прямокутній кімнаті вже створює характер.",
    ],
  },
  {
    title: "Кухня, у якій хочеться готувати",
    imageId: "photo-1632583824020-937ae9564495",
    excerpt: "Ергономіка «робочого трикутника» простими словами.",
    readTime: "6 хв",
    additional: true,
    paragraphs: [
      "Зручна кухня починається не з краси, а з «робочого трикутника»: мийка — плита — холодильник. Чим логічніший їхній звʼязок, тим менше зайвих кроків.",
      "Робочу поверхню між мийкою та плитою лишайте вільною — це головна зона приготування.",
      "Підсвітка робочої зони важливіша за люстру: світло має падати на стіл, а не вам за спину.",
      "І зберігання: усе, чим користуєтесь щодня, — на рівні витягнутої руки. Решта — вище або нижче.",
    ],
  },
  {
    title: "Освітлення: 5 рівнів світла",
    imageId: "photo-1583847268964-b28dc8f51f92",
    excerpt: "Чому одна люстра ніколи не виглядає дорого.",
    readTime: "5 хв",
    additional: true,
    paragraphs: [
      "Дорогий інтерʼєр майже завжди має кілька сценаріїв світла, а не одну лампу на стелі.",
      "Рівень 1 — загальне світло. Рівень 2 — функціональне (робочі зони). Рівень 3 — акцентне (картини, ніші).",
      "Рівень 4 — декоративне (бра, гірлянди, свічки). Рівень 5 — природне, яким теж треба керувати через штори.",
      "Поєднайте хоча б три рівні — і простір заграє навіть без ремонту.",
    ],
  },
  {
    title: "Кафе як бренд: дизайн, що продає",
    imageId: "photo-1648462908676-8305f0eff8e0",
    excerpt: "Як інтерʼєр закладу впливає на середній чек.",
    readTime: "7 хв",
    additional: true,
    paragraphs: [
      "Інтерʼєр кафе — це частина меню. Він формує очікування ще до першого ковтка кави.",
      "Визначте одну впізнавану деталь: колір, матеріал чи форму, яку гість захоче сфотографувати. Це безкоштовний маркетинг.",
      "Зонуйте: місця для «швидко взяти каву» і для «затриматися надовго» працюють на різну виручку.",
      "І світло: тепле увечері продовжує час перебування, а отже — і чек.",
    ],
  },
];
const blogGrid = document.getElementById("blogGrid");
const showMorePostsButton = document.getElementById("showMorePostsButton");

blogPosts.forEach((post) => {
  const article = document.createElement("article");
  article.className = `blog-post${post.featured ? "" : " standard-post"}${
    post.additional ? " additional-post" : ""
  }`;
  article.innerHTML = `
    <div class="blog-post-image">
      <img src="${createUnsplashUrl(post.imageId, post.featured ? 900 : 700)}" alt="${post.title}" loading="lazy">
    </div>
    <div class="blog-post-content">
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <span class="read-more">Читати ${ICONS.arrowRight}</span>
    </div>
  `;
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.addEventListener("click", () => openBlogPostModal(post));
  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openBlogPostModal(post);
    }
  });
  blogGrid.appendChild(article);
});

function openBlogPostModal(post) {
  const modalHtml = `
    <div class="modal-kicker">Блог · ${post.readTime} читання</div>
    <h2>${post.title}</h2>
    ${post.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    <button class="primary-button" type="button" data-contact-prefill="">
      Замовити консультацію
      ${ICONS.arrowUpRight}
    </button>
  `;

  openModal(modalHtml, createUnsplashUrl(post.imageId, 900));
}

showMorePostsButton.addEventListener("click", () => {
  document
    .querySelectorAll(".additional-post")
    .forEach((post) => post.classList.add("is-visible"));
  showMorePostsButton.hidden = true;
});

/* ---------- MODAL ---------- */
const contentModal = document.getElementById("contentModal");
const modalContent = document.getElementById("modalContent");
const modalImage = document.getElementById("modalImage");
const modalCloseButton = document.getElementById("modalCloseButton");
let lastFocusedElement;

function openModal(html, imageUrl) {
  lastFocusedElement = document.activeElement;
  modalContent.innerHTML = html;
  modalImage.innerHTML = imageUrl
    ? `<img src="${imageUrl}" alt="">`
    : "";
  modalImage.hidden = !imageUrl;
  contentModal.classList.add("is-open");
  document.body.classList.add("modal-open");
  modalCloseButton.focus();
}

function closeModal() {
  if (!contentModal.classList.contains("is-open")) return;

  contentModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
}

modalCloseButton.addEventListener("click", closeModal);
contentModal.addEventListener("click", (event) => {
  if (event.target === contentModal) closeModal();
});
modalContent.addEventListener("click", (event) => {
  const contactButton = event.target.closest("[data-contact-prefill]");
  if (contactButton) goToContactForm(contactButton.dataset.contactPrefill);
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
  if (event.key === "Escape") setMobileMenuOpen(false);
});

/* ---------- FORM ---------- */
function goToContactForm(prefill = "") {
  closeModal();
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

  if (prefill) {
    document.getElementById("messageInput").value = `Цікавить послуга: ${prefill}`;
  }
}

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const formSuccess = document.getElementById("formSuccess");
const requiredInputs = [nameInput, phoneInput];

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const invalidInputs = requiredInputs.filter((input) => !input.value.trim());
  requiredInputs.forEach((input) => {
    input.classList.toggle("field-error", invalidInputs.includes(input));
  });

  if (invalidInputs.length) return;

  contactForm.hidden = true;
  formSuccess.classList.add("is-visible");
});

requiredInputs.forEach((input) => {
  input.addEventListener("input", () => input.classList.remove("field-error"));
});

/* ---------- GENERAL ---------- */
const hero = document.querySelector(".hero");
const siteHeader = document.getElementById("siteHeader");
const mobileMenu = document.getElementById("mobileMenu");
const menuToggle = document.getElementById("menuToggle");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const scrollToFeaturesButton = document.getElementById(
  "scrollToFeaturesButton",
);

window.addEventListener("load", () => hero.classList.add("is-loaded"));
window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 30);
});

function setMobileMenuOpen(isOpen) {
  mobileMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

menuToggle.addEventListener("click", () => setMobileMenuOpen(true));
mobileMenuClose.addEventListener("click", () => setMobileMenuOpen(false));
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenuOpen(false));
});
document.querySelectorAll("[data-contact-button]").forEach((button) => {
  button.addEventListener("click", () => goToContactForm());
});
scrollToFeaturesButton.addEventListener("click", () => {
  document.getElementById("features").scrollIntoView();
});

const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.14 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);
const countDuration = 1700;
const counterObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const targetValue = Number(counter.dataset.count);
      const statCard = counter.closest(".stat-card");
      let startTime;

      statCard?.classList.add("is-counting");

      function updateCounter(currentTime) {
        startTime ??= currentTime;
        const progress = Math.min(
          (currentTime - startTime) / countDuration,
          1,
        );
        counter.textContent = Math.round(
          easeOutCubic(progress) * targetValue,
        );

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = targetValue;
          statCard?.classList.remove("is-counting");
        }
      }

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(counter);
    }),
  { threshold: 0.4 },
);
document
  .querySelectorAll("[data-count]")
  .forEach((counter) => counterObserver.observe(counter));
