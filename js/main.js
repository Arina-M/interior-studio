const U = (id, w = 640) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ---------- CATEGORIES + RUNNING STRIP ---------- */
const CATS = [
  {
    key: "living",
    label: "Вітальня",
    imgs: [
      "photo-1768609239321-1cfe14893e80",
      "photo-1618221195710-dd6b41faaea6",
      "photo-1583847268964-b28dc8f51f92",
      "photo-1564078516393-cf04bd966897",
      "photo-1555041469-a586c61ea9bc",
      "photo-1567016376408-0226e4d0c1ea",
    ],
  },
  {
    key: "office",
    label: "Офіс",
    imgs: [
      "photo-1762983870490-63e5ba07105b",
      "photo-1497366754035-f200968a6e72",
      "photo-1497366811353-6870744d04b2",
      "photo-1587702068694-a909ef4aa346",
      "photo-1606744824163-985d376605aa",
    ],
  },
  {
    key: "kitchen",
    label: "Кухня",
    imgs: [
      "photo-1556912167-f556f1f39fdf",
      "photo-1600489000022-c2086d79f9d4",
      "photo-1628745277862-bc0b2d68c50c",
      "photo-1632583824020-937ae9564495",
      "photo-1610177534644-34d881503b83",
      "photo-1616046229478-9901c5536a45",
    ],
  },
  {
    key: "bedroom",
    label: "Спальня",
    imgs: [
      "photo-1642541070065-3912f347e7c6",
      "photo-1604580040660-f0a7f9abaea6",
      "photo-1653974123568-b5eff6d851e1",
      "photo-1562438668-bcf0ca6578f0",
    ],
  },
  {
    key: "cafe",
    label: "Кафе",
    imgs: [
      "photo-1648462908676-8305f0eff8e0",
      "photo-1612192527395-06b72da6b35a",
      "photo-1775059956734-78ffd2075cec",
    ],
  },
  {
    key: "bathroom",
    label: "Ванна",
    imgs: [
      "photo-1638799869566-b17fa794c4de",
      "photo-1631889993959-41b4e9c6e3c5",
      "photo-1650894622076-e09ab837c502",
    ],
  },
];
const catsEl = document.getElementById("cats");
const stripEl = document.getElementById("strip");
const stripBox = document.querySelector(".strip");
let activeCat = CATS[1];

function cardHTML(id, label) {
  return `<figure class="scard"><img src="${U(id)}" alt="${label} — приклад роботи FORMA" loading="lazy"><figcaption class="cap">/ ${label}</figcaption></figure>`;
}

function renderStrip(cat) {
  activeCat = cat;
  const set = cat.imgs.map((id) => cardHTML(id, cat.label)).join("");
  stripEl.style.animation = "none";
  stripEl.innerHTML = set;
  const setW = stripEl.scrollWidth || 1;
  // repeat the set so one loop-unit is at least as wide as the visible strip
  const reps = Math.max(1, Math.ceil(stripBox.clientWidth / setW));
  const unit = set.repeat(reps);
  stripEl.innerHTML = unit + unit; // two identical units => translateX(-50%) loops seamlessly
  void stripEl.offsetWidth; // reflow to restart cleanly
  stripEl.style.animation = "";
  stripEl.style.animationDuration = cat.imgs.length * reps * 5.5 + "s";
}
let rzT;
addEventListener("resize", () => {
  clearTimeout(rzT);
  rzT = setTimeout(() => renderStrip(activeCat), 200);
});
CATS.forEach((c, i) => {
  const b = document.createElement("button");
  b.className = "cat" + (i === 1 ? " active" : ""); // Офіс active by default (як у референсі)
  b.innerHTML = `<span class="sl">/</span> ${c.label}`;
  b.onclick = () => {
    document
      .querySelectorAll(".cat")
      .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    renderStrip(c);
  };
  catsEl.appendChild(b);
});
renderStrip(CATS[1]);

