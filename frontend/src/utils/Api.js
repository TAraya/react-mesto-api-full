export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._defaultHeaders = options.headers;
  }

  getUser() {
    return fetch(
      this._baseUrl + '/users/me',
      this._getRequestOptions())
      .then(this._readResponseContent);
  }

  updateUser(data) {
    return fetch(
      this._baseUrl + '/users/me',
      this._getRequestOptions('PATCH', data))
      .then(this._readResponseContent);
  }

  updateAvatar(data) {
    return fetch(
      this._baseUrl + '/users/me/avatar',
      this._getRequestOptions('PATCH', data))
      .then(this._readResponseContent);
  }

  getCards() {
    return fetch(
      this._baseUrl + '/cards',
      this._getRequestOptions())
      .then(this._readResponseContent);
  }

  createCard(data) {
    return fetch(
      this._baseUrl + '/cards',
      this._getRequestOptions('POST', data))
      .then(this._readResponseContent);
  }

  removeCard(id) {
    return fetch(
      this._baseUrl + '/cards/' + id,
      this._getRequestOptions('DELETE'))
      .then(this._ensureSuccess);
  }

  likeCard(id) {
    return fetch(
      this._baseUrl + '/cards/likes/' + id,
      this._getRequestOptions('PUT'))
      .then(this._readResponseContent);
  }

  unlikeCard(id) {
    return fetch(
      this._baseUrl + '/cards/likes/' + id,
      this._getRequestOptions('DELETE'))
      .then(this._readResponseContent);
  }

  _getRequestOptions(method, data) {
    const options = {
      headers: { ...this._defaultHeaders }
    };

    if (method) {
      options.method = method;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    return options;
  }

  _readResponseContent(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject('Ошибка: ' + response.status);
  }

  _ensureSuccess(response) {
    if (response.ok) {
      return response;
    }

    return Promise.reject('Ошибка: ' + response.status);
  }
}