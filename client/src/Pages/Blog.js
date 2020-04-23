import React, { Component } from 'react';
import SingleBlog from '../Components/SingleBlog';

class Blog extends Component {
    render() {
        return (
            <div style={{ marginTop: '100px', marginBottom: '130px' }}>
                <SingleBlog
                blogId={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default Blog;