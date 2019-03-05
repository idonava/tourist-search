export const URL_FLICKR_API_BASE = 'https://api.flickr.com/services/rest/';
export const URL_FLICKR_METHOD_SEARCH = 'flickr.photos.search';
export const URL_FLICKR_API_KEY = 'e5ea944a19cdd19299af2b1305331532';
export const URL_FLICKR_FORMAT = 'json';
export const URL_FLICKR_NO_JSON_CALLBACK = '1';
export const URL_FLICKR_EXTRAS_AS_ARRAY = [
  'url_o',
  'url_l',
  'url_c',
  'url_z',
  'url_n',
  'url_m',
  'url_q',
  'owner_name',
];
export const URL_FLICKR_EXTRAS = URL_FLICKR_EXTRAS_AS_ARRAY.reduce(
  (extrasAsString, idExtra) => `${extrasAsString} ${idExtra},`,
  ''
).slice(0, -1);
