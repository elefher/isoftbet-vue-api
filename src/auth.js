/* globals localStorage */
import axios from 'axios'

export default {
    data () {
        return {
            authenticated: false,
            token: ''
        }
    },
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        axios.post("http://localhost:8000/api/login", {email: email, password: pass}, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            this.token = response.data.token;
            this.authenticated = true;
            cb({
                authenticated: true,
                token: response.data.token
            })
        })
    },

    register(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        axios.post("http://localhost:8000/api/register", {name: 'isoftbet', email: email, password: pass}, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        }).then(response => {
            this.token = response.data.token;
            this.authenticated = true;
            cb({
                authenticated: true,
                token: response.data.token
            })
        })
    },

    getToken() {
        return this.token
    },

    logout(cb) {
        delete localStorage.token
        if (cb) cb()
        this.onChange(false)
    },

    loggedIn() {
        return this.authenticated
    },

    onChange() {
    }
}