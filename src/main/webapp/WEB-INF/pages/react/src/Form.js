import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import {Growl} from 'primereact/growl';
import {
  withRouter
} from 'react-router-dom'
import LocationSearchInput from './LocationSearchInput';


class Form extends Component {

  constructor(props) {
    super(props)
    if (props.error) {
      this.state = { failure: 'wrong username or password!', errcount: 0, login: '', password: '', value:'' }
    } else {
      this.state = { errcount: 0, login: '', password: '', value:'' }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (!this.state.errcount) {
      const data = new FormData(this.form)
      fetch(this.form.action, {
        body: new URLSearchParams(data),
        method: this.form.method
      }).then(v => {
        if(v.redirected) {
          if (v.url.includes('error')) {
            this.growl.show({severity: 'error', summary: 'Очень жаль', detail: 'Неправильный логин и/или пароль!'})
          } else {
            this.props.updateData(true)
            this.props.history.push(v.url.replace('http://localhost:8080', ''))
          }
        }
      })
        .catch(e => console.warn(e))
    }
  }

  handleError = (field, errmsg) => {
    if (!field) return

    if (errmsg) {
      this.setState((prevState) => ({
        failure: '',
        errcount: prevState.errcount + 1,
        errmsgs: { ...prevState.errmsgs, [field]: errmsg }
      }))
    } else {
      this.setState((prevState) => ({
        failure: '',
        errcount: prevState.errcount === 1 ? 0 : prevState.errcount - 1,
        errmsgs: { ...prevState.errmsgs, [field]: '' }
      }))
    }
  }

  renderError = () => {
    if (this.state.errcount || this.state.failure) {
      this.growl.show({severity: 'danger', summary: 'Очень жаль', detail: 'Неправильный логин и/или пароль'})
    }
  }

  render() {
    const inputs = this.props.inputs.map(
      ({ name, placeholder, type, value, className }, index) => (
        <Input key={index} name={name} placeholder={placeholder} type={type} value={value}
          className={type === 'submit' ? className : ''} handleError={this.handleError} />
      )
    )
    const errors = this.renderError()
    return (
      <form {...this.props} class="form-signin" onSubmit={this.handleSubmit} ref={fm => { this.form = fm }} >
       <Growl ref={(el) => this.growl = el} />
        <img class="mb-4" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0E0RjsiIGQ9Ik0yNTYuMDAxLDUxMkMzOTcsNTEyLDUxMiwzOTcsNTEyLDI1Ni4wMDFTMzk3LDAsMjU2LjAwMSwwQzExNSwwLDAsMTE1LjAwMiwwLDI1Ni4wMDEgIFMxMTUsNTEyLDI1Ni4wMDEsNTEyeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNUREREQzOyIgZD0iTTE1My4xMiwxMzUuNTE5djI4Mi42MDFsNjIuMTkxLTU0LjYyOVY4MC44OWgtOC4wOTJsLTQuMzA3LDMuMjg3SDE2Mi4wM2wtMC4wMTMtMy4zNDJsLTYuNzI1LDAuMDU1ICBsLTYyLjE5NCw1NC42MjZoNjAuMDE5TDE1My4xMiwxMzUuNTE5eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTEwMS42NjcsMTM1LjUxOWg0NC4zOTJsNTYuODUzLTUxLjM0MkgxNTguNTJMMTAxLjY2NywxMzUuNTE5eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkY3NTdDOyIgZD0iTTE2OC44MzQsMTIxLjcxN2wtNy4zNjUtMC4xMTNsLTE1LjQwNywxMy45MTVIMTAxLjY3bDE2LjEzMS0xNC41NzFsLTcuOTc5LTAuMTE4TDkzLjEsMTM1LjUxOSAgdjI4Mi42MDFoNjAuMDE5bDE1LjcxMi0xMy44VjEyMS43MTdIMTY4LjgzNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0VDRjBGMTsiIGQ9Ik0yNDkuNjg1LDEzNS41MTl2MjgyLjYwMWw2Mi4xODktNTQuNjI5VjgwLjg5di0wLjAwM2gtOC4wOTJsLTQuMzA0LDMuMjkyaC00MC44NzlsLTAuMDEzLTMuMzQyICBsLTYuNzI4LDAuMDVsLTYyLjE5NCw1NC42MjloNjAuMDE5aDAuMDAzVjEzNS41MTl6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMTk4LjIzMywxMzUuNTE5aDQ0LjM5MWw1Ni44NTMtNTEuMzQyaC00NC4zOTFMMTk4LjIzMywxMzUuNTE5eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkY3NTdDOyIgZD0iTTI2NS4zOTcsMTIxLjcxN2wtNy4zNjUtMC4xMTNsLTE1LjQwNywxMy45MTVoLTQ0LjM5MWwxNi4xMzEtMTQuNTcxbC03Ljk3OS0wLjExOGwtMTYuNzIyLDE0LjY4OSAgdjI4Mi42MDFoNjAuMDE5bDE1LjcxMi0xMy44VjEyMS43MTdIMjY1LjM5N3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzVEREREMzsiIGQ9Ik0zODAuOTQyLDcwLjg1bC00Ni4wNDcsNjguNzg1bDcyLjY5NCwyNzMuMDlsNDYuMDQ3LTY4Ljc4NUwzODAuOTQyLDcwLjg1bC03LjgxOSwyLjA4M2wtMy4zMTUsNC4yODMgIGwtMzkuNTA1LDEwLjUxNmwtMC44NzEtMy4yMjRsLTYuNDg3LDEuNzgxbC00Ni4wNDksNjguNzg1bDU3Ljk5Ny0xNS40MzlMMzgwLjk0Miw3MC44NXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yODUuMTc0LDE1Mi44NzFsNDIuODk5LTExLjQxOGw0MS43MzItNjQuMjM3bC00Mi44OTYsMTEuNDE4bC00MS43MzQsNjQuMjRWMTUyLjg3MXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzU3QzsiIGQ9Ik0zNDYuNTI5LDEyMi4yNTVsLTcuMTQ4LDEuNzg5bC0xMS4zMDgsMTcuNDA5bC00Mi44OTYsMTEuNDE4bDExLjg0My0xOC4yMjdsLTcuNzQsMS45MzYgIGwtMTIuMzgxLDE4LjQ5N2w3Mi42OTQsMjczLjA5bDU4LTE1LjQzOWwxMS42MzMtMTcuMzc1bC03Mi42OTQtMjczLjA5NUwzNDYuNTI5LDEyMi4yNTV6Ii8+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuNDExLDE0Ni43NTlsLTMuNjUxLTEzLjg5NGwtMjUuNzMyLDQyLjA3M2wzLjY0OSwxMy44OTRsMjUuNzM0LTQyLjA3NVYxNDYuNzU5eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zODAuNTEyLDEzOC44NjlsLTEuOTM4LTkuMDI4bC0xNy4zNjcsMjguMzk5bDEuOTQxLDkuMDI2bDE3LjM2Ny0yOC4zOTZIMzgwLjUxMnoiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" alt="" width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal">Войти в аккаунт</h1>
        <span className="p-float-label">
          <InputText id="inputEmail" name="username" value={this.state.login} onChange={(e) => this.setState({ login: e.target.value })} />
          <label htmlFor="inputEmail">Логин</label>
        </span>
        <span className="p-float-label">
          <Password feedback={false} id="inputPassword" name="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
          <label htmlFor="inputPassword">Пароль</label>
        </span>

        <Button label="Войти" class="login-button" type="submit" />
        <p class="mt-5 mb-3 text-muted">© 2018</p>
        {errors}
      </form>
    )
  }
}

Form.propTypes = {
  name: PropTypes.string,
  action: PropTypes.string,
  method: PropTypes.string,
  inputs: PropTypes.array,
  error: PropTypes.string
}

export default withRouter(Form)