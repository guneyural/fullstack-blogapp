import React, { Component } from 'react'
import Topics from '../Components/BlogTopics';

class BlogTopics extends Component {
    render() {
        return (
            <div style={{ marginTop:'90px', marginBottom: '110px' }}>
                <div class="container">
                    <Topics />
                </div>
            </div>
        )
    }
}

export default BlogTopics;