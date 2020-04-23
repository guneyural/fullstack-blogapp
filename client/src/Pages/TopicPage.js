import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadBlogsByCategory } from '../redux/actions/blogActions';
import { Link } from 'react-router-dom';
import Loading from '../Images/Loading.gif';

class TopicPage extends Component {
    componentDidMount() {
        this.props.loadBlogsByCategory(this.props.match.params.name);
    }

    render() {
        const { blogs } = this.props;
        let blogData;

        if(typeof blogs.blogs !== 'undefined') {
            blogData = blogs.blogs;
        }
        const topic = this.props.match.params.name;

        return (
            <div class="one-topic-page">
                <div class="container">
                    <div class="rounded p-3" style={{ background: '#efefef' }}>
                        <div class="container">
                            <h1>#{topic}</h1>
                            <p class="lead">{blogData.length > 0 ? `${blogData.length} Blogs` : 'No Blog'}</p>
                        </div>
                    </div>
                    { typeof blogData !== 'undefined' ?
                        blogs.isLoading ? <img src={Loading} width="100px" alt="loading..." className="text-center" /> :
                        blogData.length > 0 ? 
                        blogData.map(item=>{
                            return (
                                <div key={item._id} class="mt-5">
                                    <Link to={`/blog/${item._id}`} style={{textDecoration: 'none'}}>
                                        <div class="card blog-card" style={{marginBottom: '50px'}}>
                                        <div class="row">
                                            <div class="col-md-9 col-sm-12">
                                                <div class="author">
                                                    <span><img class="profileImg img-fluid" src={item.ownerId.profileImage} alt="author" /><strong className="pl-2">{item.ownerId.firstName + " " + item.ownerId.lastName}</strong><span className="text-muted pl-2">@{item.ownerId.username}</span><span className="text-muted blog-date-data">{item.date.substring(0, 10)}</span></span>
                                                </div>
                                                <div class="blog-meta">
                                                    <h1>{item.title}</h1>
                                                    <p>{item.text.substring(0, 120)}...</p>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-sm-12">
                                                <img className="img-fluid" src={item.image} style={{ borderRadius: '5px' }}/>
                                                <p style={{ float: 'right', paddingTop: '10px', color: "#42b52d", fontWeight: 'bold' }}>#{item.category}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                        : <h1>No Blog</h1>
                    :
                    ''
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        blogs: state.blog
    }
}

export default connect(mapStateToProps, { loadBlogsByCategory })(TopicPage);