import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';
import { editBlog } from '../redux/actions/blogActions';
import Loading from '../Images/Loading.gif';

class EditBlog extends Component {
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
        this.setState({
            title: this.props.title,
            image: this.props.image,
            category: this.props.category,
            text: this.props.text,
            topic: this.props.category
        });
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

    editBlog = e => {
        const data = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.image,
            category: this.state.topic
        };

        this.props.editBlog(data, this.props.blogId);
        setTimeout(() => {
            window.location.replace(window.location.origin+"/"+this.props.blogId);
        }, 100);
    }
    

    render() {
        return (
            <div>
                <form>
                    <div class="form-group">
                        <label><strong>Title</strong></label>
                        <input type="text" class="form-control" name="title" defaultValue={this.state.title} onChange={this.onChange} />
                    </div>
                    <div class="form-group">
                        <label><strong>Image</strong></label>
                        <input type="text" class="form-control" defaultValue={this.state.image} name="image" onChange={this.onChange} />
                    </div>
                    <div class="form-group">
                        <label><strong>Text</strong></label>
                        <textarea rows="8" cols="40" type="text" class="form-control" defaultValue={this.state.text} name="text" onChange={this.onChange} />
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
                    <span type="submit" onClick={this.editBlog} class="text-primary text-center" style={{backgroundColor: '#dedede', padding: '10px', borderRadius: '10px', fontWeight: 'bold', width: '100%', marginTop: '30px'}}>Apply Changes</span>
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

export default connect(mapStateToProps, { getCategories, editBlog })(EditBlog);