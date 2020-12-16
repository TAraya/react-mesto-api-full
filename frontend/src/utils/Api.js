export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._defaultHeaders = options.headers;
  }

  signUp(data) {
    return fetch(
      this._baseUrl + '/signup',
      this._getRequestOptions('POST', data))
      .then(this._readResponseContent);
  }

  signIn(data) {
    return fetch(
      this._baseUrl + '/signin',
      this._getRequestOptions('POST', data))
      .then(this._readResponseContent);
  }

  getUser(token) {
    return fetch(
      this._baseUrl + '/users/me',
      this._getRequestOptions('GET', null, token))
      .then(this._readResponseContent);
  }

  updateUser(data, token) {
    return fetch(
      this._baseUrl + '/users/me',
      this._getRequestOptions('PATCH', data, token))
      .then(this._readResponseContent);
  }

  updateAvatar(data, token) {
    return fetch(
      this._baseUrl + '/users/me/avatar',
      this._getRequestOptions('PATCH', data, token))
      .then(this._readResponseContent);
  }

  getCards(token) {
    return fetch(
      this._baseUrl + '/cards',
      this._getRequestOptions('GET', null, token))
      .then(this._readResponseContent);
  }

  createCard(data, token) {
    return fetch(
      this._baseUrl + '/cards',
      this._getRequestOptions('POST', data, token))
      .then(this._readResponseContent);
  }

  removeCard(id, token) {
    return fetch(
      this._baseUrl + '/cards/' + id,
      this._getRequestOptions('DELETE', null, token))
      .then(this._ensureSuccess);
  }

  likeCard(id, token) {
    return fetch(
      this._baseUrl + '/cards/' + id + '/likes',
      this._getRequestOptions('PUT', null, token))
      .then(this._readResponseContent);
  }

  unlikeCard(id, token) {
    return fetch(
      this._baseUrl + '/cards/' + id + '/likes',
      this._getRequestOptions('DELETE', null, token))
      .then(this._readResponseContent);
  }

  _getRequestOptions(method, data, token) {
    const options = {
      headers: { ...this._defaultHeaders }
    };

    if (method) {
      options.method = method;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
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