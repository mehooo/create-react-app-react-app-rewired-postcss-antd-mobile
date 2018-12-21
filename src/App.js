import React, {Component} from 'react';
import {HashRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import {Provider} from 'mobx-react'
import store from './store/index.js'
import './App.css';
import Detail from './routes/detail/Detail.jsx';
import List from './routes/list/List.jsx';


class App extends Component {
    render() {
        return (
            <Provider {...store}>
                <div className="App">
                    <HashRouter>
                        <div>
                            <ul>
                                <li><NavLink to="/list" replace>主题列表</NavLink></li>
                                <li><Link to="/detail" replace>主题详情</Link></li>
                            </ul>
                            <Switch>
                                <Route path="/list" component={List}/>
                                <Route path="/detail" component={Detail}/>
                            </Switch>
                        </div>
                    </HashRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
