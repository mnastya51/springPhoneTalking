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

class Talking extends Component {
    constructor() {
        super();
        this.state = {
            talking: [],
            cities: [],
            abonents: [],
            progress: true,
            visible: false,
            editFieldsIsVisible: false,
            period: moment(),
            cost: 0.0,
            kolmin: 0,
            selectedTalking: null,
            talkingEdit: null,
            dropdownCityId: '',
            dropdownAbonentId: ''
        };
    }

    componentDidMount() {
        this.processUpdate()
    }

    processUpdate() {
        axios.get('http://localhost:8080/api/user').then(res => {
            if (res.data) {
                this.setState({progress: true})
                axios.get('http://localhost:8080/api/getTalking').then(res1 => {
                    this.setState({talking: res1.data})
                    axios.get('http://localhost:8080/api/getCities').then(res2 => {
                        this.setState({cities: res2.data})
                        axios.get('http://localhost:8080/api/getAbonents').then(res3 => {
                            this.setState({abonents: res3.data})
                            this.setState({selectedTalking: null})
                            this.setState({progress: false})
                        })
                    })
                })
            }
            else {
                fetch('http://localhost:8080/talking').then(this.props.history.push('/login'));
            }
        })
    }

      processDelete() {
          let talkingToDelete = this.state.selectedTalking;
          const t = window.confirm("Вы действительно хотите удалить?");
          if (t) {
              if (talkingToDelete && talkingToDelete.length > 0) {
                  talkingToDelete.forEach(b => {
                      axios.get('http://localhost:8080/api/deleteTalking?talkid=' + b.talkid).then(res => {
                          this.processUpdate();
                      })
                  })
              } else {
                  alert("Выберете разговор (разговоры) для удаления")
              }
          }
      }

    processEdit() {
         let talkingToEdit = this.state.selectedTalking;
         const t = window.confirm("Изменить первый выделенный элемент?");
         if (t) {
             if (talkingToEdit && talkingToEdit.length > 0) {
                 let talking = talkingToEdit[0]
                 this.setState({talkingEdit: talking})
                 this.setState({
                     cost: talking.cost,
                     kolmin: talking.kolmin,
                     period: moment(talking.talktime),
                     dropdownCityId: talking.cityByCityid.cityid,
                     dropdownAbonentId: talking.abonentByAbonentid.abonentid
                 })
                 this.setState({editFieldsIsVisible: true})
             } else {
                 alert("Выберете разговор для изменения")
             }
         }
     }

    processAddOrEdit() {
        this.setState({editFieldsIsVisible: true})
        if (this.state.cities && this.state.cities.length > 0) {
            this.setState({dropdownCityId: this.state.cities[0].cityid})
        }
        if (this.state.abonents && this.state.abonents.length > 0) {
            this.setState({dropdownAbonentId: this.state.abonents[0].abonentid})
        }
    }

    processIsAddedOrEdited() {
        const period = this.state.period.format('YYYY-MM-DD HH:mm')
        if (this.state.cost && this.state.kolmin && this.state.dropdownCityId && this.state.dropdownAbonentId) {
            if (this.state.talkingEdit) {
                axios.get('http://localhost:8080/api/editTalking?cost=' + this.state.cost
                    + '&talktime=' + period
                    + '&kolmin=' + this.state.kolmin
                    + '&cityid=' + this.state.dropdownCityId
                    + '&abonentid=' + this.state.dropdownAbonentId
                    + '&talkid=' + this.state.talkingEdit.talkid).then(res => {
                    if (res.data) {
                        this.setState({cost: 0})
                        this.setState({kolmin: 0})
                        this.setState({editFieldsIsVisible: false})
                        this.setState({dropdownCityId: ''})
                        this.setState({dropdownAbonentId: ''})
                        this.setState({period: moment()})
                        this.setState({talkingEdit: null})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные или данный разговор уже существует")
                    }
                })
            } else {
                axios.get('http://localhost:8080/api/addTalking?cost=' + this.state.cost
                    + '&talktime=' + period
                    + '&kolmin=' + this.state.kolmin
                    + '&cityid=' + this.state.dropdownCityId
                    + '&abonentid=' + this.state.dropdownAbonentId).then(res => {
                    if (res.data) {
                        this.setState({cost: 0})
                        this.setState({kolmin: 0})
                        this.setState({editFieldsIsVisible: false})
                        this.setState({dropdownCityId: ''})
                        this.setState({dropdownAbonentId: ''})
                        this.setState({period: moment()})
                        this.processUpdate()
                    } else {
                        alert("Введены некорректные данные или данный разговор уже существует")
                    }
                })
            }
        } else {
            if (!this.state.cost)
                alert("Заполните поле Стоимость");
            else if (!this.state.dropdownCityId)
                alert("Выберете город")
            else if (!this.state.dropdownAbonentId)
                alert("Выберете телефон")
            else if (!this.state.kolmin)
                alert("Заполните поле Количество минут")
        }
    }

