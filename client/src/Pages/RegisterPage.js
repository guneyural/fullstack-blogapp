import React, { Component } from 'react'
import { connect } from 'react-redux';
import RegisterForm from '../Components/RegisterForm';

class RegisterPage extends Component {
    componentDidMount() {
        const { user } = this.props;
        if(user.isAuthenticated) {
            window.location.href = "http://localhost:3000/";
        }
    }

    render() {
        return (
            <div>
                <RegisterForm />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(RegisterPage);