/* ---------- SERVICES (data + render + modal) ---------- */
const SERVICES = [
  {
    tag: "Консультація",
    title: "Дизайн-консультація",
    img: "photo-1762983870490-63e5ba07105b",
    short:
      "Отримайте професійну консультацію щодо планування та організації простору.",
    desc: [
      "Перша зустріч, на якій ми розбираємо ваш простір: що працює, а що заважає. Ви отримуєте чіткий план дій ще до старту проєкту.",
      "Підходить, якщо ви хочете зрозуміти потенціал приміщення, бюджет і послідовність робіт.",
    ],
    incl: [
      "Аналіз приміщення та ваших задач",
      "Рекомендації щодо планування та зонування",
      "Орієнтовний бюджет і терміни",
      "Підбірка референсів за вашим стилем",
    ],
  },
  {
    tag: "Воркшоп",
    title: "Майстерня виробництва",
    img: "photo-1610177534644-34d881503b83",
    short:
      "Власна майстерня як місце для виготовлення та підготовки елементів інтер\u0027єру.",
    desc: [
      "Частину елементів інтер\u0027єру ми виготовляємо у власній майстерні — це контроль якості та можливість зробити дійсно унікальні речі.",
      "Меблі за індивідуальними розмірами, декор та авторські рішення під ваш проєкт.",
    ],
    incl: [
      "Меблі за індивідуальними розмірами",
      "Авторський декор та акцентні елементи",
      "Контроль якості на кожному етапі",
      "Узгодження матеріалів і фурнітури",
    ],
  },
  {
    tag: "Клієнт",
    title: "Замовлення та онлайн-супровід",
    img: "photo-1497366811353-6870744d04b2",
    short:
      "Обслуговування замовлень та онлайн-консультації для клієнтів з міста та поза його межами.",
    desc: [
      "Якщо ви не в Одесі — це не проблема. Ми ведемо проєкти онлайн: відеозустрічі, цифрові креслення та супровід на кожному кроці.",
      "Ви бачите прогрес у зручному форматі та завжди на звʼязку з командою.",
    ],
    incl: [
      "Онлайн-зустрічі та узгодження",
      "Цифровий дизайн-проєкт і візуалізації",
      "Супровід закупівель",
      "Звіти про хід робіт",
    ],
  },
  {
    tag: "Замір",
    title: "Виїзд на об\u0027єкт",
    img: "photo-1564078516393-cf04bd966897",
    hot: true,
    short:
      "Щоб максимізувати результат, ми виїжджаємо безпосередньо на об\u0027єкт.",
    desc: [
      "Ми приїжджаємо на ваш обʼєкт, робимо точні заміри та звіряємо простір із затвердженим дизайном.",
      "Це гарантує, що все стане на свої місця — без сюрпризів під час реалізації.",
    ],
    incl: [
      "Точні заміри приміщення",
      "Перевірка комунікацій та особливостей",
      "Узгодження дизайну з реальним простором",
      "Фотофіксація для команди",
    ],
  },
  {
    tag: "Доставка",
    title: "Реалізація та доставка",
    img: "photo-1768609239321-1cfe14893e80",
    short:
      "Фінальне оздоблення, налаштування та доставка готових рішень на ваш об\u0027єкт.",
    desc: [
      "Завершальний етап: ми привозимо, монтуємо та налаштовуємо все так, щоб ви одразу могли користуватися простором.",
      "Ви отримуєте готовий результат «під ключ» — лишається тільки насолоджуватися.",
    ],
    incl: [
      "Доставка та монтаж меблів",
      "Фінальне оздоблення та декор",
      "Прибирання після робіт",
      "Гарантія на виконані роботи",
    ],
  },
];
const servList = document.getElementById("servList");
SERVICES.forEach((s, i) => {
  const b = document.createElement("button");
  b.className = "serv-row" + (s.hot ? " hot" : "");
  b.innerHTML = `<span class="idx">0${i + 1}</span>
      <div><span class="serv-tag">${s.tag}</span><h3>${s.title}</h3><p>${s.short}</p></div>
      <span class="serv-chev"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7v9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
  b.onclick = () => openService(s);
  servList.appendChild(b);
});
function openService(s) {
  const html = `<div class="modal-kicker">Послуга · ${s.tag}</div>
      <h2>${s.title}</h2>
      ${s.desc.map((p) => `<p>${p}</p>`).join("")}
      <h3 style="font-weight:700;margin:6px 0 12px;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:var(--light)">Що входить</h3>
      <ul>${s.incl.map((x) => `<li>${x}</li>`).join("")}</ul>
      <button class="btn-cta" onclick="goForm('${s.title.replace(/'/g, "\\'")}')">Залишити заявку
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
  openModal(html, U(s.img, 900));
}

