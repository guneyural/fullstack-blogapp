import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadBlogs } from '../redux/actions/blogActions';
import { getCategories } from '../redux/actions/categoryActions';
import { Link } from 'react-router-dom';
import Loading from '../Images/Loading.gif';

class BlogTopics extends Component {
    componentDidMount() {
        this.props.getCategories();
        this.props.loadBlogs();
    }

    render() {
        const { blogs, category} = this.props;

        return (
            <div>
                <div class="rounded" style={{backgroundColor: '#f0f0f0', border: "1px solid white"}}>
                    { category.isLoading ? <img src={Loading} alt="Loading..." width="100px" /> :
                        category.categories.length > 0 ? 
                        category.categories.map((item, i)=>{
                            let count;
                            if(typeof blogs.blogs !== "undefined") {
                                const getCount = blogs.blogs.filter(blog=>{
                                    return blog.category === item
                                });
                                count = getCount.length;
                            }
                            return (
                                <Link to={`/topics/${item}`} style={{ textDecoration: 'none', color: '#262626' }}>
                                    <div key={i} class="topics" type="button">
                                        <h3>{item}</h3>
                                        <span class="text-muted">{count >= 1 ? `${count} Blogs` : 'No Blog'}</span>
                                    </div>
                                </Link>
                            )
                        })
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
        category: state.category,
        blogs: state.blog
    }
}

export default connect(mapStateToProps, { getCategories, loadBlogs })(BlogTopics);