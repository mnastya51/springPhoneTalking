import React, {Component} from 'react'
import Form from './Form'
import {Router, Route, Switch} from 'react-router'
import {Link} from 'react-router-dom'
import {Menubar} from 'primereact/menubar'
import Books from './Books';
import Cart from './Cart';
import Order from './Order';
import createBrowserHistory from 'history/createBrowserHistory';
import axios from 'axios';
import Userik from './UserService';
import {Button} from 'primereact/button'
import {SplitButton} from 'primereact/splitbutton';


class Menu extends Component {
    history;

    constructor() {
        super()
        this.state = {
            auth: false,
            usek: '',
            drop: [
                {
                    label: 'Выйти',
                    icon: 'pi pi-sign-out',
                    command: (e) => {
                        fetch('http://localhost:8080/perform_logout').then(() => {
                            this.setState({auth: false})
                            this.history.push("/login");
                        })
                    }
                }
            ]
        };
        this.history = createBrowserHistory();
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/user').then(res => {
            if (res.data) {
                this.setState({auth: true, usek: `${res.data.name.trim()} ${res.data.surname.trim()}`})
                this.setState({})
            }
        })
    }

    updateData = (value) => {
        this.setState({auth: value})
    }

    render() {
        return (
            <Router history={this.history}>
                <div>
                    <nav class="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#252525'}}>
                        <a class="navbar-brand" tabIndex='0'>
                            <img style={{marginRight: '5px'}} class="d-inline-block align-top" width="30" height="30"
                                 src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0E0RjsiIGQ9Ik0yNTYuMDAxLDUxMkMzOTcsNTEyLDUxMiwzOTcsNTEyLDI1Ni4wMDFTMzk3LDAsMjU2LjAwMSwwQzExNSwwLDAsMTE1LjAwMiwwLDI1Ni4wMDEgIFMxMTUsNTEyLDI1Ni4wMDEsNTEyeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNUREREQzOyIgZD0iTTE1My4xMiwxMzUuNTE5djI4Mi42MDFsNjIuMTkxLTU0LjYyOVY4MC44OWgtOC4wOTJsLTQuMzA3LDMuMjg3SDE2Mi4wM2wtMC4wMTMtMy4zNDJsLTYuNzI1LDAuMDU1ICBsLTYyLjE5NCw1NC42MjZoNjAuMDE5TDE1My4xMiwxMzUuNTE5eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTEwMS42NjcsMTM1LjUxOWg0NC4zOTJsNTYuODUzLTUxLjM0MkgxNTguNTJMMTAxLjY2NywxMzUuNTE5eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkY3NTdDOyIgZD0iTTE2OC44MzQsMTIxLjcxN2wtNy4zNjUtMC4xMTNsLTE1LjQwNywxMy45MTVIMTAxLjY3bDE2LjEzMS0xNC41NzFsLTcuOTc5LTAuMTE4TDkzLjEsMTM1LjUxOSAgdjI4Mi42MDFoNjAuMDE5bDE1LjcxMi0xMy44VjEyMS43MTdIMTY4LjgzNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0VDRjBGMTsiIGQ9Ik0yNDkuNjg1LDEzNS41MTl2MjgyLjYwMWw2Mi4xODktNTQuNjI5VjgwLjg5di0wLjAwM2gtOC4wOTJsLTQuMzA0LDMuMjkyaC00MC44NzlsLTAuMDEzLTMuMzQyICBsLTYuNzI4LDAuMDVsLTYyLjE5NCw1NC42MjloNjAuMDE5aDAuMDAzVjEzNS41MTl6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMTk4LjIzMywxMzUuNTE5aDQ0LjM5MWw1Ni44NTMtNTEuMzQyaC00NC4zOTFMMTk4LjIzMywxMzUuNTE5eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkY3NTdDOyIgZD0iTTI2NS4zOTcsMTIxLjcxN2wtNy4zNjUtMC4xMTNsLTE1LjQwNywxMy45MTVoLTQ0LjM5MWwxNi4xMzEtMTQuNTcxbC03Ljk3OS0wLjExOGwtMTYuNzIyLDE0LjY4OSAgdjI4Mi42MDFoNjAuMDE5bDE1LjcxMi0xMy44VjEyMS43MTdIMjY1LjM5N3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzVEREREMzsiIGQ9Ik0zODAuOTQyLDcwLjg1bC00Ni4wNDcsNjguNzg1bDcyLjY5NCwyNzMuMDlsNDYuMDQ3LTY4Ljc4NUwzODAuOTQyLDcwLjg1bC03LjgxOSwyLjA4M2wtMy4zMTUsNC4yODMgIGwtMzkuNTA1LDEwLjUxNmwtMC44NzEtMy4yMjRsLTYuNDg3LDEuNzgxbC00Ni4wNDksNjguNzg1bDU3Ljk5Ny0xNS40MzlMMzgwLjk0Miw3MC44NXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yODUuMTc0LDE1Mi44NzFsNDIuODk5LTExLjQxOGw0MS43MzItNjQuMjM3bC00Mi44OTYsMTEuNDE4bC00MS43MzQsNjQuMjRWMTUyLjg3MXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzU3QzsiIGQ9Ik0zNDYuNTI5LDEyMi4yNTVsLTcuMTQ4LDEuNzg5bC0xMS4zMDgsMTcuNDA5bC00Mi44OTYsMTEuNDE4bDExLjg0My0xOC4yMjdsLTcuNzQsMS45MzYgIGwtMTIuMzgxLDE4LjQ5N2w3Mi42OTQsMjczLjA5bDU4LTE1LjQzOWwxMS42MzMtMTcuMzc1bC03Mi42OTQtMjczLjA5NUwzNDYuNTI5LDEyMi4yNTV6Ii8+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuNDExLDE0Ni43NTlsLTMuNjUxLTEzLjg5NGwtMjUuNzMyLDQyLjA3M2wzLjY0OSwxMy44OTRsMjUuNzM0LTQyLjA3NVYxNDYuNzU5eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zODAuNTEyLDEzOC44NjlsLTEuOTM4LTkuMDI4bC0xNy4zNjcsMjguMzk5bDEuOTQxLDkuMDI2bDE3LjM2Ny0yOC4zOTZIMzgwLjUxMnoiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
                            Книг's
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav" style={{display: this.state.auth ? 'flex' : 'none'}}>
                                <li class="nav-item">
                                    <a class="nav-link" onClick={(e) => this.history.push("/")}>Все книги</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" onClick={(e) => this.history.push("/cart")}>Моя корзина</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" onClick={(e) => this.history.push("/order")}>Мои Заказы</a>
                                </li>
                            </ul>
                        </div>
                        <SplitButton style={{display: this.state.auth ? 'inline-block' : 'none'}} label="usek"
                                     onClick={this.save} model={this.state.items}></SplitButton>
                        <Button icon='pi pi-sign-in' style={{display: this.state.auth ? 'none' : 'block'}}
                                onClick={(e) => this.history.push("/login")} label="Войти"/>
                    </nav>
                    <Switch>
                        <Route exact path="/login" render={() => <Form updateData={this.updateData} {...props}
                                                                       error={params.get('error')}/>}/>
                        <Route exact path="/" component={Books}/>
                        <Route exact path="/cart" component={Cart}/>
                        <Route exact path="/order" component={Order}/>
                    </Switch>
                </div>
            </Router>
        )
    }

    items = [
        {
            label: 'Каталог',
            command: () => {
                this.history.push("/");
            }
        },
        {
            label: 'Корзина',
            command: () => {
                this.history.push("/cart");
            }
        },
        {
            label: 'Заказы',
            command: () => {
                this.history.push("/order");
            }
        }
    ];

}

export default Menu

const inputs = [{
    type: "submit",
    value: "Submit",
    className: "btn"
}]

const props = {name: 'loginForm', method: 'POST', action: 'http://localhost:8080/perform_login', inputs: inputs}

const params = new URLSearchParams(window.location.search)

