export default class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._defaultHeaders = options.headers;
  }

  getCurrentUser(token) {
    return fetch(
      this._baseUrl + '/users/me',
      this._getRequestOptions('GET', null, token))
      .then(this._readResponseContent);
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
}