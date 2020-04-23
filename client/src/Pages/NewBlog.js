import React, { Component } from 'react'
import AddBlog from '../Components/AddBlog';
import { connect } from 'react-redux';

class NewBlog extends Component {
    componentDidMount() {
        const { user } = this.props;
        if(!user.isAuthenticated) {
            window.location.href = window.location.origin;
        }
    }

    render() {
        return (
            <div>
                <AddBlog />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(NewBlog);