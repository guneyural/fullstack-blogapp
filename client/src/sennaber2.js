import React, { Component } from 'react';
import { loadBlog, addComment, editComment, deleteComment } from './redux/actions/blogActions';
import { connect } from 'react-redux';

class Sennaber extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }
    }

    componentDidMount() {
        this.props.loadBlog("5e97048e3b6e3110556fe7b0");
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = e => {
        e.preventDefault();
    }

    addComment = (id) => {
        this.props.addComment(this.state.text, id);
    }

    editComment = (commentId) => {
        this.props.editComment(this.state.text, commentId);
    }

    handleDelete = commentId => {
        this.props.deleteComment(commentId);
    }

    render() {
        const { blog } = this.props.blog;
        const { auth } = this.props;
        const { comments } = blog;

        const getBlog = blog.blog;
        const isUser = auth.user;

        return (
            <div>
                { getBlog ? 
                <div className="blog">
                    <div className="blog-section">
                        <img src={getBlog.image} alt={getBlog.title}/>
                        <h1>{getBlog.title}</h1>
                        <p>{getBlog.text}</p>
                        <p>{getBlog.category}</p>
                    </div>
                    <div className="comment-section">
                        { isUser ? 
                        <form onSubmit={this.handleSubmit}>
                            <input 
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            name="text"
                            placeholder="Your Comment"
                            />
                            <button onClick={this.addComment.bind(this, getBlog._id)}>Add Comment</button>
                        </form>
                        :
                        'Login to add Comment'}
                        { comments ? 
                        comments.map(item=>{
                            return(
                                <div key={item._id ? item._id : Math.random()}>
                                    <h1>{item.ownerId.username}</h1>
                                    <p>{item.body}</p>
                                    { auth.isAuthenticated && (item.ownerId._id === isUser._id) ? 
                                    <div>
                                        <form onSubmit={this.handleSubmit}>
                                            <input 
                                            type="text"
                                            value={this.state.text}
                                            name="text"
                                            onChange={this.handleChange}
                                            placeholder="Comment's text"
                                            />
                                            <button onClick={this.editComment.bind(this, item._id)}>Edit comment</button>
                                        </form>
                                        <button onClick={this.handleDelete.bind(this, item._id)}>Delete Comment</button>
                                    </div>
                                    :
                                    '' }
                                </div>)
                        }) 
                        : 
                        'Loading...'}
                    </div>
                </div> 
                :
                 'Loading...' }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        blog: state.blog,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { loadBlog, addComment, editComment, deleteComment })(Sennaber);