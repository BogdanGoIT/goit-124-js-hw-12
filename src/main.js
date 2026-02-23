// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMore = document.querySelector('.js-loadMore');

hideLoader();

form.addEventListener('submit', handleSubmit);
loadMore.addEventListener('click', onLoadMore);

let page = 1;
let searchValue;

async function handleSubmit(evt) {
  evt.preventDefault();

  searchValue = evt.target.elements['search-text'].value.trim();

  if (!searchValue) {
    iziToast.warning({
      message: 'Пустий рядок',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchValue, (page = 1));

    if (data.hits.length > 0) {
      createGallery(data.hits);
      showLoadMoreButton();
      const totalPages = Math.ceil(data.totalHits / 15);
      if (page >= totalPages) {
        hideLoadMoreButton();
        return iziToast.info({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } else {
      iziToast.show({
        message: `Sorry, there are no images matching <br> your search "${searchValue}". Please try again!`,
        color: '#ef4040',
        position: 'topRight',
        messageColor: '#fafafb',
      });
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();

    evt.target.reset();
  }
}

async function onLoadMore(evt) {
  page++;
  loadMore.disabled = true;
  showLoader();
  hideLoadMoreButton();

  try {
    const res = await getImagesByQuery(searchValue, page);

    createGallery(res.hits);
    showLoadMoreButton();
    const totalPages = Math.ceil(res.totalHits / 15);

    if (page >= totalPages) {
      hideLoadMoreButton();
      return iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height * 2;

    window.scrollBy({
      top: cardHeight,
      left: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    loadMore.disabled = false;
    hideLoader();
  }
}
