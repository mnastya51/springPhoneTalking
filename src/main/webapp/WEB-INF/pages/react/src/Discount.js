import React, {Component} from 'react'
import {Column, DataTable} from 'primereact/datatable'
import {ProgressSpinner} from 'primereact/progressspinner'
import axios from 'axios';
import {Button} from 'primereact/button'
import {Col, Container, Input, Row} from 'reactstrap'
import NumericInput from 'react-numeric-input';

class Discount extends Component {
    constructor() {
        super();
        this.state = {
            discounts: [],
            cities: [],
            progress: true,
            visible: false,
            editFieldsIsVisible: false,
            amountDiscount: 0,
            cityName: '',
            selectedDiscount: null,
            discountEdit: null,
            dropdownCityId: ''
        };
    }

    componentDidMount() {
        this.processUpdate()
    }

    processUpdate() {
        axios.get('http://localhost:8080/api/user').then(res => {
            if (res.data) {
                this.setState({progress: true})
                axios.get('http://localhost:8080/api/getDiscounts').then(res1 => {
                    this.setState({discounts: res1.data})
                    axios.get('http://localhost:8080/api/getCities').then(res2 => {
                        this.setState({cities: res2.data})
                        this.setState({progress: false})
                    })
                })
            }
            else {
                fetch('http://localhost:8080/discounts').then(this.props.history.push('/login'));
            }
        })
    }

    /* processDelete() {
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
     }*/

    processAddOrEdit() {
        this.setState({editFieldsIsVisible: true})
        if (this.state.cities && this.state.cities.length > 0) {
            this.setState({dropdownCityId: this.state.cities[0].cityid})
        }
    }

    processIsAddedOrEdited() {
        if (this.state.amountDiscount && this.state.dropdownCityId) {
            if (this.state.discountEdit) {
                /*axios.get('http://localhost:8080/api/editAbonent?amountdiscount=' + this.state.amountDiscount + '&discountid=' + this.state.discountEdit.discountid
                    + '&cityid=' + this.state.discountEdit.cityByCityid.cityname).then(res => {
                    if (res.data) {
                        this.setState({amountDiscount: ''})
                        this.setState({cityName: ''})
                        this.setState({editFieldsIsVisible: false})
                        this.setState({discountEdit: null})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные")
                    }
                })*/
            } else {
                axios.get('http://localhost:8080/api/addDiscount?amountdiscount=' + this.state.amountDiscount
                    + '&cityid=' + this.state.dropdownCityId).then(res => {
                    if (res.data) {
                        this.setState({amountDiscount: 0})
                        this.setState({editFieldsIsVisible: false})
                        this.setState({dropdownCityId: ''})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные")
                    }
                })
            }
        } else {
            if (!this.state.amountDiscount)
                alert("Заполните поле Размер скидки");
            else if (!this.state.dropdownCityId)
                alert("Выберете город")
        }
    }

    createSelectItems() {
        let items = [];
        for (let i = 0; i < this.state.cities.length; i++) {
            items.push(<option key={this.state.cities[i].cityid}
                               value={this.state.cities[i].cityid}>{this.state.cities[i].cityname}</option>);
        }
        return items;
    }

    render() {
        let div = (
            <div>
                <ProgressSpinner style={{display: this.state.progress ? 'block' : 'none'}}/>
                <Container style={{marginLeft: '0%', marginTop: '16px', marginBottom: '16px'}}>
                    <Row style={{display: this.state.editFieldsIsVisible ? 'none' : 'flex'}}>
                        <Col xs="auto">
                            <Button onClick={(e) => this.processAddOrEdit()} label="Добавить"/>
                        </Col>
                        <Col xs="auto">
                            <Button onClick={(e) => this.processEdit()} label="Изменить"/>
                        </Col>
                        <Col xs="auto">
                            <Button onClick={(e) => this.processDelete(this.state.selectedDiscount.discountid)}
                                    label="Удалить"/>
                        </Col>
                    </Row>
                    <Row style={{display: this.state.editFieldsIsVisible ? 'flex' : 'none'}}>
                        <Col xs="auto">
                            <Input class="p-inputtext p-component"
                                   type="select"
                                   onChange={(e) => this.setState({dropdownCityId: e.target.value})}
                                   label="Города">{this.createSelectItems()}</Input>
                        </Col>
                        <Col xs="auto">
                            <span className="p-float-label">
                                <label>Размер скидки в %</label>
                                <NumericInput id="inputNum" class="p-inputtext p-component"
                                              min={0} max={100}
                                              value={this.state.amountDiscount}
                                              strict={true}
                                              onChange={value => this.setState({amountDiscount: value})}/>
                            </span>
                        </Col>
                        <Col xs="auto">
                            <Button style={{display: 'block', height: '30px', marginLeft: '5%'}}
                                    onClick={(e) => this.processIsAddedOrEdited()} label="Сохранить"/>
                        </Col>
                    </Row>
                </Container>
                <DataTable styleClass="borderless" style={{display: this.state.progress ? 'none' : 'block'}}
                           value={this.state.discounts} header="Скидки"
                           selection={this.state.selectedDiscount}
                           onSelectionChange={e => this.setState({selectedDiscount: e.data})}
                           emptyMessage="Список скидок пока пуст">
                    <Column selectionMode="multiple" style={{width: '3em'}}/>
                    <Column field="cityByCityid.cityname" header="Город"/>
                    <Column field="amountdiscount" header="Размер скидки (%)"/>
                </DataTable>
            </div>
        );
        return div;
    }
}

export default Discount