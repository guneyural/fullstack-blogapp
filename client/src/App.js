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
                <div>
                    <h1>GÜNEY URAL</h1>
                </div>
            </Provider>
        );
    }
}

export default App;