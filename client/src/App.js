import React, { Component } from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import Sidebar from './Components/sidebar';
import { Switch, Route } from 'react-router-dom';
import './app.css';
import { loadUser } from './redux/actions/authActions';
import Blogs from './Pages/Blogs';
import Error from './Pages/Error';
import Blog from './Pages/Blog';
import Topics from './Pages/BlogTopics';
import TopicPage from './Pages/TopicPage';
import AddBlogPage from './Pages/NewBlog';
import ProfilePage from './Pages/ProfilePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    
    render() {
        return (
            <Provider store={store}>
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Blogs} />
                    <Route exact path="/blog/:id" component={Blog} />
                    <Route exact path="/topics" component={Topics} />
                    <Route exact path="/topics/:name" component={TopicPage} />
                    <Route exact path="/add-blog" component={AddBlogPage} />
                    <Route exact path="/profile/:id" component={ProfilePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route component={Error} />
                </Switch>
            </Provider>
        );
    }
}

export default App;