// Базовый класс Block
class Block {
    constructor(content) {
        this._content = content;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    getHTML() {
        return `<div>${this._content}</div>`;
    }
}

// Класс для секции приветствия
class WelcomeBlock extends Block {
    getHTML() {
        if (isEditMode) {
            return `
                <section id="welcome">
                    <input value="${this._content.title}" id="welcome-title-input">
                    <input type="url" value="${this._content.image}" id="welcome-image-input">
                    <button id="welcome-next-btn">Далее</button>
                </section>
            `;
        }
        return `
            <section id="welcome">
                <h1>${this._content.title}</h1>
                <img src="${this._content.image}" alt="Трэвис Скотт">
                <button id="welcome-next-btn">Далее</button>
            </section>
        `;
    }
}

// Класс для секции биографии
class BiographyBlock extends Block {
    getHTML() {
        if (isEditMode) {
            return `
                <section id="biography">
                    <h2>Биография</h2>
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            ${this._content.images.map((img, index) => `
                                <div class="swiper-slide">
                                    <input type="url" value="${img.src}" id="bio-image-${index}">
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                    <textarea id="bio-text">${this._content.text}</textarea>
                    <button id="bio-next-btn">Далее</button>
                </section>
            `;
        }
        return `
            <section id="biography">
                <h2>Биография</h2>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        ${this._content.images.map(img => `
                            <div class="swiper-slide">
                                <img src="${img.src}" alt="${img.alt}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
                <p>${this._content.text}</p>
                <button id="bio-next-btn">Далее</button>
            </section>
        `;
    }
}

// Класс для секции дискографии
class DiscographyBlock extends Block {
    getHTML() {
        if (isEditMode) {
            return `
                <section id="discography">
                    <h2>Дискография</h2>
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            ${this._content.albums.map((album, index) => `
                                <div class="swiper-slide">
                                    <input value="${album.title}" id="album-title-${index}">
                                    <input type="url" value="${album.cover}" id="album-cover-${index}">
                                    <textarea id="album-desc-${index}">${album.description}</textarea>
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </section>
                <section id="album-details">
                    <input id="album-title-detail" value="">
                    <input id="album-cover-detail" type="url" value="">
                    <textarea id="album-desc-detail"></textarea>
                    <ul id="tracklist"></ul>
                    <button id="album-back-btn">Назад</button>
                    <button id="album-home-btn">На главную</button>
                </section>
            `;
        }
        return `
            <section id="discography">
                <h2>Дискография</h2>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        ${this._content.albums.map((album, index) => `
                            <div class="swiper-slide" data-index="${index}">
                                <img src="${album.cover}" alt="${album.title}">
                                <p class="album-title">${album.title}</p>
                            </div>
                        `).join('')}
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </section>
            <section id="album-details">
                <h2 id="album-title-detail">Название альбома</h2>
                <img id="album-cover-detail" src="" alt="Обложка альбома">
                <p id="album-desc-detail">Описание...</p>
                <ul id="tracklist"></ul>
                <button id="album-back-btn">Назад</button>
                <button id="album-home-btn">На главную</button>
            </section>
        `;
    }
}

// Данные для блоков
const welcomeData = {
    title: "Добро пожаловать на сайт Travis Scott",
    image: "https://cdn1.ozone.ru/s3/multimedia-r/c600/6254338299.jpg"
};

const biographyData = {
    images: [
        { src: "https://i.ytimg.com/vi/kzRJ9238ImM/maxresdefault.jpg", alt: "Фото 1" },
        { src: "https://i.ytimg.com/vi/GD7UHUWI67o/maxresdefault.jpg", alt: "Фото 2" },
        { src: "https://i.ytimg.com/vi/FVbOE-bH_1Q/maxresdefault.jpg", alt: "Фото 3" },
        { src: "https://avatars.mds.yandex.net/i?id=0598df37fcf5aad32a955cccb6d493fa233c9212-8982347-images-thumbs&n=13", alt: "Фото 4" }
    ],
    text: "Трэвис Скотт (настоящее имя — Жак Берман Уэбстер II) — американский рэпер..."
};

const discographyData = {
    albums: [
        { title: "RODEO", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/30/98/ed/3098ed0e-537d-4230-d893-2e7218a3bdf1/196871381420.jpg/1319x1319bb-60.jpg", description: "Первый студийный альбом...", tracklist: ["Pornography", "Oh My Dis Side", "3500", "Antidote", "Maria I'm Drunk"] },
        { title: "BIRDS IN THE TRAP SING MCKNIGHT", cover: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/1631020122/100025871153b0.jpg", description: "Второй студийный альбом...", tracklist: ["the ends", "way back", "coordinate", "through the late night", "beibs in the trap", "goosebumps"] },
        { title: "HUNCHO JACK", cover: "https://www.shazam.com/mkimage/image/thumb/Music116/v4/8f/86/c8/8f86c8b6-3125-e4f1-b9c9-9d761815d176/artwork.jpg/1275x1275bb-60.webp", description: "Совместный альбом с Quavo...", tracklist: ["Modern Slang", "How U Feel", "Migo Luv", "Huncho Jack", "Pick Up the Phone"] },
        { title: "ASTROWORLD", cover: "https://avatars.mds.yandex.net/get-mpic/4367383/img_id6344045132113371062.jpeg/orig", description: "Третий студийный альбом...", tracklist: ["STARGAZING", "CAROUSEL", "SICKO MODE", "R.I.P. SCREW", "STOP TRYING TO BE GOD", "NO BYSTANDERS"] },
        { title: "JACKBOYS", cover: "https://avatars.mds.yandex.net/get-mpic/7150287/2a0000019373283fa749f210cb475de64d39/orig", description: "Проект, выпущенный в 2019 году...", tracklist: ["HIGHEST IN THE ROOM", "GATTI", "OUT WEST", "WHAT TO DO?"] },
        { title: "UTOPIA", cover: "https://cdn1.ozone.ru/s3/multimedia-c/6770063676.jpg", description: "Проект, выпущенный в 2019 году...", tracklist: ["HIGHEST IN THE ROOM", "GATTI", "OUT WEST", "WHAT TO DO?"] }
    ]
};

// Глобальные экземпляры блоков
const welcome = new WelcomeBlock(welcomeData);
const biography = new BiographyBlock(biographyData);
const discography = new DiscographyBlock(discographyData);

// Глобальная переменная для режима редактирования
let isEditMode = false;

// Функция переключения секций
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Функция отображения деталей альбома
function showAlbumDetails(index) {
    const album = discographyData.albums[index];
    if (isEditMode) {
        document.getElementById("album-title-detail").value = album.title;
        document.getElementById("album-cover-detail").value = album.cover;
        document.getElementById("album-desc-detail").value = album.description;
    } else {
        document.getElementById("album-title-detail").textContent = album.title;
        document.getElementById("album-cover-detail").src = album.cover;
        document.getElementById("album-desc-detail").textContent = album.description;
    }

    const tracklistElement = document.getElementById("tracklist");
    tracklistElement.innerHTML = "";
    album.tracklist.forEach(track => {
        const li = document.createElement("li");
        li.textContent = track;
        tracklistElement.appendChild(li);
    });

    showSection("album-details");
}

// Функции обновления данных
function updateWelcome() {
    const title = document.getElementById("welcome-title-input").value;
    const image = document.getElementById("welcome-image-input").value;
    welcome.content = { title, image };
    rebuildSite();
}

function updateBiography() {
    const text = document.getElementById("bio-text").value;
    const images = biography.content.images.map((img, index) => ({
        src: document.getElementById(`bio-image-${index}`).value,
        alt: img.alt
    }));
    biography.content = { images, text };
    rebuildSite();
}

function updateDiscography() {
    const albums = discography.content.albums.map((album, index) => ({
        title: document.getElementById(`album-title-${index}`).value,
        cover: document.getElementById(`album-cover-${index}`).value,
        description: document.getElementById(`album-desc-${index}`).value,
        tracklist: album.tracklist // Треклист пока не редактируется
    }));
    discography.content = { albums };
    rebuildSite();
}

// Функция переключения режима редактирования
function toggleEditMode() {
    isEditMode = !isEditMode;
    rebuildSite();
}

// Функция сборки сайта
function rebuildSite() {
    document.body.innerHTML = `
        <header>
            <button id="toggle-edit">${isEditMode ? 'Режим просмотра' : 'Режим редактирования'}</button>
        </header>
        <div id="app">
            ${welcome.getHTML()}
            ${biography.getHTML()}
            ${discography.getHTML()}
        </div>
    `;

    // Инициализация Swiper только в режиме просмотра
    if (!isEditMode) {
        document.querySelectorAll('.swiper-container').forEach(container => {
            new Swiper(container, {
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        });
    }

    // Привязка событий
    document.getElementById('toggle-edit').addEventListener('click', toggleEditMode);
    document.getElementById('welcome-next-btn')?.addEventListener('click', () => showSection('biography'));
    document.getElementById('bio-next-btn')?.addEventListener('click', () => showSection('discography'));
    document.getElementById('album-back-btn')?.addEventListener('click', () => showSection('discography'));
    document.getElementById('album-home-btn')?.addEventListener('click', () => showSection('welcome'));

    if (isEditMode) {
        document.getElementById('welcome-title-input')?.addEventListener('change', updateWelcome);
        document.getElementById('welcome-image-input')?.addEventListener('change', updateWelcome);
        document.getElementById('bio-text')?.addEventListener('change', updateBiography);
        biography.content.images.forEach((_, index) => {
            document.getElementById(`bio-image-${index}`)?.addEventListener('change', updateBiography);
        });
        discography.content.albums.forEach((_, index) => {
            document.getElementById(`album-title-${index}`)?.addEventListener('change', updateDiscography);
            document.getElementById(`album-cover-${index}`)?.addEventListener('change', updateDiscography);
            document.getElementById(`album-desc-${index}`)?.addEventListener('change', updateDiscography);
        });
    } else {
        document.querySelectorAll('.swiper-slide[data-index]').forEach(slide => {
            slide.addEventListener('click', () => showAlbumDetails(slide.dataset.index));
        });
    }

    showSection('welcome');
}

// Запуск сборки сайта
document.addEventListener("DOMContentLoaded", rebuildSite);