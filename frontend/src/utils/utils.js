import Api from '../utils/Api.js';
 
export const api = new Api({
  baseUrl: 'api.mesto1520.students.nomoreparties.xyz',
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