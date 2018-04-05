import axios from 'axios'
import jwtDecode from 'jwt-decode'

const httpClient = axios.create()

httpClient.getToken = function() {
    return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
    localStorage.setItem('token', token)
    return token
}

httpClient.getCurrentUser = function() {
    const token = this.getToken()
    if(token) return jwtDecode(token)
    return null
}

httpClient.login = function(fields) {
    return this({ method: 'post', url: '/api/users/login', data: fields })
    .then((serverResponse) => {
            const { token } = serverResponse.data
            if(token) {
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else {
                return false
            }
        })
}

httpClient.signup = function(userInfo) {
    return this({ method: 'post', url: '/api/users', data: userInfo })
    .then((serverResponse) => {
            const { token } = serverResponse.data
            if(token) {
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else {
                return false
            }
        })
}

httpClient.logOut = function() {
    // clear token
    localStorage.removeItem('token')
    // tell axios to stop using the token in requests
    delete this.defaults.headers.common.token
    return true
}

httpClient.defaults.headers.common.token = httpClient.getToken()

export default httpClient