/* ---------- BLOG (data + render + modal + more) ---------- */
const POSTS = [
  {
    title: "Мінімалістичний інтер\u0027єр у білому",
    img: "photo-1768609239321-1cfe14893e80",
    excerpt:
      "Як використати білі відтінки, щоб простір дихав світлом і виглядав дорожче.",
    feat: true,
    read: "5 хв",
    body: [
      "Білий — це не «нудно», а основа, на якій будується відчуття простору й світла. Головна помилка — використати один холодний білий на всьому. Простір стає стерильним.",
      "Працюйте відтінками: теплий білий на стінах, молочний у текстилі, графіт чи дерево як акцент. Так зʼявляється глибина.",
      "Додайте 2–3 фактури: матову стіну, лляний текстиль, дерево. Саме фактура рятує мінімалізм від відчуття «порожньо».",
      "І памʼятайте про світло — і денне, і кілька рівнів штучного. Білий інтерʼєр оживає саме завдяки правильному освітленню.",
    ],
  },
  {
    title: "Поради для маленької спальні",
    img: "photo-1653974123568-b5eff6d851e1",
    excerpt: "Прості рішення, що візуально розширюють кімнату.",
    read: "4 хв",
    body: [
      "Маленька спальня — це не вирок. Перше правило: менше різних поверхонь і кольорів, більше повітря.",
      "Ліжко з підйомним механізмом замінює шафу для сезонних речей. Вертикальні полиці тягнуть погляд угору й «піднімають» стелю.",
      "Дзеркало навпроти вікна подвоює денне світло. А вузькі бра замість тумбочкових ламп звільняють поверхні.",
      "Світла, спокійна гама й один акцент (узголівʼя або текстиль) — і кімната працює на відпочинок.",
    ],
  },
  {
    title: "Як обрати акценти в декорі",
    img: "photo-1606744824163-985d376605aa",
    excerpt: "Колір, фактура та форма, що працюють разом.",
    read: "4 хв",
    body: [
      "Акцент — це те, за що чіпляється око. Якщо акцентів забагато, простір втомлює. Правило: один головний акцент на зону.",
      "Обирайте акцент за принципом контрасту: до спокійної бази — насичений колір або виразна фактура.",
      "Повторіть акцентний колір 2–3 рази в різних предметах — так він виглядатиме навмисним, а не випадковим.",
      "Форма теж акцент: одна округла лінія в прямокутній кімнаті вже створює характер.",
    ],
  },
  {
    title: "Кухня, у якій хочеться готувати",
    img: "photo-1632583824020-937ae9564495",
    excerpt: "Ергономіка «робочого трикутника» простими словами.",
    read: "6 хв",
    more: true,
    body: [
      "Зручна кухня починається не з краси, а з «робочого трикутника»: мийка — плита — холодильник. Чим логічніший їхній звʼязок, тим менше зайвих кроків.",
      "Робочу поверхню між мийкою та плитою лишайте вільною — це головна зона приготування.",
      "Підсвітка робочої зони важливіша за люстру: світло має падати на стіл, а не вам за спину.",
      "І зберігання: усе, чим користуєтесь щодня, — на рівні витягнутої руки. Решта — вище або нижче.",
    ],
  },
  {
    title: "Освітлення: 5 рівнів світла",
    img: "photo-1583847268964-b28dc8f51f92",
    excerpt: "Чому одна люстра ніколи не виглядає дорого.",
    read: "5 хв",
    more: true,
    body: [
      "Дорогий інтерʼєр майже завжди має кілька сценаріїв світла, а не одну лампу на стелі.",
      "Рівень 1 — загальне світло. Рівень 2 — функціональне (робочі зони). Рівень 3 — акцентне (картини, ніші).",
      "Рівень 4 — декоративне (бра, гірлянди, свічки). Рівень 5 — природне, яким теж треба керувати через штори.",
      "Поєднайте хоча б три рівні — і простір заграє навіть без ремонту.",
    ],
  },
  {
    title: "Кафе як бренд: дизайн, що продає",
    img: "photo-1648462908676-8305f0eff8e0",
    excerpt: "Як інтерʼєр закладу впливає на середній чек.",
    read: "7 хв",
    more: true,
    body: [
      "Інтерʼєр кафе — це частина меню. Він формує очікування ще до першого ковтка кави.",
      "Визначте одну впізнавану деталь: колір, матеріал чи форму, яку гість захоче сфотографувати. Це безкоштовний маркетинг.",
      "Зонуйте: місця для «швидко взяти каву» і для «затриматися надовго» працюють на різну виручку.",
      "І світло: тепле увечері продовжує час перебування, а отже — і чек.",
    ],
  },
];
const blogGrid = document.getElementById("blogGrid");
POSTS.forEach((p, i) => {
  const a = document.createElement("article");
  a.className = "post" + (p.feat ? "" : " np") + (p.more ? " more-post" : "");
  a.innerHTML = `<div class="pimg"><img src="${U(p.img, p.feat ? 900 : 700)}" alt="${p.title}" loading="lazy"></div>
      <div class="card"><h3>${p.title}</h3><p>${p.excerpt}</p>
      <span class="read">Читати <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>`;
  a.onclick = () => openPost(p);
  blogGrid.appendChild(a);
});
function openPost(p) {
  const html = `<div class="modal-kicker">Блог · ${p.read} читання</div>
      <h2>${p.title}</h2>
      ${p.body.map((par) => `<p>${par}</p>`).join("")}
      <button class="btn-cta" onclick="goForm()">Замовити консультацію
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
  openModal(html, U(p.img, 900));
}
document.getElementById("moreBtn").onclick = function () {
  document
    .querySelectorAll(".more-post")
    .forEach((el) => el.classList.add("show"));
  this.style.display = "none";
};

/* ---------- MODAL ENGINE ---------- */
const modal = document.getElementById("modal");
function openModal(html, img) {
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modalImg").innerHTML = img
    ? `<img src="${img}" alt="">`
    : "";
  document.getElementById("modalImg").hidden = !img;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("modalClose").onclick = closeModal;
modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};
addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---------- FORM ---------- */
function goForm(prefill) {
  closeModal();
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  if (prefill) {
    const map = {
      "Дизайн-консультація": "Квартира / Дім",
      "Виїзд на об\u0027єкт": "Квартира / Дім",
    };
    const msg = document.getElementById("fm");
    if (msg) msg.value = "Цікавить послуга: " + prefill;
  }
}
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("fn").value.trim();
  const phone = document.getElementById("fp").value.trim();
  if (!name || !phone) {
    if (!name) document.getElementById("fn").style.borderColor = "#e0623f";
    if (!phone) document.getElementById("fp").style.borderColor = "#e0623f";
    return;
  }
  this.style.display = "none";
  document.getElementById("formOk").classList.add("show");
});
["fn", "fp"].forEach((id) =>
  document.getElementById(id).addEventListener("input", function () {
    this.style.borderColor = "";
  }),
);

/* ---------- GENERAL ---------- */
addEventListener("load", () =>
  document.querySelector(".hero").classList.add("loaded"),
);
const hdr = document.getElementById("hdr");
addEventListener("scroll", () =>
  hdr.classList.toggle("scrolled", scrollY > 30),
);
const mmenu = document.getElementById("mmenu");
document.getElementById("burger").onclick = () => mmenu.classList.add("open");
document.getElementById("mclose").onclick = () =>
  mmenu.classList.remove("open");
mmenu
  .querySelectorAll("a")
  .forEach((a) => (a.onclick = () => mmenu.classList.remove("open")));

const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.14 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
const easeOut = (p) => 1 - Math.pow(1 - p, 3);
const cio = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target,
        target = +el.dataset.count,
        dur = 1700;
      let start = null;
      el.parentElement &&
        el.closest(".statc") &&
        el.closest(".statc").classList.add("counting");
      const tick = (now) => {
        if (!start) start = now;
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(easeOut(p) * target);
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
          const c = el.closest(".statc");
          c && c.classList.remove("counting");
        }
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    }),
  { threshold: 0.4 },
);
document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
