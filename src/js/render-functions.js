// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryImage = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.js-loadMore');

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
  
        <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-img" src="${webformatURL}" alt="${tags}"/>
        </a>

       
        <ul class="gallery-socials-list">
            <li class="gallery-social-item"><span>Likes</span> ${likes} </li>
            <li class="gallery-social-item"> <span>Views</span> ${views} </li>
            <li class="gallery-social-item"><span>Comments</span> ${comments} </li>
            <li class="gallery-social-item"><span>Downloads</span> ${downloads} </li>
        </ul>
      </li>`
    )
    .join('');

  galleryImage.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

export function clearGallery() {
  galleryImage.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('loader');
}

export function hideLoader() {
  loader.classList.remove('loader');
}

export function showLoadMoreButton() {
  loadMore.classList.add('loadMore');
}

export function hideLoadMoreButton() {
  loadMore.classList.remove('loadMore');
}
