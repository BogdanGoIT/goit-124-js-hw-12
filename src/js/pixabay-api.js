import axios from 'axios';

const API_KEY = '28315893-0fd806bb9dd4884845b8c425c';
const url = 'https://pixabay.com/api/';
const limit = 15;

export async function getImagesByQuery(query, page) {
  const res = await axios(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: limit,
    },
  });

  return res.data;
}
