class Api {
    constructor(array) {
        this.address = array.basUrl;
        this.token = array.headers.authorization;
        this.json = array.headers;
    }

    getCards() {
        return fetch(`${this.address}/cards`, {
            headers: {
                authorization: this.token
            }
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getUserInfo() {
        return fetch(`${this.address}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if(res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    editProfile(firstLastName, about) {
        return fetch(`${this.address}/users/me`, {
            method: 'PATCH',
            headers: this.json,
            body: JSON.stringify({
                name: firstLastName,
                about: about
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    addCard(name, link) {
        return fetch(`${this.address}/cards`, {
            method: 'POST',
            headers: this.json,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }
}
