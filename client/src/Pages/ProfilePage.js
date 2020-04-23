import React, { Component } from 'react'
import Profile from '../Components/ProfilePage';

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <Profile
                userId={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default ProfilePage;