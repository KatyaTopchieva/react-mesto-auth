class Api {
    constructor({ baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }

    _checkResponse = (res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
  }
  
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
         .then(res => this._checkResponse(res))
    }

    getCard() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => this._checkResponse(res))
    }
    
    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
          })
        })
        .then(res => this._checkResponse(res))
    }
    
    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
          })
        })
        .then(res => this._checkResponse(res))
    }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers
         })
         .then(res => this._checkResponse(res))
    }

    deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headers
         })
         .then(res => this._checkResponse(res))
    }

    addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers
         })
         .then(res => this._checkResponse(res))
    }

    editAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
    })
       })
       .then(res => this._checkResponse(res))
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
      authorization: 'cf2785f2-540e-4e47-9cc1-44819bf11821',
      'Content-Type': 'application/json'
    }
  });