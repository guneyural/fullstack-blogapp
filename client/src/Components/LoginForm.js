import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/authActions';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    loginUser = e => {
        e.preventDefault();

        this.props.loginUser(this.state.email, this.state.password)
    }

    render() {
        const { user } = this.props;
        if(user.isAuthenticated) {
            window.location.href = "http://localhost:3000/";
        }

        return (
            <div class="container" style={{ marginTop: '90px' }}>
                <h1 class="text-center">Login BlogBoy</h1>
                <form onSubmit={this.loginUser}>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" onChange={this.handleChange} value={this.state.email} class="form-control" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary w-100" disabled={this.state.email==='' || this.state.password === '' ? true : false} ><b>Login</b></button>
                </form>
                <p class="mt-5 text-center">If you don't have an account<Link to='/register' style={{ textDecoration: 'none' }}> click here</Link> to create account.</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps, { loginUser })(LoginForm);