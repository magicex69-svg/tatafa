// All visible text of the Tatafa page, in three languages.
// Structure (ids, coordinates, images) lives in routes/index.tsx; this file is only words.

export type Lang = "ru" | "en" | "zh";
export const LANGS: { id: Lang; label: string; htmlLang: string }[] = [
  { id: "ru", label: "RU", htmlLang: "ru" },
  { id: "en", label: "EN", htmlLang: "en" },
  { id: "zh", label: "中文", htmlLang: "zh-Hans" },
];

type Stat = { value: string; label: string };
type ZoneText = {
  title: string; subtitle: string; note: string;
  stats?: Stat[]; includes?: string[];
  build?: { kicker: string; title: string; text: string };
};
export type ZoneId = "marina" | "air" | "coast" | "domes" | "medical" | "center" | "north" | "east" | "manta";
type PlaceText = { name: string; dist: string; time: string; text: string };

export type Content = {
  meta: { title: string; description: string };
  nav: { sections: string[]; openMap: string; menu: string; close: string; cta: string; mainAria: string; menuAria: string; langAria: string; homeAria: string };
  hero: { kicker: string; tagline: string; status: string; aria: string; alt: string };
  today: {
    kicker: string; title: string; caption: string; mapsLink: string; sliderLabel: string; sliderAria: string;
    existing: string; proposed: string; altExisting: string; altProposed: string;
    place: [string, string]; region: string; facts: Stat[]; source: string; sourcesAria: string;
  };
  history: { kicker: string; title: string; lead: string; items: { year: string; title: string; text: string }[] };
  location: {
    kicker: string; title: string; lead: string; mapAria: string; ring1: string; ring2: string; capital: string; credit: string;
    places: { fiji: PlaceText; nz: PlaceText; au: PlaceText };
    local: { time: string; title: string; text: string };
    cruise: { kicker: string; title: string; alt: string; stats: Stat[]; text: string };
  };
  map: {
    kicker: string; title: string; lead: string; alt: string; hint: string; view: string; show: string; zoom: string; visual: string;
    indexAria: string; routesLabel: string; routesNote: string;
    routes: { arrival: { label: string; detail: string }; mobility: { label: string; detail: string }; pedestrian: { label: string; detail: string } };
  };
  objects: {
    title: string; lead: string; tabsAria: string; prev: string; next: string; shotsAria: string; shot: string;
    shotsCount: (n: number) => string; includesAria: string; buildCredit: string; buildAlt: string; locationAlt: string; shotAlt: string;
  };
  categories: { proposed: string; concept: string };
  zones: Record<ZoneId, ZoneText>;
  privileges: { kicker: string; title: string; lead: string; note: string; items: { tag: string; title: string; text: string }[] };
  why: { kicker: string; title: string; lead: string; items: { title: string; text: string }[] };
  investor: { kicker: string; title: string; lead: string; groups: { status: string; items: string[] }[] };
  economics: {
    kicker: string; title: string; lead: string; badge: string;
    neighboursTitle: string; labels: { keys: string; rate: string; assumed: string; revenue: string };
    neighbours: { name: string; place: string; keys: string; rate: string; assumed: string; revenue: string; range: string }[];
    oursTitle: string; oursLead: string;
    scLabels: { rates: string; occupancy: string; rooms: string; total: string; profit: string; payback: string };
    scenarios: { name: string; rates: string; occupancy: string; rooms: string; total: string; profit: string; payback: string }[];
    cruise: string; risksTitle: string; risks: string[]; sourcesTitle: string;
    chartTitle: string; chartUnit: string; source: string; tatafa: string;
  };
  offer: { kicker: string; title: string; text: string; raiseValue: string; raiseLabel: string; button: string };
  footer: {
    tagline: string; region: string; coords: string; sectionsTitle: string; links: string[];
    contactsTitle: string; contact: string; maps: string; wiki: string; legal: string; top: string; brandAria: string; sectionsAria: string;
  };
};

