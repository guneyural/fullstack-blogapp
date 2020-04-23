import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../redux/actions/blogActions';
import { getCategories } from '../redux/actions/categoryActions';
import Loading from '../Images/Loading.gif';

class AddBlog extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            image: '',
            category: '',
            text: '',
            topic: ''
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    change = e => {
        this.setState({
            topic: e.target.value
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addBlog = e => {
        e.preventDefault();

        const data = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.image,
            category: this.state.topic
        };

        this.props.addBlog(data);
        setTimeout(() => {
            window.location.replace("http://localhost:3000/");
        }, 500);
    }

    render() {
        return (
            <div class="container add-blog-component">
                <div class="rounded p-3" style={{ background: '#efefef' }}>
                    <div class="container">
                        <h1>Post A Blog</h1>
                    </div>
                </div>

                <form class="bg-light mt-3 p-3" onSubmit={this.addBlog}>
                    <div class="form-group">
                        <label>Blog Title</label>
                        <input class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Blog Title" />
                    </div>
                    <div class="form-group">
                        <label>Blog Content</label>
                        <textarea wrap="hard" rows="15" class="form-control" name="text" value={this.state.text} onChange={this.onChange} placeholder="Blog Content"/>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input class="form-control" placeholder="Image URL" name="image" onChange={this.onChange} value={this.state.image} />
                        <small>Please enter image url because we couldn't improved us that much.</small>
                    </div>
                    <div class="form-group">
                    { this.props.topics.isLoading ? 
                        <img src={Loading} width="100px" alt="loading..." className="text-center" />
                        : 
                        <div>   
                            <label><strong>Topic</strong></label>
                            <p style={{color: "#42b52d", fontWeight: 'bold' }}>{this.state.topic}</p>
                            <div class="dropdown">
                                <select class="btn btn-default text-center" style={{ backgroundColor: '#dedede', border: '#dedede', width: '100%' }} onChange={this.change} value={this.state.topic}>
                                    { this.props.topics.categories.length > 0 ?
                                        this.props.topics.categories.map(item=>{
                                            return <option value={item}>{item}</option>
                                        })
                                    :
                                    ''
                                    }
                                </select>
                            </div>
                            </div>     
                        
                        }

                    </div>
                    <button type="submit" class="btn btn-outline-primary w-100" disabled={this.state.image === '' || this.state.text === '' || this.state.title === '' || this.state.topic === '' ? true : false}><strong>Create Blog</strong></button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        topics: state.category
    }
}

export default connect(mapStateToProps, { addBlog, getCategories })(AddBlog);