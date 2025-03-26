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
                <section id="welcome" class="active">
                    <input value="${this._content.title}" id="welcome-title-input">
                    <input type="url" value="${this._content.image}" id="welcome-image-input">
                    <button id="welcome-next-btn">Далее</button>
                </section>
            `;
        }
        return `
            <section id="welcome" class="active">
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
        { title: "ASTROWORLD", cover: "https://avatars.mds.yandex.net/get-mpic/4367383/img_id6344045132113371062.jpeg/orig", description: "Третий студийный альбом...", tracklist: ["STARGAZING", "CAROUSEL", "SICKO MODE", "R.I.P. SCREW", "STOP TRYING TO BE GOD"] }
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
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
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
        tracklist: album.tracklist
    }));
    discography.content = { albums };
    rebuildSite();
}

// Функция переключения режима редактирования
function toggleEditMode() {
    isEditMode = !isEditMode;
    rebuildSite();
}

// Показать заглушку загрузки
function showLoader(container) {
    container.innerHTML = '<p class="loader">Загрузка...</p>';
}

// API 1: Пользователи (JSONPlaceholder)
async function fetchUsers() {
    const container = document.getElementById('api1-content');
    showLoader(container);
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET' });
        const users = await response.json();
        container.innerHTML = users.slice(0, 3).map(user => `
            <div class="item">
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <button onclick="updateUser(${user.id})">Обновить</button>
                <button onclick="deleteUser(${user.id})">Удалить</button>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p>Ошибка загрузки данных</p>';
    }
}

async function updateUser(id) {
    const container = document.getElementById('api1-content');
    showLoader(container);
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Updated User' })
    });
    fetchUsers();
}

async function deleteUser(id) {
    const container = document.getElementById('api1-content');
    showLoader(container);
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: 'DELETE' });
    fetchUsers();
}

// API 2: Посты (JSONPlaceholder)
async function fetchPosts() {
    const container = document.getElementById('api2-content');
    showLoader(container);
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'GET' });
        const posts = await response.json();
        container.innerHTML = posts.slice(0, 3).map(post => `
            <div class="item">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button onclick="patchPost(${post.id})">Изменить</button>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p>Ошибка загрузки данных</p>';
    }
}

async function patchPost(id) {
    const container = document.getElementById('api2-content');
    showLoader(container);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: 'Updated content' })
    });
    fetchPosts();
}

// API 3: Новости (Reqres)
async function fetchNews() {
    const container = document.getElementById('api3-content');
    showLoader(container);
    try {
        const response = await fetch('https://reqres.in/api/users', { method: 'GET' });
        const data = await response.json();
        container.innerHTML = data.data.slice(0, 3).map(user => `
            <div class="item">
                <h3>${user.first_name} ${user.last_name}</h3>
                <p>Email: ${user.email}</p>
                <img src="${user.avatar}" alt="${user.first_name}">
                <button onclick="createNews()">Добавить</button>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p>Ошибка загрузки данных</p>';
    }
}

async function createNews() {
    const container = document.getElementById('api3-content');
    showLoader(container);
    await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: 'New', last_name: 'User' })
    });
    fetchNews();
}

// Функция сборки сайта
function rebuildSite() {
    document.getElementById('app').innerHTML = `
        ${welcome.getHTML()}
        ${biography.getHTML()}
        ${discography.getHTML()}
        <section id="api1">
            <h2>Пользователи</h2>
            <div id="api1-content" class="api-content"></div>
        </section>
        <section id="api2">
            <h2>Посты</h2>
            <div id="api2-content" class="api-content"></div>
        </section>
        <section id="api3">
            <h2>Новости</h2>
            <div id="api3-content" class="api-content"></div>
        </section>
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

    // Навигация через меню
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            showSection(section);
            if (section === 'api1') fetchUsers();
            if (section === 'api2') fetchPosts();
            if (section === 'api3') fetchNews();
        });
    });

    showSection('welcome');
}

// Запуск сборки сайта
document.addEventListener("DOMContentLoaded", rebuildSite);