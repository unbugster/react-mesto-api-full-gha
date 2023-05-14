class Auth {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error in response: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  registration = (email, password) => {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };

  authorize = (email, password) => {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };

  checkToken = (token) => {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

export const auth = new Auth({
  url: "https://api.mesto.unbugster.nomoredomains.monster",
});