import React, {Component} from 'react'
import {Column, DataTable} from 'primereact/datatable'
import {ProgressSpinner} from 'primereact/progressspinner'
import axios from 'axios';
import {Button} from 'primereact/button'
import {Col, Container, Input, Row} from 'reactstrap'
import NumericInput from 'react-numeric-input';
import moment from "moment";
import {DatetimePickerTrigger} from "rc-datetime-picker";
import {InputText} from "primereact/inputtext";
import {$, jQuery} from 'jquery';

class Tarif extends Component {
    constructor() {
        super();
        this.state = {
            tarifs: [],
            cities: [],
            progress: true,
            visible: false,
            editFieldsIsVisible: false,
            periodStart: moment(),
            periodEnd: moment(),
            minCost: 0,
            selectedTarif: null,
            tarifEdit: null,
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
                axios.get('http://localhost:8080/api/getTarif').then(res1 => {
                    this.setState({tarifs: res1.data})
                    axios.get('http://localhost:8080/api/getCities').then(res2 => {
                        this.setState({cities: res2.data})
                        this.setState({selectedTarif: null})
                        this.setState({progress: false})
                    })
                })
            }
            else {
                fetch('http://localhost:8080/tarifs').then(this.props.history.push('/login'));
            }
        })
    }

     processDelete() {
          let tarifToDelete = this.state.selectedTarif;
          const t = window.confirm("Вы действительно хотите удалить?");
          if (t) {
              if (tarifToDelete && tarifToDelete.length > 0) {
                  tarifToDelete.forEach(b => {
                      axios.get('http://localhost:8080/api/deleteTarif?tarifid=' + b.tarifid).then(res => {
                          this.processUpdate();
                      })
                  })
              } else {
                  alert("Выберете тариф (тарифы) для удаления")
              }
          }
      }

     processEdit() {
        let tarifToEdit = this.state.selectedTarif;
        const t = window.confirm("Изменить первый выделенный элемент?");
        if (t) {
            if (tarifToEdit && tarifToEdit.length > 0) {
                let tarif = tarifToEdit[0]
                this.setState({tarifEdit: tarif})
                this.setState({
                    minCost: tarif.mincost,
                    dropdownCityId: tarif.cityByCityid.cityid,
                    periodStart: moment(tarif.periodstart),
                    periodEnd: moment(tarif.periodend)
                })
                this.setState({editFieldsIsVisible: true})
            } else {
                alert("Выберете тариф для изменения")
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
        if (this.state.minCost && this.state.dropdownCityId) {
            const perStart = this.state.periodStart.format('YYYY-MM-DD HH:mm')
            const perEnd = this.state.periodEnd.format('YYYY-MM-DD HH:mm')
            if (this.state.tarifEdit) {
                axios.get('http://localhost:8080/api/editTarif?mincost=' + this.state.minCost
                    + '&periodstart=' + perStart
                    +'&periodend=' + perEnd
                    +'&cityid=' + this.state.dropdownCityId
                    + '&tarifid=' + this.state.tarifEdit.tarifid).then(res => {
                    if (res.data) {
                        this.setState({minCost: 0})
                        this.setState({editFieldsIsVisible: false})
                        this.setState({dropdownCityId: ''})
                        this.setState({periodStart: moment()})
                        this.setState({periodEnd: moment()})
                        this.setState({tarifEdit: null})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные или данный тариф уже существует")
                    }
                })
            } else {
                axios.get('http://localhost:8080/api/addTarif?mincost=' + this.state.minCost
                    + '&periodstart=' + perStart
                    +'&periodend=' + perEnd
                    +'&cityid=' + this.state.dropdownCityId).then(res => {
                    if (res.data) {
                        this.setState({minCost: 0})
                        this.setState({editFieldsIsVisible: false})
                        this.setState({dropdownCityId: ''})
                        this.setState({periodStart: moment()})
                        this.setState({periodEnd: moment()})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные или данный тариф уже существует")
                    }
                })
            }
        } else {
            if (!this.state.minCost)
                alert("Заполните поле Цена за минуту");
            else if (!this.state.dropdownCityId)
                alert("Выберете город")
        }
    }

    processCancel() {
        this.setState({editFieldsIsVisible: false})
        this.setState({minCost: 0})
        this.setState({periodStart: moment()})
        this.setState({periodEnd: moment()})
        this.setState({dropdownCityId: ''})
        this.setState({tarifEdit: null})
        this.setState({selectedTarif: null})
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

    handleChangeStart = (moment) => {
        this.setState({
            periodStart: moment
        });
    }

    handleChangeEnd = (moment) => {
        this.setState({
            periodEnd: moment
        });
    }

    render() {

      // this.shortcuts-bar.css('display: none')
        const shortcuts = {
            'Сегодня': moment(),
            'Вчера': moment().subtract(1, 'days'),
        };
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
                                <Button onClick={(e) => this.processDelete(this.state.selectedTarif.tarifid)}
                                        label="Удалить"/>
                            </Col>
                        </Row>
                        <Row style={{display: this.state.editFieldsIsVisible ? 'flex' : 'none'}}>
                            <Col xs="auto">
                                <div>
                                    <label style={{color: '#898989'}}>Тарифы</label>
                                    <Input class="p-inputtext p-component"
                                           style={{backgroundColor: '#585858', color: '#dedede'}}
                                           type="select"
                                           value={this.getCityNameFromCityId(this.state.dropdownCityId)}
                                           onChange={(e) => this.setState({dropdownCityId: e.target.value})}
                                           label="Города">{this.createSelectItems()}</Input>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <label style={{marginTop: '-45px', color: 'rgb(137, 137, 137)'}}>Начало периода</label>
                                <div>
                                    <DatetimePickerTrigger id='start' class='datetime-picker'
                                                           shortcuts={shortcuts}
                                                           moment={this.state.periodStart}
                                                           onChange={this.handleChangeStart}>
                                        <InputText value={this.state.periodStart.format('YYYY-MM-DD HH:mm')} readOnly/>
                                    </DatetimePickerTrigger>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <label style={{marginTop: '-45px', color: 'rgb(137, 137, 137)'}}>Конец периода</label>
                                <div>
                                    <DatetimePickerTrigger id='end' class='datetime-picker'
                                                           shortcuts={shortcuts}
                                                           moment={this.state.periodEnd}
                                                           onChange={this.handleChangeEnd}>
                                        <InputText value={this.state.periodEnd.format('YYYY-MM-DD HH:mm')} readOnly/>
                                    </DatetimePickerTrigger>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="p-float-label">
                                    <label style={{marginTop: '-45px'}}>Цена за минуту</label>
                                    <div style={{marginTop: '35px'}}>
                                        <NumericInput id="inputNum" class="p-inputtext p-component"
                                                      min={0} max={1000}
                                                      value={this.state.minCost}
                                                      strict={true}
                                                      step={0.1}
                                                      onChange={value => this.setState({minCost: value})}/>
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
                           value={this.state.tarifs} header="Тарифы"
                           selection={this.state.selectedTarif}
                           onSelectionChange={e => this.setState({selectedTarif: e.data})}
                           emptyMessage="Список тарифов пока пуст">
                    <Column selectionMode="multiple" style={{width: '3em'}}/>
                    <Column field="cityByCityid.cityname" header="Город"/>
                    <Column field="periodstart" header="Начало периода"/>
                    <Column field="periodend" header="Конец периода"/>
                    <Column field="mincost" header="Цена за минуту"/>
                </DataTable>
            </div>
        );
        return div;
    }
}

export default Tarif