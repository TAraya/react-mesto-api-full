import Api from '../utils/Api.js';
import AuthApi from '../utils/AuthApi.js';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    'Authorization': '6f3bbfd8-b0bd-43f8-a169-3d0a9ccdcee8',
    'Content-Type': 'application/json'
  }
});

export const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export function findToken() {
  return localStorage.getItem('mesto-token');
}

export function storeToken(token) {
  localStorage.setItem('mesto-token', token);
}

export function removeToken() {
  localStorage.removeItem('mesto-token');
}