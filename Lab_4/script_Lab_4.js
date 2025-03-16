document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        document.getElementById("theme-toggle").classList.add("dark");
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark');
    this.classList.toggle('dark');
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function updateCarousel() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
}

const reviews = [
    { name: "Ксиоми ", text: "Есть над чем подумать. А так все круто", rating: 4 },
    { name: "Георгий ", text: "Лучший смартфон 2025 года!", rating: 5 },
    { name: "Стив Джобс ", text: "Раньше было лучше", rating: 2 }
];

document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('review-text').value.trim();
    const rating = parseInt(document.getElementById('rating').value);
    const imageFile = document.getElementById('review-image').files[0];

    if (!name || !text || !rating) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    let imageUrl = '';
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrl = e.target.result;

            reviews.push({ name, text, rating, imageUrl });

            document.getElementById('name').value = '';
            document.getElementById('review-text').value = '';
            document.getElementById('rating').value = '1';
            document.getElementById('review-image').value = '';

            renderReviews();
        };
        reader.readAsDataURL(imageFile);
    } else {
        reviews.push({ name, text, rating, imageUrl: '' });

        document.getElementById('name').value = '';
        document.getElementById('review-text').value = '';
        document.getElementById('rating').value = '1';
        document.getElementById('review-image').value = '';

        renderReviews();
    }
});

function renderReviews() {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';

    const ratingFilter = document.getElementById('rating-filter').value;
    const filteredReviews = reviews.filter(review => !ratingFilter || review.rating == ratingFilter);

    const sortOrder = document.getElementById('sort-order').value;
    filteredReviews.sort((a, b) => sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating);

    filteredReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.text}</p>
            <p>Оценка: ${'⭐'.repeat(review.rating)}</p>
            ${review.imageUrl ? `<img src="${review.imageUrl}" alt="Изображение отзыва" class="review-img">` : ''}
        `;
        reviewsList.appendChild(reviewElement);
    });
}

document.getElementById('rating-filter').addEventListener('change', renderReviews);
document.getElementById('sort-order').addEventListener('change', renderReviews);

renderReviews();


let countdownTime = 600;
const countdownElement = document.getElementById('countdown');

const countdownInterval = setInterval(() => {
    countdownTime--;
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    countdownElement.textContent = `Осталось: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}, 1000);