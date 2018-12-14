import React, {Component} from 'react'
import {Column, DataTable} from 'primereact/datatable'
import {ProgressSpinner} from 'primereact/progressspinner'
import axios from 'axios';
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {Col, Container, Row} from 'reactstrap'
import MaskedInput from 'react-text-mask'

class Abonents extends Component {
    constructor() {
        super();
        this.state = {
            abonents: [],
            progress: true,
            visible: false,
            editFieldsIsVisible: false,
            addedAbonentName: '',
            addedPhone: '',
            addedAddress: '',
            addedPassport: '',
            selectedAbonent: null,
            abonentEdit: null
        };
    }

    componentDidMount() {
        this.processUpdate()
    }

    processUpdate() {
        axios.get('http://localhost:8080/api/user').then(res => {
            if (res.data) {
                this.setState({progress: true})
                axios.get('http://localhost:8080/api/getAbonents').then(res => {
                    this.setState({abonents: res.data})
                    this.setState({selectedAbonent: null})
                    this.setState({progress: false})
                })
            }
            else {
                fetch('http://localhost:8080/abonents').then(this.props.history.push('/login'));
            }
        })
    }

    processDelete() {
        let abonentToDelete = this.state.selectedAbonent;
        const t = window.confirm("Вы действительно хотите удалить?");
        if (t) {
            if (abonentToDelete && abonentToDelete.length > 0) {
                abonentToDelete.forEach(b => {
                    axios.get('http://localhost:8080/api/deleteAbonent?abonentid=' + b.abonentid).then(res => {
                        this.processUpdate();
                    })
                })
            } else {
                alert("Выберете абонент (абоненты) для удаления")
            }
        }
    }

    processEdit() {
        let abonentToEdit = this.state.selectedAbonent;
        const t = window.confirm("Изменить первый выделенный элемент?");
        if (t) {
            if (abonentToEdit && abonentToEdit.length > 0) {
                let abonent = abonentToEdit[0]
                this.setState({abonentEdit: abonent})
                this.setState({
                    addedAbonentName: abonent.fio,
                    addedPhone: abonent.phone,
                    addedAddress: abonent.address,
                    addedPassport: abonent.passport
                })
                this.processAddOrEdit()
            } else {
                alert("Выберете абонента для изменения")
            }
        }
    }

    processAddOrEdit() {
        this.setState({editFieldsIsVisible: true})
    }

    processCancel() {
        this.setState({editFieldsIsVisible: false})
        this.setState({addedAbonentName: ''})
        this.setState({addedPhone: ''})
        this.setState({addedAddress: ''})
        this.setState({addedPassport: ''})
        this.setState({abonentEdit: null})
        this.setState({selectedAbonent: null})
    }

    processIsAddedOrEdited() {
        if (this.state.addedAbonentName && this.state.addedPhone && this.state.addedPhone.replace("_", "").length == 14 &&
            (this.state.addedPassport.replace("_", "").length == 6 || !this.state.addedPassport)) {
            if (this.state.abonentEdit) {
                axios.get('http://localhost:8080/api/editAbonent?fio=' + this.state.addedAbonentName + '&phone=' + this.state.addedPhone + '&address=' + this.state.addedAddress
                    + '&passport=' + this.state.addedPassport + '&abonentid=' + this.state.abonentEdit.abonentid).then(res => {
                    if (res.data) {
                        this.setState({addedAbonentName: ''})
                        this.setState({addedPhone: ''})
                        this.setState({addedAddress: ''})
                        this.setState({addedPassport: ''})
                        this.setState({editFieldsIsVisible: false})
                        this.setState({abonentEdit: null})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные или данный абонент уже существует")
                    }
                })
            } else {
                axios.get('http://localhost:8080/api/addAbonent?fio=' + this.state.addedAbonentName + '&phone=' + this.state.addedPhone + '&address=' + this.state.addedAddress
                    + '&passport=' + this.state.addedPassport).then(res => {
                    if (res.data) {
                        this.setState({addedAbonentName: ''})
                        this.setState({addedPhone: ''})
                        this.setState({addedAddress: ''})
                        this.setState({addedPassport: ''})
                        this.setState({editFieldsIsVisible: false})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные или данный абонент уже существует")
                    }
                })
            }
        } else {
            if (!this.state.addedAbonentName)
                alert("Заполните поле ФИО");
            else if (!this.state.addedPhone)
                alert("Заполните поле Телефон");
            else if (this.state.addedPhone.replace("_", "").length != 14)
                alert("Введите телефон полностью");
            else if (this.state.addedPassport.replace("_", "").length != 6)
                alert("Введите номер паспорта полностью");
        }
    }

