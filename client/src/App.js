import React, { Component } from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/authActions';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    
    render() {
        return (
            <Provider store={store}>
                <h1 style={{fontFamily: 'helvetica'}}>guneyhonot</h1>
            </Provider>
        );
    }
}

export default App;