const ru: Content = {
  meta: { title: "TATAFA | Private Island Masterplan", description: "Генеральный план частного острова Татафа, Королевство Тонга." },
  nav: {
    sections: ["Остров", "Тонга", "Где это", "Карта", "Объекты", "Привилегии", "Инвестору"],
    openMap: "Открыть карту", menu: "Меню", close: "Закрыть", cta: "Обсудить условия входа",
    mainAria: "Основная навигация", menuAria: "Разделы сайта", langAria: "Язык сайта", homeAria: "Tatafa, начало",
  },
  hero: {
    kicker: "PRIVATE ISLAND MASTERPLAN", tagline: "Остров как единая архитектурная система.", status: "CONCEPT VISUALIZATION",
    aria: "Итоговая концепция острова", alt: "Визуализация полного генерального плана острова Татафа",
  },
  today: {
    kicker: "EXISTING / PROPOSED", title: "Остров до проекта и после.",
    caption: "Потяните границу: слева проект, справа остров сегодня. Спутниковый снимок совмещён с концепцией приблизительно, надпись на нём принадлежит источнику.",
    mapsLink: "Открыть в Google Maps", sliderLabel: "Сдвинуть границу сравнения", sliderAria: "Сравнение текущего и проектного вида",
    existing: "EXISTING", proposed: "PROPOSED", altExisting: "Существующий остров", altProposed: "Концепция будущего острова",
    place: ["Татафа", "Королевство Тонга"], region: "Группа Хаапай, округ Уиха",
    facts: [
      { value: "19°52′31″ ю. ш.\n174°25′12″ з. д.", label: "Координаты центра острова" },
      { value: "Природный берег", label: "Существующая территория" },
      { value: "≈ 1,3 × 0,38 км", label: "Длина и ширина" },
      { value: "≈ 29,5 га", label: "Площадь острова" },
      { value: "≈ 2,9 км", label: "Береговая линия" },
    ],
    source: "Размеры рассчитаны по контуру острова в OpenStreetMap и требуют геодезической проверки.", sourcesAria: "Источники",
  },
  history: {
    kicker: "KINGDOM OF TONGA", title: "Королевство, которое не было колонией.",
    lead: "Единственная страна Океании, сохранившая собственную монархию и суверенитет на протяжении всей истории.",
    items: [
      { year: "~800 до н. э.", title: "Первые поселенцы", text: "Мореплаватели культуры лапита приходят на острова на двухкорпусных каноэ. Тонга относится к самым ранним обжитым землям Полинезии." },
      { year: "X–XIII века", title: "Империя Туи-Тонга", text: "Власть правителей Тонга расходится по океану до Самоа и Фиджи. От той эпохи остался каменный трилит Хаамонга-а-Мауи." },
      { year: "1777", title: "Джеймс Кук в Хаапай", text: "Кука принимают на Лифуке, в той же островной группе, где лежит Татафа. Он называет архипелаг Островами Дружбы." },
      { year: "1789", title: "Мятеж на «Баунти»", text: "Самый известный мятеж в истории флота происходит в водах Хаапай, у вулкана Тофуа." },
      { year: "1875", title: "Конституция королевства", text: "Король Джордж Тупоу I принимает конституцию. В 1900–1970 годах страна живёт под британским протекторатом, монархия и самоуправление сохраняются." },
    ],
  },
  location: {
    kicker: "LOCATION", title: "Где это?",
    lead: "Южная часть Тихого океана, группа Хаапай. Рядом Фиджи, в нескольких часах полёта Новая Зеландия и Австралия.",
    mapAria: "Спутниковая карта: Татафа относительно Фиджи, Новой Зеландии и Австралии",
    ring1: "1 000 км", ring2: "2 000 км", capital: "Нукуалофа", credit: "Спутниковая мозаика: NASA Blue Marble. Расстояния по прямой.",
    places: {
      fiji: { name: "Фиджи", dist: "Сува · ≈ 780 км", time: "≈ 780 км · около 1,5 ч полёта", text: "Соседняя страна. Именно там стоят самые дорогие курорты региона: COMO Laucala и Kokomo." },
      nz: { name: "Новая Зеландия", dist: "Окленд · ≈ 2 160 км", time: "≈ 2 160 км · около 3 ч из Окленда", text: "Ближайший крупный рынок и главный авиаузел для перелёта в Тонга." },
      au: { name: "Австралия", dist: "Сидней · ≈ 3 720 км", time: "≈ 3 720 км · около 5 ч из Сиднея", text: "Прямые рейсы на Тонгатапу, вторая по размеру аудитория региона." },
    },
    local: { time: "≈ 160 км · около 40 мин местным рейсом", title: "Нукуалофа → Хаапай", text: "Из столицы до островной группы. Дальше катер до причала Татафа." },
    cruise: {
      kicker: "CRUISE TRAFFIC", title: "Круизные линии уже ходят через Тонга.", alt: "Круизный лайнер у островов Тонга",
      stats: [{ value: "30", label: "международных круизных судов зашли в порты Тонга в 2025 году" }, { value: "Ноя — Мар", label: "основной сезон заходов" }],
      text: "В 2025 году первые заходы сделали Cunard Queen Anne, Azamara и Oceania Riviera. Silversea и Seabourn ходят в северные группы островов. Причал Татафа рассчитан на приём таких судов.",
    },
  },
  map: {
    kicker: "PROPOSED", title: "Карта острова.", lead: "Выберите точку, чтобы увидеть место и архитектуру объекта. Под картой включаются маршруты.",
    alt: "Интерактивный проектный план острова Татафа", hint: "← Листайте карту →", view: "Смотреть объект", show: "Показать", zoom: "Приближение участка", visual: "Визуализация объекта",
    indexAria: "Список зон", routesLabel: "Маршруты",
    routesNote: "Показаны маршруты, различимые на концепции. Требуют отдельной схемы размещения: взлётная полоса, энергетика, вода, отходы, связь, сервисные проезды.",
    routes: {
      arrival: { label: "Arrival", detail: "Marina и причалы" },
      mobility: { label: "Internal mobility", detail: "Наземные связи" },
      pedestrian: { label: "Pedestrian", detail: "Виллы и прогулочная ось" },
    },
  },
  objects: {
    title: "Архитектура на карте.", lead: "Каждый ракурс относится к своей зоне на общем плане.", tabsAria: "Объекты проекта",
    prev: "Предыдущий ракурс", next: "Следующий ракурс", shotsAria: "Ракурсы объекта", shot: "Ракурс",
    shotsCount: (n) => `${n} ракурса`, includesAria: "Состав объекта", buildCredit: "Фото: сборка купола на производственной площадке.",
    buildAlt: "Сборка геодезического стеклянного купола на площадке", locationAlt: "Положение выбранного объекта на острове", shotAlt: "Архитектурная визуализация",
  },
  categories: { proposed: "PROPOSED", concept: "CONCEPT VISUALIZATION" },
  zones: {
    marina: { title: "Marina", subtitle: "Яхтенное прибытие", note: "Причал для круизных лайнеров, яхт и катеров. Главная точка прибытия на остров с моря.",
      stats: [{ value: "500–7 600", label: "пассажиров на лайнере" }, { value: "5", label: "яхт" }, { value: "6", label: "катеров" }] },
    air: { title: "Seaplane arrival", subtitle: "Гидросамолётный причал", note: "Отдельный причал для прибытия по воздуху: пассажирский гидросамолёт и экранопланы.",
      stats: [{ value: "19", label: "мест в гидросамолёте" }, { value: "2", label: "экраноплана" }] },
    coast: { title: "Private villas", subtitle: "Береговая линия", note: "Приватные виллы на первой линии, у кромки растительности, с видом на океан и рассвет.",
      stats: [{ value: "12", label: "приватных вилл" }, { value: "Super lux", label: "класс" }] },
    domes: { title: "Retreat centre", subtitle: "Южная лагуна", note: "Ретрит-центр в стеклянных геодезических куполах на воде. Две пешеходные ветви ведут от берега к виллам.",
      stats: [{ value: "64", label: "виллы в куполах" }, { value: "2", label: "пешеходные ветви" }],
      build: { kicker: "FIRST TO BE BUILT", title: "Готовые купола. Быстрый монтаж.", text: "Ретрит-центр собирается из готовых геодезических стеклянных куполов. Модули уже изготовлены и приходят на остров в сборе, поэтому установка не занимает много времени. Это первое, что будет построено на острове." } },
    medical: { title: "Medical centre", subtitle: "Диагностика и лечение", note: "Высокотехнологичный медицинский диагностическо-лечебный центр под стеклянным куполом.",
      includes: ["Диагностика", "Квантовая медицина", "Современная стоматология"] },
    center: { title: "Island centre", subtitle: "Центральный комплекс", note: "Административный центр управления островом и главная общественная зона.",
      includes: ["Управление островом", "Представительства ООН и ЮНЕСКО", "Цифровой крипто-банк", "Охранное агентство", "Торговый центр", "Сеть ресторанов", "Общественная зона", "Фонтаны"] },
    north: { title: "Northern villas", subtitle: "Северная лагуна", note: "Виллы на воде класса люкс у северного мыса. Вместе с восточной группой образуют один комплекс.",
      stats: [{ value: "64", label: "виллы люкс в двух группах" }, { value: "128 м²", label: "каждая вилла" }, { value: "2 × 256 м²", label: "рестораны" }],
      includes: ["Йога-центр", "SPA-комплекс"] },
    east: { title: "Eastern villas", subtitle: "Восточный риф", note: "Виллы на воде класса люкс вдоль восточного рифа. Вместе с северной группой образуют один комплекс.",
      stats: [{ value: "64", label: "виллы люкс в двух группах" }, { value: "128 м²", label: "каждая вилла" }, { value: "2 × 256 м²", label: "рестораны" }],
      includes: ["Йога-центр", "SPA-комплекс"] },
    manta: { title: "Manta", subtitle: "Плавучая платформа", note: "Развлекательный комплекс на воде в форме манты, связан с берегом кормовым мостом.",
      includes: ["Рестораны", "Концертная площадка", "Ночной клуб", "Детские аттракционы", "Бассейн с океанской водой", "Джакузи", "SPA-комплекс", "Казино"] },
  },
  privileges: {
    kicker: "PRIVILEGES", title: "Привилегии острова.", lead: "Что уже есть у проекта и что даёт сама юрисдикция.",
    note: "Налоговые и таможенные преференции означают право участвовать в действующих механизмах при соответствии их требованиям. Готовых освобождений проект не заявляет.",
    items: [
      { tag: "Закреплено", title: "Долгосрочные права на землю", text: "Права пользования землёй оформлены действующим меморандумом. Земля в Тонга иностранцам не продаётся, поэтому аренда здесь и есть высшая форма владения." },
      { tag: "Рынок", title: "Свободная премиальная ниша", text: "В группе Хаапай нет ни одного пятизвёздочного курорта. Ближайший ультра-люкс, COMO Laucala, находится на Фиджи, примерно в 650 км." },
      { tag: "Государство", title: "Сопровождение Invest in Tonga", text: "Государственное агентство ведёт регистрацию инвестиции, визиты на площадку и контакты с профильными ведомствами королевства." },
      { tag: "Закон", title: "Понятная правовая рамка", text: "Foreign Investment Act 2020 и Regulations 2021 задают процедуру входа и работы иностранного инвестора." },
      { tag: "Торговля", title: "PACER Plus", text: "Соглашение с Австралией и Новой Зеландией: беспошлинный ввоз товаров из Тонга на оба рынка и защита прав инвесторов." },
      { tag: "Проживание", title: "Право жить в королевстве", text: "Бизнес-виза иностранного инвестора позволяет проживать в Тонга на время работы проекта." },
    ],
  },
  why: {
    kicker: "WHY NOW", title: "Почему сейчас?", lead: "Премиального размещения в регионе почти нет. Шесть факторов, которые открывают окно входа.",
    items: [
      { title: "Ранний рынок", text: "Вход происходит до насыщения. Конкуренты в премиальном сегменте в Хаапай ещё не зашли." },
      { title: "Дефицит продукта", text: "Уникальных объектов размещения в Южной Пацифике мало, а спрос растёт быстрее предложения." },
      { title: "Круизный поток растёт", text: "В 2025 году в Тонга зашли 30 международных круизных судов, несколько линий пришли впервые." },
      { title: "Два платёжеспособных рынка рядом", text: "Новая Зеландия в трёх часах полёта, Австралия в пяти. Фиджи в полутора." },
      { title: "Модульная застройка", text: "Купола и виллы приходят в заводской готовности. Долгой стройки на удалённом острове нет, смета предсказуема." },
      { title: "Автономность", text: "Опреснитель, электрика и канализация на самом острове. Зависимости от береговых сетей нет." },
    ],
  },
  investor: {
    kicker: "TERMS", title: "Что получает инвестор?", lead: "Условия разделены по юридическому статусу. Всё, что ещё не закреплено, названо предметом переговоров.",
    groups: [
      { status: "Уже закреплено", items: ["Долгосрочные права пользования землёй по действующему меморандуму", "Приоритет на выбор зоны и объектов первой очереди"] },
      { status: "Предоставляет государство", items: ["Сопровождение Invest in Tonga", "Регистрация инвестиции", "Визиты на площадку и контакты с профильными ведомствами"] },
      { status: "Предмет переговоров", items: ["Доля и структура участия", "Права на нейминг вилл и зон", "Персональные условия проживания", "Объём преференций первого инвестора"] },
    ],
  },
  economics: {
    kicker: "ECONOMICS", title: "Сколько зарабатывают соседи и\u00A0сколько можем мы?",
    lead: "Курорты выручку не публикуют. Ниже расчёт по открытым ценам и числу вилл; загрузка и средний чек приняты как допущения.",
    badge: "Оценка",
    neighboursTitle: "Самые дорогие курорты региона, Фиджи",
    labels: { keys: "Номерной фонд", rate: "Цена за ночь", assumed: "Принято в расчёте", revenue: "Выручка в год" },
    neighbours: [
      { name: "COMO Laucala", place: "Фиджи · ≈ 650 км от Татафа", keys: "25 вилл", rate: "$5 600–14 300", assumed: "$7 000 за ночь, загрузка 40%", revenue: "≈ $26 млн", range: "диапазон $16–37 млн" },
      { name: "Kokomo Private Island", place: "Фиджи", keys: "21 вилла и 5 резиденций", rate: "от $2 000–3 600; остров целиком $65 000–100 000", assumed: "виллы $3 000 при 55%, резиденции $10 000 при 40%", revenue: "≈ $20 млн", range: "диапазон $13–27 млн" },
    ],
    oursTitle: "Потенциал Татафа: 140 номеров",
    oursLead: "64 купола, 64 виллы на воде и 12 приватных вилл. Это в 5,5 раза больше, чем у каждого из соседей, поэтому цены приняты ниже фиджийских, на уровне сильных курортов Мальдив.",
    scLabels: { rates: "Купол / вилла / приватная", occupancy: "Загрузка", rooms: "Проживание", total: "Выручка в год", profit: "Операционная прибыль", payback: "Окупаемость $79,5 млн" },
    scenarios: [
      { name: "Осторожный", rates: "$600 / $900 / $2 500", occupancy: "40%", rooms: "$18,4 млн", total: "≈ $25 млн", profit: "≈ $5 млн", payback: "около 16 лет" },
      { name: "Базовый", rates: "$900 / $1 400 / $4 000", occupancy: "55%", rooms: "$39,2 млн", total: "≈ $55 млн", profit: "≈ $16 млн", payback: "около 5 лет" },
      { name: "Сильный", rates: "$1 200 / $2 000 / $6 000", occupancy: "65%", rooms: "$65,7 млн", total: "≈ $95 млн", profit: "≈ $33 млн", payback: "около 2,5 лет" },
    ],
    cruise: "Выручка в год включает рестораны, SPA, медицинский центр и Manta: плюс 35–45% к проживанию. Круизные заходы добавляют ещё около $1,8 млн. Срок окупаемости считается от выхода на плановую загрузку, сам выход занимает 2–3 года.",
    risksTitle: "Что важно понимать",
    risks: [
      "Вся Тонга в 2024 году приняла 62 900 туристов и заработала на туризме $105 млн. Базовый сценарий означает около 11 000 гостей в год: остров должен сам создать свой поток, включая прямой трансфер.",
      "Загрузка соседних курортов, цена резиденций, доля дополнительных услуг и маржа 20–35% приняты как допущения, а не взяты из отчётности.",
    ],
    sourcesTitle: "Источники",
    chartTitle: "Выручка в год, млн долларов", chartUnit: "млн", source: "Источник", tatafa: "Татафа",
  },
  offer: {
    kicker: "Предложение", title: "Новое направление создаётся один раз.",
    text: "Пока рынок Южной Пацифики не сформирован, а площадки не разобраны, условия первого инвестора лучше условий всех, кто зайдёт после запуска.",
    raiseValue: "$79,5 млн", raiseLabel: "объём привлекаемых инвестиций", button: "Обсудить условия входа",
  },
  footer: {
    tagline: "Private Island Masterplan", region: "Королевство Тонга, группа Хаапай", coords: "19°52′31″ ю. ш., 174°25′12″ з. д.",
    sectionsTitle: "Разделы", links: ["Остров до и после", "Королевство Тонга", "Где это", "Карта острова", "Объекты", "Привилегии", "Инвестору"],
    contactsTitle: "Контакты", contact: "chairman@harmony-hub.group", maps: "Остров на Google Maps", wiki: "Wikipedia",
    legal: "Все изображения на сайте — концепт-визуализация. Архитектурная и инженерная документация проходит проверку, параметры и этапы проекта уточняются.",
    top: "К началу ↑", brandAria: "Tatafa, к началу", sectionsAria: "Разделы",
  },
};

