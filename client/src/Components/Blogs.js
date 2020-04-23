import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadBlogs } from '../redux/actions/blogActions';
import { Link } from 'react-router-dom';
import Loading from '../Images/Loading.gif';

class Blogs extends Component {
    componentDidMount() {
        this.props.loadBlogs();
    }
    
    goHome = () => {
        this.props.loadBlogs();
    }

    render() {
        let renderedBlogs;
        const { blog } = this.props
        console.log(blog.blogs.msg);

        if(typeof blog.blogs.msg === "undefined"){
            renderedBlogs = blog.blogs.map((item)=>{
                return (
                    <div key={item._id}>
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
                                    <img className="img-fluid" src={item.image} style={{ borderRadius: '5px', maxHeight: '220px' }}/>
                                    <p style={{ float: 'right', paddingTop: '10px', color: "#42b52d", fontWeight: 'bold' }}>{item.category}</p>
                                </div>
                            </div>
                            </div>
                        </Link>
                    </div>
                )
            });
        }

        return (
            <div>
                { blog.isLoading ? <img src={Loading} width="100px" alt="loading..." className="text-center" /> : typeof blog.blogs.msg !== "undefined" ? <div class="text-center"><h1>No Blog Found</h1><Link to='/' style={{ textDecoration: 'none' }} onClick={this.goHome}>Click here to go home</Link></div> : renderedBlogs }
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

export default connect(mapStateToProps, { loadBlogs })(Blogs);