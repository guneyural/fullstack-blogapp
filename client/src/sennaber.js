import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadBlogs, addBlog, editBlog, deleteBlog, loadBlogsByCategory } from './redux/actions/blogActions';

class Sennaber extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            text: '',
            image: '',
            category: ''
        };
    }

    componentDidMount() {
        this.props.loadBlogs();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.image,
            category: this.state.category
        };

        this.props.addBlog(body);
    }  

    handleEditSubmit = (e) => {
        e.preventDefault();
    }

    handleEdit = (id) => {
        const body = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.image,
            category: this.state.category
        };

        this.props.editBlog(body, id);
    }

    handleDelete = (id) => {
        this.props.deleteBlog(id);
    }

    render() {
        const { blog, auth } = this.props;
        const blogs = blog.blogs.map(item=>{
            let statement, itemId = item._id;
            if(auth.user){
                statement = auth.user._id === item.ownerId._id;
            } 
            return <div key={item._id} className="blog">
                <div className="author-section">
                    <h1 className="author-name">{item.ownerId.username}</h1>
                </div>
                <div className="blog-section">
                    <img src={item.image} style={{maxHeight:"350px"}} alt={item.title} className="blog-image"/>
                    <h1 className="blog-title">{item.title}</h1>
                    <p className="blog-body">{item.text}</p>
                    <p style={{color: '#A9A9A9'}}>{item.category}</p>
                </div>
                { statement ?
                <div>
                    <form onSubmit={this.handleEditSubmit}>
                        <input 
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder="title"
                        />
                        <input 
                        type="text"
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="text"
                        />
                        <input 
                        type="text"
                        name="image"
                        value={this.state.image}
                        onChange={this.handleChange}
                        placeholder="image"
                        />
                        <input 
                        type="text"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                        placeholder="category"
                        />
                        <button onClick={this.handleEdit.bind(this, itemId)}>Apply Changes</button>
                    </form>
                    <button onClick={this.handleDelete.bind(this, itemId)}>Delete this blog</button>
                </div>
                :
                 ''}
                <hr />
            </div>
        });

        return (
            <div>
                { blog.isLoading ? 'Loading...' : blogs }
                { auth.isAuthenticated ? 
                <div>
                    <h1>Add Blog Post</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder="Title"
                        />
                        <input 
                        type="text"
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="Text"
                        />
                        <input 
                        type="text"
                        name="image"
                        value={this.state.image}
                        onChange={this.handleChange}
                        placeholder="Image"
                        />
                        <input 
                        type="text"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                        placeholder="Category"
                        />
                        <button>Add Post</button>
                    </form>
                </div>
                :
                'Login to add blog post' }
                <hr />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        blog: state.blog,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { loadBlogs, addBlog, editBlog, deleteBlog, loadBlogsByCategory })(Sennaber);