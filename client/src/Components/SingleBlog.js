import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadBlog, addComment, editComment, deleteComment, deleteBlog } from '../redux/actions/blogActions';
import Loading from '../Images/Loading.gif';
import EditBlog from './EditBlog';

class SingleBlog extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            editText: '',
            clickCount: 0,
            editBlogClickCount: 0
        }
    }

    componentDidMount() {
        this.props.loadBlog(this.props.blogId);
    }

    addComment = (e) => {
        e.preventDefault();
        this.props.addComment(this.state.text, this.props.blogId);
        this.setState({
            ['text'] : ''
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDelete = commentId => {
        this.props.deleteComment(commentId);
    }

    editCommentClicked = () => {
        const count = this.state.clickCount;
        this.setState({
            ['clickCount']: count + 1
        });
    }

    handleEdit = id => {
        this.props.editComment(this.state.editText, id);
        this.setState({
            ['editText']: ''
        });
        this.editCommentClicked();
    }

    editBlogClicked = () => {
        const count = this.state.editBlogClickCount;
        this.setState({
            ['editBlogClickCount']: count + 1
        });
    }

    deleteBlog = id => {
        this.props.deleteBlog(id);
        setTimeout(()=> {
            window.location.replace(window.location.origin);
        },100);
    }

    render() {
        const { auth, blog } = this.props;
       
        let blogData, comments;
        let isUser = auth.user;

        if(typeof blog.blog.blog !== "undefined") {
            blogData = blog.blog.blog;
            comments = blog.blog.comments;
        }

        return (
            <div class="container" style={{ overflow: 'hidden' }}>
                { blog.isLoading ? 
                    <img src={Loading} alt="Loading..." width="100px" />
                :
                   typeof blogData === "object" && typeof isUser === "object" ?
                    <div>
                        <div class="author">
                            <span><img src={blogData.ownerId.profileImage} alt="profile" class="profileImg" /><strong className="ml-2">{blogData.ownerId.firstName + " " + blogData.ownerId.lastName}</strong><span className="text-muted ml-2">@{blogData.ownerId.username}</span><span className="text-muted blog-date-data">{blogData.date.substring(0, 10)}</span></span>
                        </div>
                        <h1 className="text-center mt-3" id="blogName">{blogData.title}</h1>
                        <div class="w-100 text-center">
                            <img className="img-fluid blog-image" src={blogData.image} alt="blog" />    
                        </div>
                        <p class="lead" style={{color: "#42b52d", fontWeight: 'bold' }}>{blogData.category}</p>
                        <p class="blog-content">{blogData.text}</p>
                        { isUser && isUser._id === blogData.ownerId._id ? <div>
                            <span class="text-primary" type="button" onClick={this.editBlogClicked}><strong class="lead">Edit</strong></span>
                            <span class="text-danger ml-3" onClick={this.deleteBlog.bind(this, blogData._id)} type="button"><strong class="lead">Delete</strong></span>
                            { this.state.editBlogClickCount % 2 === 0 ? '' :
                                <div>
                                    <EditBlog 
                                    title={blogData.title}
                                    image={blogData.image}
                                    category={blogData.category}
                                    text={blogData.text}
                                    blogId={blogData._id}
                                    itemClicked={this.editBlogClicked}
                                    blogEdited={this.blogEdited}
                                    />
                                </div>
                            }
                            </div> 
                            : 
                            '' }
                        <hr />
                        <p class="mt-5" style={{fontWeight: 'bold', fontSize: '24px'}}>{comments.length > 0 ? (comments.length+" "+'Comments') : 'No Comment'}</p>
                        <div id="comment-section">
                            <form onSubmit={this.addComment}>
                                <div class="form-group">
                                    <textarea disabled={isUser ? false : true} class="form-control" onChange={this.handleChange} value={this.state.text} name="text" placeholder={isUser ? `Add Comment as ${isUser.firstName} ${isUser.lastName} @${isUser.username}` : 'Login To Add Comment'} />
                                    <button class="btn btn-outline-primary w-100 mt-2" disabled={this.state.text.length > 0 ? false : true}>Add Comment</button>    
                                </div>
                            </form>
                            { comments.length > 0 ? 
                                comments.map(item=>{
                                    return (
                                        <div className="mt-4" key={item._id}>
                                            <div class="author">
                                            <span><img src={item.ownerId.profileImage} alt="profile" class="profileImg" /><strong className="ml-2">{item.ownerId.firstName + " " + item.ownerId.lastName}</strong><span className="text-muted ml-2">@{item.ownerId.username}</span><span className="text-muted blog-date-data">{item.date.substring(0, 10)}</span></span>
                                            </div>
                                            <div class="container">
                                                <p>{item.body}</p>
                                                {isUser && isUser._id === item.ownerId._id ? 
                                                    <div>
                                                        <span class="text-muted" type="button" onClick={this.editCommentClicked}>Edit</span>
                                                        <span class="text-danger ml-2" type="button" onClick={this.handleDelete.bind(this, item._id)}>Delete</span>
                                                        { this.state.clickCount % 2 === 0 ? '' :
                                                        <div>
                                                            <textarea disabled={isUser ? false : true} class="form-control" onChange={this.handleChange} value={this.state.editText} name="editText" placeholder={isUser ? `Edit Your Comment` : 'Login To Edit Comment'} />
                                                            <span class="text-primary" type="button" onClick={this.handleEdit.bind(this, item._id)}>Apply</span>
                                                        </div> 
                                                        }
                                                    </div>
                                                :
                                                  ''}
                                            </div>
                                        </div>
                                    )
                                })
                            :
                            ''}
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        blog: state.blog
    }
}

export default connect(mapStateToProps, { loadBlog, addComment, deleteComment, editComment, deleteBlog })(SingleBlog);