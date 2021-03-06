import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import {Password} from 'primereact/password'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {Growl} from 'primereact/growl';
import {withRouter} from 'react-router-dom'


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
            alert('Неправильный логин и/или пароль!')
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
        alert('Неправильный логин и/или пароль!')
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
        <img class="mb-4" src="data:image/png;base64,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" alt="" width="72" height="72" />
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