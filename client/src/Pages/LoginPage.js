import React, { Component } from 'react'
import { connect } from 'react-redux';
import LoginForm from '../Components/LoginForm';

class LoginPage extends Component {
    componentDidMount() {
        const { user } = this.props;
        if(user.isAuthenticated) {
            window.location.href = "http://localhost:3000/";
        }
    }

    render() {
        return (
            <div>
                <LoginForm />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(LoginPage);