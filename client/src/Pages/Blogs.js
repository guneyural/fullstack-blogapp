import React, { Component } from 'react'
import BlogSection from '../Components/Blogs';

class Blogs extends Component {
    render() {
        return (
            <div style={{marginTop:'90px', marginBottom: '100px'}}>
                <div className="container">
                   <BlogSection />
                </div>
            </div>
        )
    }
}

export default Blogs;