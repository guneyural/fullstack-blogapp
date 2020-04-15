import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from './redux/actions/authActions'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.loginUser(this.state.email, this.state.password);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { auth } = this.props;
        if(auth.user) console.log(auth.user.username);

        return (
            <div>
                {auth.user ? 
                <div className="user-section">
                    <h3>Current User: {auth.user.username}</h3>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
                : 
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email"
                    />
                    <input 
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    />
                    <button>Login</button>
                </form>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { loginUser, logoutUser })(Login);