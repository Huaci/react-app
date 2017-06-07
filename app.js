import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import  App from './src/components/App'
const stores = { appStore }

useStrict(true)
ReactDOM.render(
    <Provider {...stores}>
        <Router basename="/">
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)/**
 * Created by dell on 2017/6/7.
 */
