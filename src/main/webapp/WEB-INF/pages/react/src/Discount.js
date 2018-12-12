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
                        this.setState({selectedDiscount: null})
                        this.setState({progress: false})
                    })
                })
            }
            else {
                fetch('http://localhost:8080/discounts').then(this.props.history.push('/login'));
            }
        })
    }

   processDelete() {
         let discountToDelete = this.state.selectedDiscount;
         const t = window.confirm("Вы действительно хотите удалить?");
         if (t) {
             if (discountToDelete && discountToDelete.length > 0) {
                 discountToDelete.forEach(b => {
                     axios.get('http://localhost:8080/api/deleteDiscount?discountid=' + b.discountid).then(res => {
                         this.processUpdate();
                     })
                 })
             } else {
                 alert("Выберете скидку (скидки) для удаления")
             }
         }
     }

      processEdit() {
        let discountToEdit = this.state.selectedDiscount;
        const t = window.confirm("Изменить первый выделенный элемент?");
        if (t) {
            if (discountToEdit && discountToEdit.length > 0) {
                let discount = discountToEdit[0]
                this.setState({discountEdit: discount})
                this.setState({
                    amountDiscount: discount.amountdiscount,
                    dropdownCityId: discount.cityByCityid.cityid
                })
                this.setState({editFieldsIsVisible: true})
            } else {
                alert("Выберете скидку для изменения")
            }
        }
    }

    processAddOrEdit() {
        this.setState({editFieldsIsVisible: true})
        if (this.state.cities && this.state.cities.length > 0) {
            this.setState({dropdownCityId: this.state.cities[0].cityid})
        }
    }

    processIsAddedOrEdited() {
        if (this.state.amountDiscount && this.state.dropdownCityId) {
            if (this.state.discountEdit) {
                axios.get('http://localhost:8080/api/editDiscount?amountdiscount=' + this.state.amountDiscount +
                    '&discountid=' + this.state.discountEdit.discountid
                    + '&cityid=' + this.state.dropdownCityId).then(res => {
                    if (res.data) {
                        this.setState({amountDiscount: 0})
                        this.setState({editFieldsIsVisible: false})
                        this.setState({dropdownCityId: ''})
                        this.setState({discountEdit: null})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные")
                    }
                })
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

    processCancel() {
        this.setState({editFieldsIsVisible: false})
        this.setState({amountDiscount: 0})
        this.setState({dropdownCityId: ''})
        this.setState({discountEdit: null})
        this.setState({selectedDiscount: null})
    }

    createSelectItems() {
        let items = [];
        if (this.state.dropdownCityId != '') {
            for (let i = 0; i < this.state.cities.length; i++) {
                if (this.state.cities[i].cityid == this.state.dropdownCityId) {
                    items.push(<option class="p-inputtext p-component" key={this.state.cities[i].cityid}
                                           value={this.state.cities[i].cityid}>{this.state.cities[i].cityname}</option>);
                    break
                }
            }
            for (let i = 0; i < this.state.cities.length; i++) {
                if (this.state.cities[i].cityid != this.state.dropdownCityId) {
                    items.push(<option class="p-inputtext p-component" key={this.state.cities[i].cityid}
                                       value={this.state.cities[i].cityid}>{this.state.cities[i].cityname}</option>);
                }
            }
        } else {
            for (let i = 0; i < this.state.cities.length; i++) {
                items.push(<option class="p-inputtext p-component" key={this.state.cities[i].cityid}
                                   value={this.state.cities[i].cityid}>{this.state.cities[i].cityname}</option>);
            }
        }
        return items;
    }

    getCityNameFromCityId(cityId) {
        for (let i = 0; i < this.state.cities.length; i++) {
            if (this.state.cities[i].cityid == cityId) {
                return this.state.cities[i].cityname;
            }
        }
        return ''
    }

    render() {
        let div = (
            <div>
                <ProgressSpinner style={{display: this.state.progress ? 'block' : 'none'}}/>
                <div style={{display: this.state.progress ? 'none' : 'block'}}>
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
                                <div>
                                    <label style = {{color: '#898989'}}>Города</label>
                                    <Input class="p-inputtext p-component" style={{backgroundColor: '#585858', color: '#dedede'}}
                                           type="select"
                                           value={this.getCityNameFromCityId(this.state.dropdownCityId)}
                                           onChange={(e) => this.setState({dropdownCityId: e.target.value})}
                                           label="Города">{this.createSelectItems()}</Input>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="p-float-label">
                                    <label style ={{marginTop: '-45px'}}>Размер скидки в %</label>
                                    <div style={{marginTop: '35px'}}>
                                        <NumericInput  id="inputNum" class="p-inputtext p-component"
                                                      min={0} max={100}
                                                      value={this.state.amountDiscount}
                                                      strict={true}
                                                      onChange={value => this.setState({amountDiscount: value})}/>
                                    </div>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <Button style={{display: 'block', height: '30px', marginLeft: '5%', top: '20px'}}
                                        onClick={(e) => this.processIsAddedOrEdited()} label="Сохранить"/>
                            </Col>
                            <Col xs="auto">
                                <Button style={{display: 'block', height: '30px', marginLeft: '10%', top: '20px'}}
                                        onClick={(e) => this.processCancel()} label="Отменить"/>
                            </Col>
                        </Row>
                    </Container>
                </div>
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