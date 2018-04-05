import React from 'react'
import httpClient from '../httpClient'

class Login extends React.Component {

    state = {
        fields: { email: '', password: '' }
    }

    onChangeInput(evt) {
        this.setState({
            fields: {
                ...this.state.fields, 
                [evt.target.name]: evt.target.value
            }
        })
    }

    onFormSubmit(evt) {
        evt.preventDefault()
        console.log(this.state.fields)
        httpClient.login(this.state.fields).then((user) => {
            this.setState({ fields: { email: '', password: '' } })
            if(user) {
                this.props.onLoginSuccess(user)
                // redirect to vip route
                this.props.history.push('/vip')
            }
        })
    }

    render() {
        const { email, password } = this.state.fields
        return (
            <div className="Login">
                <h1>Log In</h1>
                <form onSubmit={this.onFormSubmit.bind(this)} onChange={this.onChangeInput.bind(this)}>
                    <input name="email" type="text" placeholder="Email" value={email} />
                    <input name="password" type="Password" placeholder="Password" value={password}/>
                    <button>Log In</button>
                </form>
            
            </div>
        )    
    }
}

export default Login