const en: Content = {
  meta: { title: "TATAFA | Private Island Masterplan", description: "Masterplan of the private island of Tatafa, Kingdom of Tonga." },
  nav: {
    sections: ["Island", "Tonga", "Location", "Map", "Places", "Privileges", "Investors"],
    openMap: "Open the map", menu: "Menu", close: "Close", cta: "Discuss entry terms",
    mainAria: "Main navigation", menuAria: "Site sections", langAria: "Site language", homeAria: "Tatafa, top of page",
  },
  hero: {
    kicker: "PRIVATE ISLAND MASTERPLAN", tagline: "An island designed as one architectural system.", status: "CONCEPT VISUALIZATION",
    aria: "The island concept", alt: "Visualisation of the full masterplan of Tatafa island",
  },
  today: {
    kicker: "EXISTING / PROPOSED", title: "The island before and after.",
    caption: "Drag the divider: the project is on the left, the island today on the right. The satellite image is aligned with the concept approximately; the label on it belongs to the source.",
    mapsLink: "Open in Google Maps", sliderLabel: "Move the comparison divider", sliderAria: "Compare the current and proposed view",
    existing: "EXISTING", proposed: "PROPOSED", altExisting: "The island as it is", altProposed: "The proposed island concept",
    place: ["Tatafa", "Kingdom of Tonga"], region: "Haʻapai group, ʻUiha district",
    facts: [
      { value: "19°52′31″ S\n174°25′12″ W", label: "Centre of the island" },
      { value: "Natural shoreline", label: "Existing territory" },
      { value: "≈ 1.3 × 0.38 km", label: "Length and width" },
      { value: "≈ 29.5 ha", label: "Island area" },
      { value: "≈ 2.9 km", label: "Coastline" },
    ],
    source: "Dimensions are calculated from the island outline in OpenStreetMap and need a geodetic survey.", sourcesAria: "Sources",
  },
  history: {
    kicker: "KINGDOM OF TONGA", title: "A kingdom that was never a colony.",
    lead: "The only country in Oceania to keep its own monarchy and sovereignty throughout its history.",
    items: [
      { year: "c. 800 BC", title: "First settlers", text: "Lapita seafarers reach the islands in double-hulled canoes. Tonga is among the earliest settled lands of Polynesia." },
      { year: "10th–13th centuries", title: "The Tuʻi Tonga empire", text: "The rule of Tonga's kings spreads across the ocean to Samoa and Fiji. The stone trilithon Haʻamonga ʻa Maui survives from that era." },
      { year: "1777", title: "James Cook in Haʻapai", text: "Cook is received on Lifuka, in the same island group where Tatafa lies. He names the archipelago the Friendly Islands." },
      { year: "1789", title: "Mutiny on the Bounty", text: "The most famous mutiny in naval history takes place in the waters of Haʻapai, off the volcano of Tofua." },
      { year: "1875", title: "The constitution", text: "King George Tupou I adopts a constitution. From 1900 to 1970 the country is a British protected state, keeping its monarchy and self-government." },
    ],
  },
  location: {
    kicker: "LOCATION", title: "Where is it?",
    lead: "The South Pacific, Haʻapai group. Fiji is next door; New Zealand and Australia are a few hours away by air.",
    mapAria: "Satellite map: Tatafa in relation to Fiji, New Zealand and Australia",
    ring1: "1,000 km", ring2: "2,000 km", capital: "Nukuʻalofa", credit: "Satellite mosaic: NASA Blue Marble. Straight-line distances.",
    places: {
      fiji: { name: "Fiji", dist: "Suva · ≈ 780 km", time: "≈ 780 km · about 1.5 h by air", text: "The neighbouring country, home to the region's most expensive resorts: COMO Laucala and Kokomo." },
      nz: { name: "New Zealand", dist: "Auckland · ≈ 2,160 km", time: "≈ 2,160 km · about 3 h from Auckland", text: "The nearest large market and the main air hub for travel to Tonga." },
      au: { name: "Australia", dist: "Sydney · ≈ 3,720 km", time: "≈ 3,720 km · about 5 h from Sydney", text: "Direct flights to Tongatapu and the region's second-largest audience." },
    },
    local: { time: "≈ 160 km · about 40 min by local flight", title: "Nukuʻalofa → Haʻapai", text: "From the capital to the island group, then by boat to the Tatafa pier." },
    cruise: {
      kicker: "CRUISE TRAFFIC", title: "Cruise lines already sail through Tonga.", alt: "A cruise ship off the islands of Tonga",
      stats: [{ value: "30", label: "international cruise ships called at Tongan ports in 2025" }, { value: "Nov — Mar", label: "main calling season" }],
      text: "In 2025 Cunard Queen Anne, Azamara and Oceania Riviera made their first calls. Silversea and Seabourn sail to the northern island groups. The Tatafa pier is designed to receive ships of this class.",
    },
  },
  map: {
    kicker: "PROPOSED", title: "Map of the island.", lead: "Pick a point to see the place and its architecture. Routes can be switched on below the map.",
    alt: "Interactive masterplan of Tatafa island", hint: "← Swipe the map →", view: "View this place", show: "Show", zoom: "Close-up of the area", visual: "Visualisation",
    indexAria: "List of zones", routesLabel: "Routes",
    routesNote: "Only routes that can be read from the concept are shown. Still to be located on a separate scheme: runway, energy, water, waste, communications, service roads.",
    routes: {
      arrival: { label: "Arrival", detail: "Marina and piers" },
      mobility: { label: "Internal mobility", detail: "Land connections" },
      pedestrian: { label: "Pedestrian", detail: "Villas and the walking axis" },
    },
  },
  objects: {
    title: "Architecture on the map.", lead: "Every view belongs to its own zone on the masterplan.", tabsAria: "Places of the project",
    prev: "Previous view", next: "Next view", shotsAria: "Views of this place", shot: "View",
    shotsCount: (n) => `${n} views`, includesAria: "What it includes", buildCredit: "Photo: a dome being assembled at the production site.",
    buildAlt: "A geodesic glass dome being assembled on site", locationAlt: "Position of the selected place on the island", shotAlt: "Architectural visualisation",
  },
  categories: { proposed: "PROPOSED", concept: "CONCEPT VISUALIZATION" },
  zones: {
    marina: { title: "Marina", subtitle: "Arrival by yacht", note: "A pier for cruise liners, yachts and tenders. The main point of arrival from the sea.",
      stats: [{ value: "500–7,600", label: "passengers per liner" }, { value: "5", label: "yachts" }, { value: "6", label: "tenders" }] },
    air: { title: "Seaplane arrival", subtitle: "Seaplane pier", note: "A separate pier for arrival by air: a passenger seaplane and ground-effect craft.",
      stats: [{ value: "19", label: "seats on the seaplane" }, { value: "2", label: "ground-effect craft" }] },
    coast: { title: "Private villas", subtitle: "The shoreline", note: "Private beachfront villas at the edge of the vegetation, facing the ocean and the sunrise.",
      stats: [{ value: "12", label: "private villas" }, { value: "Super lux", label: "class" }] },
    domes: { title: "Retreat centre", subtitle: "Southern lagoon", note: "A retreat centre in glass geodesic domes on the water. Two walkways lead from the shore to the villas.",
      stats: [{ value: "64", label: "dome villas" }, { value: "2", label: "walkways" }],
      build: { kicker: "FIRST TO BE BUILT", title: "Ready-made domes. Fast assembly.", text: "The retreat centre is assembled from ready-made geodesic glass domes. The modules are already manufactured and arrive on the island as kits, so installation takes little time. It is the first thing to be built on the island." } },
    medical: { title: "Medical centre", subtitle: "Diagnostics and treatment", note: "A high-tech diagnostic and treatment centre under a glass dome.",
      includes: ["Diagnostics", "Quantum medicine", "Modern dentistry"] },
    center: { title: "Island centre", subtitle: "The central complex", note: "The administrative centre that runs the island, and its main public space.",
      includes: ["Island administration", "UN and UNESCO offices", "Digital crypto bank", "Security agency", "Shopping centre", "Restaurants", "Public space", "Fountains"] },
    north: { title: "Northern villas", subtitle: "Northern lagoon", note: "Luxury water villas off the northern cape. Together with the eastern group they form one complex.",
      stats: [{ value: "64", label: "luxury villas in two groups" }, { value: "128 m²", label: "each villa" }, { value: "2 × 256 m²", label: "restaurants" }],
      includes: ["Yoga centre", "Spa complex"] },
    east: { title: "Eastern villas", subtitle: "Eastern reef", note: "Luxury water villas along the eastern reef. Together with the northern group they form one complex.",
      stats: [{ value: "64", label: "luxury villas in two groups" }, { value: "128 m²", label: "each villa" }, { value: "2 × 256 m²", label: "restaurants" }],
      includes: ["Yoga centre", "Spa complex"] },
    manta: { title: "Manta", subtitle: "Floating platform", note: "An entertainment complex on the water in the shape of a manta ray, linked to the shore by a bridge.",
      includes: ["Restaurants", "Concert venue", "Night club", "Children's attractions", "Ocean-water pool", "Jacuzzi", "Spa complex", "Casino"] },
  },
  privileges: {
    kicker: "PRIVILEGES", title: "Privileges of the island.", lead: "What the project already holds and what the jurisdiction itself provides.",
    note: "Tax and customs preferences mean the right to take part in existing schemes when their requirements are met. The project does not claim any ready-made exemptions.",
    items: [
      { tag: "Secured", title: "Long-term land rights", text: "Land-use rights are set out in a memorandum in force. Land in Tonga is not sold to foreigners, so a lease is the highest form of tenure here." },
      { tag: "Market", title: "An open premium niche", text: "There is not a single five-star resort in the Haʻapai group. The nearest ultra-luxury property, COMO Laucala, is in Fiji, about 650 km away." },
      { tag: "State", title: "Support from Invest in Tonga", text: "The government agency handles investment registration, site visits and contacts with the kingdom's ministries." },
      { tag: "Law", title: "A clear legal framework", text: "The Foreign Investment Act 2020 and the Regulations 2021 define how a foreign investor enters and operates." },
      { tag: "Trade", title: "PACER Plus", text: "An agreement with Australia and New Zealand: duty-free entry of Tongan goods to both markets and protection of investors' rights." },
      { tag: "Residence", title: "The right to live in the kingdom", text: "A foreign investor's business visa allows residence in Tonga for the duration of the project." },
    ],
  },
  why: {
    kicker: "WHY NOW", title: "Why now?", lead: "There is almost no premium accommodation in the region. Six factors that open the window for entry.",
    items: [
      { title: "An early market", text: "Entry comes before saturation. Premium competitors have not yet arrived in Haʻapai." },
      { title: "A shortage of product", text: "Distinctive places to stay are rare in the South Pacific, and demand grows faster than supply." },
      { title: "Cruise traffic is growing", text: "In 2025 thirty international cruise ships called at Tonga, several lines for the first time." },
      { title: "Two wealthy markets nearby", text: "New Zealand is three hours away by air, Australia five, Fiji an hour and a half." },
      { title: "Modular construction", text: "Domes and villas arrive factory-finished. No long build on a remote island, and the budget is predictable." },
      { title: "Self-sufficiency", text: "Desalination, power and sewerage are on the island itself. No dependence on mainland networks." },
    ],
  },
  investor: {
    kicker: "TERMS", title: "What does the investor get?", lead: "Terms are grouped by legal status. Anything not yet secured is named as a subject of negotiation.",
    groups: [
      { status: "Already secured", items: ["Long-term land-use rights under the memorandum in force", "Priority in choosing the zone and first-phase properties"] },
      { status: "Provided by the state", items: ["Support from Invest in Tonga", "Investment registration", "Site visits and contacts with the relevant ministries"] },
      { status: "Subject to negotiation", items: ["Share and structure of participation", "Naming rights for villas and zones", "Personal residence terms", "Scope of first-investor preferences"] },
    ],
  },
  economics: {
    kicker: "ECONOMICS", title: "What do the neighbours earn, and what could\u00A0we?",
    lead: "Resorts do not publish revenue. The figures below are calculated from public rates and villa counts; occupancy and average rate are assumptions.",
    badge: "Estimate",
    neighboursTitle: "The region's most expensive resorts, Fiji",
    labels: { keys: "Keys", rate: "Rate per night", assumed: "Assumed", revenue: "Revenue per year" },
    neighbours: [
      { name: "COMO Laucala", place: "Fiji · ≈ 650 km from Tatafa", keys: "25 villas", rate: "$5,600–14,300", assumed: "$7,000 per night, 40% occupancy", revenue: "≈ $26M", range: "range $16–37M" },
      { name: "Kokomo Private Island", place: "Fiji", keys: "21 villas and 5 residences", rate: "from $2,000–3,600; whole island $65,000–100,000", assumed: "villas $3,000 at 55%, residences $10,000 at 40%", revenue: "≈ $20M", range: "range $13–27M" },
    ],
    oursTitle: "Tatafa's potential: 140 keys",
    oursLead: "64 domes, 64 water villas and 12 private villas. That is 5.5 times more than either neighbour, so rates are set below Fiji's, at the level of strong Maldives resorts.",
    scLabels: { rates: "Dome / villa / private", occupancy: "Occupancy", rooms: "Rooms", total: "Revenue per year", profit: "Operating profit", payback: "Payback of $79.5M" },
    scenarios: [
      { name: "Cautious", rates: "$600 / $900 / $2,500", occupancy: "40%", rooms: "$18.4M", total: "≈ $25M", profit: "≈ $5M", payback: "about 16 years" },
      { name: "Base", rates: "$900 / $1,400 / $4,000", occupancy: "55%", rooms: "$39.2M", total: "≈ $55M", profit: "≈ $16M", payback: "about 5 years" },
      { name: "Strong", rates: "$1,200 / $2,000 / $6,000", occupancy: "65%", rooms: "$65.7M", total: "≈ $95M", profit: "≈ $33M", payback: "about 2.5 years" },
    ],
    cruise: "Revenue per year includes restaurants, spa, the medical centre and Manta: 35–45% on top of rooms. Cruise calls add roughly $1.8M more. Payback is counted from reaching planned occupancy, which itself takes 2–3 years.",
    risksTitle: "What to keep in mind",
    risks: [
      "In 2024 all of Tonga received 62,900 visitors and earned $105M from tourism. The base case means about 11,000 guests a year: the island has to create its own flow, including direct transfers.",
      "Neighbours' occupancy, the residence rate, the share of extra services and the 20–35% margin are assumptions, not reported figures.",
    ],
    sourcesTitle: "Sources",
    chartTitle: "Revenue per year, $ million", chartUnit: "M", source: "Source", tatafa: "Tatafa",
  },
  offer: {
    kicker: "The offer", title: "A new destination is created only once.",
    text: "While the South Pacific market is still taking shape and the sites are not yet taken, the first investor's terms are better than those of everyone who enters after launch.",
    raiseValue: "$79.5M", raiseLabel: "investment being raised", button: "Discuss entry terms",
  },
  footer: {
    tagline: "Private Island Masterplan", region: "Kingdom of Tonga, Haʻapai group", coords: "19°52′31″ S, 174°25′12″ W",
    sectionsTitle: "Sections", links: ["The island before and after", "Kingdom of Tonga", "Location", "Map of the island", "Places", "Privileges", "Investors"],
    contactsTitle: "Contact", contact: "chairman@harmony-hub.group", maps: "The island on Google Maps", wiki: "Wikipedia",
    legal: "All images on this site are concept visualisations. Architectural and engineering documentation is under review; project parameters and phases are being finalised.",
    top: "Back to top ↑", brandAria: "Tatafa, back to top", sectionsAria: "Sections",
  },
};

