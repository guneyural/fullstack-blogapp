import React, { Component } from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/authActions';
import Sennaber from './sennaber';
import Sennaber2 from './sennaber2';
import Login from './login';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    
    render() {
        return (
            <Provider store={store}>
                <h1 style={{fontFamily: 'Helvetica'}}>GUNEYHONOT WEB APP</h1>
                <Login />
                <Sennaber />
                <Sennaber2 />
            </Provider>
        );
    }
}

export default App;