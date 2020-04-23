import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';
import { searchBlog, loadBlogs } from '../redux/actions/blogActions';

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            searchQuery: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    logout = () => {
        this.props.logoutUser();
    }

    search = e => {
        e.preventDefault();
        this.props.searchBlog(this.state.searchQuery);
    } 

    goHome = () => {
        this.props.loadBlogs();
    }

    render() {
        const { auth } = this.props;

        return (
            <div>
                <nav id="navbar-top" className="navbar ">
                    <div className="container">
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <div className="navbar-brand" onClick={this.goHome}>
                                <h1>BlogBoy</h1>
                            </div>
                        </Link>
                        <form className="form-inline my-lg-0 m-auto" onSubmit={this.search}>
                            <input id="search-bar" onChange={this.handleChange} name="searchQuery" value={this.state.searchQuery} className="form-control" type="search" placeholder="Search Blog" aria-label="Search" />
                        </form>
                    </div>
                </nav>

                <nav id="navbar-bottom" className="navbar bg-light">
                    <div className="container">
                            {auth.user ? 
                            <Link to={`/profile/${auth.user._id}`} style={{ textDecoration: 'none' }}>
                                <img data-toggle="tooltip" data-placement="top" title="Go To Your Profile" className="profileImg" src={auth.user.profileImage} alt="profile"/>
                            </Link>:
                            <Link to="/login" style={{textDecoration: 'none'}}>
                                <span className="nav-link">Login</span>
                            </Link> 
                            }
                        <Link to="/topics" style={{ textDecoration: 'none' }}>
                            <span className="nav-link">Topics</span>
                        </Link>
                        { auth.user ?
                            <Link to="/add-blog" style={{textDecoration: 'none'}}>
                                <span className="nav-link">Add Blog</span>
                            </Link>
                            :
                            <Link to="/register" style={{textDecoration: 'none'}}>
                                <span className="nav-link">Register</span>
                            </Link>
                        }
                        {auth.user ? 
                            <span type="button" onClick={this.logout} className="nav-link">Logout</span>
                            :
                            ''
                        }
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logoutUser, searchBlog, loadBlogs })(Sidebar);