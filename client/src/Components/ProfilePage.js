import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBlogsByUser } from '../redux/actions/blogActions';
import { getUserById } from '../redux/actions/authActions';
import { Link } from 'react-router-dom';
import Loading from '../Images/Loading.gif';

class ProfilePage extends Component {
    componentDidMount() {
        this.props.getUserById(this.props.userId);
    }
    render() {
        
        const { user, error } = this.props;
        
        return (
            <div class="one-topic-page">
                <div class="container">
                    <div class="rounded p-3">
                            { error.msg ? <h1>{error.msg}</h1> : 
                            
                            <div class="row">
                                <div class="col-3 p-3">
                                    { user.loading ? <img src={Loading} width="100px" alt="loading..." className="text-center" /> : 
                                     (typeof user.visitedProfile !== "undefined") ? 
                                    <div>
                                        { (typeof user.visitedProfile.user !== "undefined") ? 
                                            <div>
                                                <img src={user.visitedProfile.user.profileImage} alt={`Profile image of ${user.visitedProfile.user.username}`} id="profileImage" />    
                                            </div>
                                        :
                                        ''}
                                    </div>
                                    :
                                    ''
                                    }
                                </div>
                                <div class="col-9 p-3">
                                    { typeof user.visitedProfile !== "undefined" ? 
                                    typeof user.visitedProfile.user !== "undefined" ? 
                                    <div>
                                        <div id="fullname" class="d-flex flex-column justify-content-between">
                                            <span>{user.visitedProfile.user.firstName + " " +user.visitedProfile.user.lastName}</span>
                                            <span class="text-muted" style={{fontSize: '20px' }}>@{user.visitedProfile.user.username}</span>
                                        </div>
                                        <div id="fullname" style={{fontSize: '22px'}} class="pt-2">
                                            <span><span style={{ fontWeight: 'bold' }}>{ typeof user.visitedProfile.blogs !== "undefined" ? user.visitedProfile.blogs.length : '' }</span> Blogs</span>
                                        </div>
                                    </div>
                                    :
                                    ''
                                    :
                                    ''}
                                </div>
                            </div>
                            
                            }
                    </div>
                    <hr />
                    <div>
                        { typeof user.visitedProfile !== "undefined" ? 
                            typeof user.visitedProfile.blogs !== "undefined" ? 
                            <div class="mt-4">
                                { user.visitedProfile.blogs.map(item=>{
                                    return (<div key={item._id}>
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
                                            </div>)
                                }) }
                            </div>
                            :
                            ''
                        :
                        ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth,
        error: state.error
    }
}

export default connect(mapStateToProps, { loadBlogsByUser, getUserById })(ProfilePage);