    render() {
        let div = (
            <div style={{display: this.state.progress ? 'none' : 'block'}}>
                <ProgressSpinner style={{display: this.state.progress ? 'block' : 'none'}}/>
                <div>
                    <Container style={{marginLeft: '0%', marginTop: '16px', marginBottom: '16px'}}>
                        <Row style={{display: this.state.editFieldsIsVisible ? 'none' : 'flex'}}>
                            <Col xs="auto">
                                <Button onClick={(e) => this.processAddOrEdit()} label="Добавить"/>
                            </Col>
                            <Col xs="auto">
                                <Button onClick={(e) => this.processEdit()} label="Изменить"/>
                            </Col>
                            <Col xs="auto">
                                <Button onClick={(e) => this.processDelete(this.state.selectedAbonent.abonentid)}
                                        label="Удалить"/>
                            </Col>
                        </Row>
                        <Row style={{display: this.state.editFieldsIsVisible ? 'flex' : 'none'}}>
                            <Col xs="auto">
                                <MaskedInput class="p-inputtext p-component"
                                             mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                             placeholder="Телефон"
                                              id="inputPhone"
                                              name="phone"
                                              value={this.state.addedPhone}
                                              onChange={(e) => this.setState({addedPhone: e.target.value})}/>
                            </Col>
                            <Col xs="auto">
                                <span className="p-float-label">
                                    <InputText id="inputFio" name="fio" value={this.state.addedAbonentName}
                                               onChange={(e) => this.setState({addedAbonentName: e.target.value})}/>
                                    <label htmlFor="inputFio">ФИО</label>
                                </span>
                            </Col>
                            <Col xs="auto">
                                <span className="p-float-label">
                                    <InputText id="inputAddress" name="address" value={this.state.addedAddress}
                                               onChange={(e) => this.setState({addedAddress: e.target.value})}/>
                                    <label htmlFor="inputAddress">Адрес</label>
                                </span>
                            </Col>
                            <Col xs="auto">
                                <MaskedInput class="p-inputtext p-component"
                                             mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                             placeholder="Паспорт"
                                             id="inputPassport"
                                             name="passport"
                                             value={this.state.addedPassport}
                                             onChange={(e) => this.setState({addedPassport: e.target.value})}/>
                                {/*<span className="p-float-label">*/}
                                    {/*<InputText id="inputPassport" name="passport" value={this.state.addedPassport}*/}
                                               {/*onChange={(e) => this.setState({addedPassport: e.target.value})}/>*/}
                                    {/*<label htmlFor="inputPassport">Паспорт</label>*/}
                                {/*</span>*/}
                            </Col>
                            <Col xs="auto">
                                <Button style={{display: 'block', height: '30px', marginLeft: '5%'}}
                                        onClick={(e) => this.processIsAddedOrEdited()} label="Сохранить"/>
                            </Col>
                            <Col xs="auto">
                                <Button style={{display: 'block', height: '30px', marginLeft: '10%'}}
                                        onClick={(e) => this.processCancel()} label="Отменить"/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <DataTable styleClass="borderless" style={{display: this.state.progress ? 'none' : 'block'}}
                           value={this.state.abonents} header="Абоненты"
                           selection={this.state.selectedAbonent}
                           onSelectionChange={e => this.setState({selectedAbonent: e.data})}
                           emptyMessage="Список абонентов пока пуст">
                    <Column selectionMode="multiple" style={{width: '3em'}}/>
                    <Column field="phone" header="Телефон"/>
                    <Column field="fio" header="Фио"/>
                    <Column field="address" header="Адрес"/>
                    <Column field="passport" header="Паспорт"/>
                </DataTable>
            </div>
        );
        return div;
    }
}

export default Abonents