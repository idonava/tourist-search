import axios from "axios";

// const API_HOST = "https://carlos-rails-api.herokuapp.com";

// const getUrl = endpoint => API_HOST + endpoint;
const getUrl = endpoint =>  endpoint;

export const post = async (endpoint, data) => {
  const url =getUrl(endpoint);
  console.log('url',urls)
  return axios.post(url, data, {
    headers: { "Content-Type": "application/json" }
  });
};

export const get = async (endpoint, jwt) => {
  const headers = jwt
    ? {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    : null;
  return axios.get(getUrl(endpoint), headers);
};