    processCancel() {
        this.setState({editFieldsIsVisible: false})
        this.setState({cost: 0})
        this.setState({dropdownCityId: ''})
        this.setState({dropdownAbonentId: ''})
        this.setState({talkingEdit: null})
        this.setState({selectedTalking: null})
        this.setState({cost: 0.0})
        this.setState({kolmin: 0})
        period: moment()
    }


    createSelectItemsCity() {
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


    createSelectItemsAbonent() {
        let items = [];
        if (this.state.dropdownAbonentId != '') {
            for (let i = 0; i < this.state.abonents.length; i++) {
                if (this.state.abonents[i].abonentid == this.state.dropdownAbonentId) {
                    items.push(<option class="p-inputtext p-component" key={this.state.abonents[i].abonentid}
                                       value={this.state.abonents[i].abonentid}>{this.state.abonents[i].phone}</option>);
                    break
                }
            }
            for (let i = 0; i < this.state.abonents.length; i++) {
                if (this.state.abonents[i].abonentid != this.state.dropdownAbonentId) {
                    items.push(<option class="p-inputtext p-component" key={this.state.abonents[i].abonentid}
                                       value={this.state.abonents[i].abonentid}>{this.state.abonents[i].phone}</option>);
                }
            }
        } else {
            for (let i = 0; i < this.state.abonents.length; i++) {
                items.push(<option class="p-inputtext p-component" key={this.state.abonents[i].abonentid}
                                   value={this.state.abonents[i].abonentid}>{this.state.abonents[i].phone}</option>);
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

    getPhoneFromAbonentId(abonentId) {
        for (let i = 0; i < this.state.abonents.length; i++) {
            if (this.state.abonents[i].abonentId == abonentId) {
                return this.state.abonents[i].phone;
            }
        }
        return ''
    }

    handleChangeStart = (moment) => {
        this.setState({
            period: moment
        });
    }

    render() {
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
                                <Button onClick={(e) => this.processDelete(this.state.selectedTalking.talkingid)}
                                        label="Удалить"/>
                            </Col>
                        </Row>
                        <Row style={{display: this.state.editFieldsIsVisible ? 'flex' : 'none', flexWrap: 'nowrap'}}>
                            <Col xs="auto">
                                <div>
                                    <label style={{color: '#898989'}}>Города</label>
                                    <Input class="p-inputtext p-component"
                                           style={{backgroundColor: '#585858', color: '#dedede'}}
                                           type="select"
                                           value={this.getCityNameFromCityId(this.state.dropdownCityId)}
                                           onChange={(e) => this.setState({dropdownCityId: e.target.value})}
                                           label="Города">{this.createSelectItemsCity()}</Input>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div>
                                    <label style={{color: '#898989'}}>Телефоны</label>
                                    <Input class="p-inputtext p-component"
                                           style={{backgroundColor: '#585858', color: '#dedede'}}
                                           type="select"
                                           value={this.getPhoneFromAbonentId(this.state.dropdownAbonentId)}
                                           onChange={(e) => this.setState({dropdownAbonentId: e.target.value})}
                                           label="Телефоны">{this.createSelectItemsAbonent()}</Input>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <label style={{marginTop: '-45px', color: 'rgb(137, 137, 137)'}}>Время</label>
                                <div>
                                    <DatetimePickerTrigger id='start' class='datetime-picker'
                                                           shortcuts={shortcuts}
                                                           moment={this.state.period}
                                                           onChange={this.handleChangeStart}>
                                        <InputText value={this.state.period.format('YYYY-MM-DD HH:mm')} readOnly/>
                                    </DatetimePickerTrigger>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="p-float-label">
                                    <label style={{marginTop: '-45px'}}>Количество минут</label>
                                    <div style={{marginTop: '35px'}}>
                                        <NumericInput id="inputNum" class="p-inputtext p-component"
                                                      min={0} max={10000}
                                                      value={this.state.kolmin}
                                                      strict={true}
                                                      step={1}
                                                      onChange={value => this.setState({kolmin: value})}/>
                                    </div>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="p-float-label">
                                    <label style={{marginTop: '-45px'}}>Стоимость</label>
                                    <div style={{marginTop: '35px'}}>
                                        <NumericInput id="inputNum" class="p-inputtext p-component"
                                                      min={0} max={1000}
                                                      value={this.state.cost}
                                                      strict={true}
                                                      step={0.1}
                                                      onChange={value => this.setState({cost: value})}/>
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
                           value={this.state.talking} header="Телефонные разговоры"
                           selection={this.state.selectedTalking}
                           onSelectionChange={e => this.setState({selectedTalking: e.data})}
                           emptyMessage="Список разговоров пока пуст">
                    <Column selectionMode="multiple" style={{width: '3em'}}/>
                    <Column field="cityByCityid.cityname" header="Город"/>
                    <Column field="abonentByAbonentid.phone" header="Телефон"/>
                    <Column field="talktime" header="Время"/>
                    <Column field="kolmin" header="Коичество минут"/>
                    <Column field="cost" header="Стоимость"/>
                </DataTable>
            </div>
        );
        return div;
    }
}

export default Talking