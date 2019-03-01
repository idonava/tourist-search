import mockFlickrPhotosSearch from '../reducers/__mocks__/flickr.photos.search.json';
const { photos, stat } = mockFlickrPhotosSearch;

const state = {
  search: {
    isLoading: false,
    photos,
    stat,
    text: 'cats',
    pageSelected: 5,
  },
  detail: {
    id: '45414777002',
  },
};

export default state;