const zh: Content = {
  meta: { title: "TATAFA | 私人岛屿总体规划", description: "汤加王国塔塔法私人岛屿总体规划。" },
  nav: {
    sections: ["岛屿", "汤加", "位置", "地图", "项目", "优势", "投资者"],
    openMap: "打开地图", menu: "菜单", close: "关闭", cta: "洽谈进入条件",
    mainAria: "主导航", menuAria: "网站栏目", langAria: "网站语言", homeAria: "Tatafa，返回顶部",
  },
  hero: {
    kicker: "PRIVATE ISLAND MASTERPLAN", tagline: "一座作为完整建筑体系来设计的岛屿。", status: "CONCEPT VISUALIZATION",
    aria: "岛屿总体概念", alt: "塔塔法岛完整总体规划效果图",
  },
  today: {
    kicker: "EXISTING / PROPOSED", title: "岛屿的现状与未来。",
    caption: "拖动分界线：左侧为规划方案，右侧为岛屿现状。卫星影像与方案为近似对位，影像上的文字来自原始来源。",
    mapsLink: "在 Google 地图中打开", sliderLabel: "移动对比分界线", sliderAria: "对比现状与规划视图",
    existing: "EXISTING", proposed: "PROPOSED", altExisting: "岛屿现状", altProposed: "未来岛屿概念",
    place: ["塔塔法岛", "汤加王国"], region: "哈派群岛，乌伊哈区",
    facts: [
      { value: "南纬 19°52′31″\n西经 174°25′12″", label: "岛屿中心坐标" },
      { value: "天然海岸", label: "现有土地" },
      { value: "约 1.3 × 0.38 公里", label: "长度与宽度" },
      { value: "约 29.5 公顷", label: "岛屿面积" },
      { value: "约 2.9 公里", label: "海岸线" },
    ],
    source: "尺寸根据 OpenStreetMap 中的岛屿轮廓计算，尚需实地测绘核实。", sourcesAria: "资料来源",
  },
  history: {
    kicker: "KINGDOM OF TONGA", title: "一个从未沦为殖民地的王国。",
    lead: "大洋洲唯一在整个历史中始终保有本国王室与主权的国家。",
    items: [
      { year: "约公元前 800 年", title: "最早的定居者", text: "拉皮塔文化的航海者乘双体独木舟抵达群岛。汤加是波利尼西亚最早有人定居的地区之一。" },
      { year: "10–13 世纪", title: "图伊汤加帝国", text: "汤加统治者的影响跨越海洋，远及萨摩亚和斐济。那个时代留下了哈蒙加阿毛伊三石塔。" },
      { year: "1777 年", title: "库克船长到访哈派", text: "库克在利富卡岛受到款待，该岛与塔塔法同属一个群岛。他把这片群岛称为“友谊群岛”。" },
      { year: "1789 年", title: "“邦蒂号”哗变", text: "航海史上最著名的哗变发生在哈派海域，托富阿火山附近。" },
      { year: "1875 年", title: "王国宪法", text: "国王乔治·图普一世颁布宪法。1900 至 1970 年间汤加受英国保护，但王室与自治权得以保留。" },
    ],
  },
  location: {
    kicker: "LOCATION", title: "它在哪里？",
    lead: "南太平洋，哈派群岛。毗邻斐济，距新西兰和澳大利亚仅数小时航程。",
    mapAria: "卫星地图：塔塔法与斐济、新西兰、澳大利亚的相对位置",
    ring1: "1,000 公里", ring2: "2,000 公里", capital: "努库阿洛法", credit: "卫星影像：NASA Blue Marble。距离为直线距离。",
    places: {
      fiji: { name: "斐济", dist: "苏瓦 · 约 780 公里", time: "约 780 公里 · 飞行约 1.5 小时", text: "邻国。本地区最昂贵的度假村 COMO Laucala 和 Kokomo 就在那里。" },
      nz: { name: "新西兰", dist: "奥克兰 · 约 2,160 公里", time: "约 2,160 公里 · 自奥克兰约 3 小时", text: "最近的大型客源市场，也是飞往汤加的主要航空枢纽。" },
      au: { name: "澳大利亚", dist: "悉尼 · 约 3,720 公里", time: "约 3,720 公里 · 自悉尼约 5 小时", text: "有直飞汤加塔布岛的航班，是本地区第二大客源市场。" },
    },
    local: { time: "约 160 公里 · 当地航班约 40 分钟", title: "努库阿洛法 → 哈派", text: "从首都飞抵群岛，再乘快艇前往塔塔法码头。" },
    cruise: {
      kicker: "CRUISE TRAFFIC", title: "邮轮航线已经经过汤加。", alt: "汤加群岛附近的邮轮",
      stats: [{ value: "30", label: "2025 年停靠汤加港口的国际邮轮艘次" }, { value: "11 月 — 3 月", label: "主要停靠季节" }],
      text: "2025 年，Cunard Queen Anne、Azamara 和 Oceania Riviera 首次停靠汤加。Silversea 和 Seabourn 航行至北部群岛。塔塔法码头按接待此类船只设计。",
    },
  },
  map: {
    kicker: "PROPOSED", title: "岛屿地图。", lead: "点选任一位置，查看该处及其建筑。地图下方可开启路线。",
    alt: "塔塔法岛交互式规划图", hint: "← 左右滑动地图 →", view: "查看项目", show: "显示", zoom: "区域放大图", visual: "效果图",
    indexAria: "区域列表", routesLabel: "路线",
    routesNote: "仅显示概念图中可辨识的路线。尚需单独布置方案的系统：跑道、能源、供水、废弃物处理、通信、服务通道。",
    routes: {
      arrival: { label: "Arrival", detail: "游艇码头与栈桥" },
      mobility: { label: "Internal mobility", detail: "陆上交通" },
      pedestrian: { label: "Pedestrian", detail: "别墅与步行轴线" },
    },
  },
  objects: {
    title: "地图上的建筑。", lead: "每个视角都对应总体规划中的一个区域。", tabsAria: "项目列表",
    prev: "上一个视角", next: "下一个视角", shotsAria: "该项目的视角", shot: "视角",
    shotsCount: (n) => `${n} 个视角`, includesAria: "包含内容", buildCredit: "图片：生产场地上的穹顶组装。",
    buildAlt: "现场组装中的玻璃网格穹顶", locationAlt: "所选项目在岛上的位置", shotAlt: "建筑效果图",
  },
  categories: { proposed: "PROPOSED", concept: "CONCEPT VISUALIZATION" },
  zones: {
    marina: { title: "游艇码头", subtitle: "乘游艇抵达", note: "可停靠邮轮、游艇和快艇的码头，是从海上登岛的主要入口。",
      stats: [{ value: "500–7,600", label: "每艘邮轮载客量" }, { value: "5", label: "艘游艇" }, { value: "6", label: "艘快艇" }] },
    air: { title: "水上飞机码头", subtitle: "空中抵达", note: "供空中抵达使用的独立码头：客运水上飞机和地效飞行器。",
      stats: [{ value: "19", label: "个水上飞机座位" }, { value: "2", label: "架地效飞行器" }] },
    coast: { title: "私人别墅", subtitle: "海岸线", note: "位于植被边缘的一线海景私人别墅，面向大海与日出。",
      stats: [{ value: "12", label: "栋私人别墅" }, { value: "Super lux", label: "等级" }] },
    domes: { title: "疗愈中心", subtitle: "南部潟湖", note: "建在水上玻璃网格穹顶中的疗愈中心。两条步道由岸边通向各栋别墅。",
      stats: [{ value: "64", label: "栋穹顶别墅" }, { value: "2", label: "条步道" }],
      build: { kicker: "FIRST TO BE BUILT", title: "成品穹顶，快速安装。", text: "疗愈中心由成品玻璃网格穹顶组装而成。模块已经制造完成，以成套形式运抵岛上，因此安装耗时很短。这是岛上最先建成的部分。" } },
    medical: { title: "医疗中心", subtitle: "诊断与治疗", note: "玻璃穹顶下的高科技诊断与治疗中心。",
      includes: ["诊断", "量子医学", "现代口腔科"] },
    center: { title: "岛屿中心", subtitle: "中央综合体", note: "岛屿的行政管理中心，也是主要的公共空间。",
      includes: ["岛屿管理", "联合国与教科文组织代表处", "数字加密银行", "安保机构", "购物中心", "餐厅", "公共空间", "喷泉"] },
    north: { title: "北部别墅", subtitle: "北部潟湖", note: "位于北岬的豪华水上别墅，与东部组团共同构成一个整体。",
      stats: [{ value: "64", label: "栋豪华别墅，分两组" }, { value: "128 m²", label: "每栋面积" }, { value: "2 × 256 m²", label: "餐厅" }],
      includes: ["瑜伽中心", "水疗中心"] },
    east: { title: "东部别墅", subtitle: "东部礁区", note: "沿东部礁区排布的豪华水上别墅，与北部组团共同构成一个整体。",
      stats: [{ value: "64", label: "栋豪华别墅，分两组" }, { value: "128 m²", label: "每栋面积" }, { value: "2 × 256 m²", label: "餐厅" }],
      includes: ["瑜伽中心", "水疗中心"] },
    manta: { title: "蝠鲼平台", subtitle: "海上浮动平台", note: "外形如蝠鲼的水上娱乐综合体，以栈桥与岸边相连。",
      includes: ["餐厅", "演出场地", "夜店", "儿童游乐设施", "海水泳池", "按摩池", "水疗中心", "赌场"] },
  },
  privileges: {
    kicker: "PRIVILEGES", title: "岛屿的优势。", lead: "项目已经具备的条件，以及当地法域本身提供的条件。",
    note: "税收与关税优惠是指在符合条件时参与现行机制的权利。项目不声称已获得任何现成的豁免。",
    items: [
      { tag: "已落实", title: "长期土地权利", text: "土地使用权已由现行备忘录确立。汤加土地不出售给外国人，因此租赁是这里最高形式的土地权利。" },
      { tag: "市场", title: "空白的高端市场", text: "哈派群岛没有一家五星级度假村。最近的超豪华度假村 COMO Laucala 位于斐济，约 650 公里之外。" },
      { tag: "政府", title: "Invest in Tonga 全程协助", text: "该政府机构负责投资登记、实地考察以及与王国各主管部门的联络。" },
      { tag: "法律", title: "清晰的法律框架", text: "《2020 年外国投资法》及 2021 年实施条例规定了外国投资者进入和经营的程序。" },
      { tag: "贸易", title: "PACER Plus", text: "与澳大利亚和新西兰的协定：汤加商品免关税进入两国市场，投资者权益受到保护。" },
      { tag: "居留", title: "在王国居住的权利", text: "外国投资者商务签证允许在项目运营期间居住于汤加。" },
    ],
  },
  why: {
    kicker: "WHY NOW", title: "为什么是现在？", lead: "本地区几乎没有高端住宿。六个因素打开了进入的窗口。",
    items: [
      { title: "早期市场", text: "在市场饱和之前进入。高端领域的竞争者尚未进入哈派。" },
      { title: "产品稀缺", text: "南太平洋独具特色的住宿项目很少，需求增长快于供给。" },
      { title: "邮轮客流增长", text: "2025 年有 30 艘次国际邮轮停靠汤加，其中数条航线为首次到访。" },
      { title: "两个高消费市场近在咫尺", text: "新西兰航程三小时，澳大利亚五小时，斐济一个半小时。" },
      { title: "模块化建造", text: "穹顶和别墅以工厂成品形式运抵。无需在偏远岛屿上长期施工，预算可控。" },
      { title: "自给自足", text: "海水淡化、供电和排污系统均设在岛上，不依赖陆上管网。" },
    ],
  },
  investor: {
    kicker: "TERMS", title: "投资者能得到什么？", lead: "条件按法律状态分类。凡尚未落实的内容，均列为谈判事项。",
    groups: [
      { status: "已落实", items: ["依据现行备忘录享有长期土地使用权", "优先选择区域和首期项目"] },
      { status: "由政府提供", items: ["Invest in Tonga 全程协助", "投资登记", "实地考察及与主管部门的联络"] },
      { status: "谈判事项", items: ["参与份额与结构", "别墅和区域的命名权", "个人居住条件", "首位投资者的优惠范围"] },
    ],
  },
  economics: {
    kicker: "ECONOMICS", title: "邻近岛屿赚多少，我们能赚多少？",
    lead: "度假村不公布营收。以下数字根据公开房价和别墅数量测算，入住率与平均房价为假设值。",
    badge: "估算",
    neighboursTitle: "本地区最昂贵的度假村（斐济）",
    labels: { keys: "客房数量", rate: "每晚价格", assumed: "测算假设", revenue: "年营收" },
    neighbours: [
      { name: "COMO Laucala", place: "斐济 · 距塔塔法约 650 公里", keys: "25 栋别墅", rate: "5,600–14,300 美元", assumed: "每晚 7,000 美元，入住率 40%", revenue: "约 2600 万美元", range: "区间 1600–3700 万美元" },
      { name: "Kokomo Private Island", place: "斐济", keys: "21 栋别墅和 5 栋府邸", rate: "2,000–3,600 美元起；整岛 65,000–100,000 美元", assumed: "别墅 3,000 美元、入住率 55%；府邸 10,000 美元、入住率 40%", revenue: "约 2000 万美元", range: "区间 1300–2700 万美元" },
    ],
    oursTitle: "塔塔法的潜力：140 间客房",
    oursLead: "64 栋穹顶、64 栋水上别墅和 12 栋私人别墅，是任一邻近度假村的 5.5 倍，因此房价按低于斐济、相当于马尔代夫优质度假村的水平取值。",
    scLabels: { rates: "穹顶 / 别墅 / 私人别墅", occupancy: "入住率", rooms: "客房收入", total: "年营收", profit: "经营利润", payback: "7950 万美元回收期" },
    scenarios: [
      { name: "保守", rates: "600 / 900 / 2,500 美元", occupancy: "40%", rooms: "1840 万美元", total: "约 2500 万美元", profit: "约 500 万美元", payback: "约 16 年" },
      { name: "基准", rates: "900 / 1,400 / 4,000 美元", occupancy: "55%", rooms: "3920 万美元", total: "约 5500 万美元", profit: "约 1600 万美元", payback: "约 5 年" },
      { name: "乐观", rates: "1,200 / 2,000 / 6,000 美元", occupancy: "65%", rooms: "6570 万美元", total: "约 9500 万美元", profit: "约 3300 万美元", payback: "约 2.5 年" },
    ],
    cruise: "年营收包含餐厅、水疗、医疗中心和蝠鲼平台，约为客房收入的 35–45%。邮轮停靠另可带来约 180 万美元。回收期自达到计划入住率起算，达到该水平本身需要 2–3 年。",
    risksTitle: "需要了解的事项",
    risks: [
      "2024 年汤加全国接待游客 62,900 人次，旅游收入 1.05 亿美元。基准情景意味着每年约 11,000 位客人：岛屿必须自行创造客流，包括直达交通。",
      "邻近度假村的入住率、府邸房价、附加服务占比以及 20–35% 的利润率均为假设，并非财报数据。",
    ],
    sourcesTitle: "资料来源",
    chartTitle: "年营收（百万美元）", chartUnit: "", source: "来源", tatafa: "塔塔法",
  },
  offer: {
    kicker: "合作提案", title: "一个新的目的地只会诞生一次。",
    text: "在南太平洋市场尚未成形、优质地块尚未被占据之时，首位投资者的条件优于项目启动后进入的所有人。",
    raiseValue: "7950 万美元", raiseLabel: "拟募集投资额", button: "洽谈进入条件",
  },
  footer: {
    tagline: "私人岛屿总体规划", region: "汤加王国，哈派群岛", coords: "南纬 19°52′31″，西经 174°25′12″",
    sectionsTitle: "栏目", links: ["岛屿的现状与未来", "汤加王国", "位置", "岛屿地图", "项目", "优势", "投资者"],
    contactsTitle: "联系方式", contact: "chairman@harmony-hub.group", maps: "在 Google 地图上查看岛屿", wiki: "Wikipedia",
    legal: "本网站所有图像均为概念效果图。建筑与工程文件正在审核中，项目参数与分期仍在确定。",
    top: "返回顶部 ↑", brandAria: "Tatafa，返回顶部", sectionsAria: "栏目",
  },
};

export const content: Record<Lang, Content> = { ru, en, zh };
