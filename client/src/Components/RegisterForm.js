import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { registerUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            profileImage: ''
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    registerUser = e => {
        e.preventDefault();
        const { firstName, lastName, username, email, password, profileImage } = this.state;
        this.props.registerUser(firstName, lastName, username, email, password, profileImage);
    }

    render() {
        const { user } = this.props;
        if(user.isAuthenticated) {
            window.location.href = "http://localhost:3000/";
        }

        return (
            <div class="container" style={{ marginTop: '90px' }}>
                <h1 class="text-center">Register BlogBoy</h1>
                <form onSubmit={this.registerUser}>
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="First Name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="username" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Profile Image URL</label>
                        <input type="text" name="profileImage" onChange={this.handleChange} value={this.state.profileImage} placeholder="Profile Image URL" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" onChange={this.handleChange} value={this.state.email} class="form-control" placeholder="Email" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary w-100" disabled={this.state.email==='' || this.state.password === '' || this.state.firstName==='' || this.state.lastName === '' || this.state.username==='' || this.state.profileImage === '' ? true : false} ><b>Register</b></button>
                </form>
                <p class="mt-5 text-center">If you have an account<Link to='/login' style={{ textDecoration: 'none' }}> click here</Link> to login.</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps, { registerUser })(RegisterForm);