import React, {Component} from 'react'
import {Column, DataTable} from 'primereact/datatable'
import {ProgressSpinner} from 'primereact/progressspinner'
import axios from 'axios';
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'

class Cities extends Component {
    constructor() {
        super();
        this.state = {
            cities: [],
            progress: true,
            visible: false,
            editFieldsIsVisible: false,
            addedCityName: '',
            selectedCity: null
        };
    }

    componentDidMount() {
        this.processUpdate()
    }

    processUpdate() {
        axios.get('http://localhost:8080/api/user').then(res => {
            if (res.data) {
                this.setState({progress: true})
                axios.get('http://localhost:8080/api/getCities').then(res => {
                    this.setState({cities: res.data})
                    this.setState({progress: false})
                })
            }
            else {
                fetch('http://localhost:8080/cities').then(this.props.history.push('/login'));
            }
        })
    }

    processDelete() {
        let cityToDelete = this.state.selectedCity;
        const  t = window.confirm("Вы действительно хотите удалить?");
        if(t) {
            if (cityToDelete && cityToDelete.length > 0) {
                cityToDelete.forEach(b => {
                    axios.get('http://localhost:8080/api/deleteCity?cityid=' + b.cityid).then(res => {
                        this.processUpdate();
                    })
                })
            } else {
                alert("Выберете город (города) для удаления")
            }
        }
    }

    processAdd(){
        this.setState({editFieldsIsVisible: true})
    }

    processIsAdded(){
        if (this.state.addedCityName) {
            axios.get('http://localhost:8080/api/addCity?cityname=' + this.state.addedCityName).then(res => {
                if (res.data) {
                    this.setState({addedCityName: ''})
                    this.setState({editFieldsIsVisible: false})
                    this.processUpdate()
                } else {
                    alert("Введено некорректное или существующее название города")
                }
            })
        } else {
            alert("Пустое название города")
        }
    }

    render() {
        let div = (
            <div>
                <ProgressSpinner style={{display: this.state.progress ? 'block' : 'none'}}/>
                <div className="p-col-12 p-md-2" style={{display: this.state.editFieldsIsVisible ? 'none' : 'block'}}>
                    <div className="p-inputgroup">
                        <Button onClick={(e) => this.processAdd()} label="Добавить"/>
                        <Button style={{ marginLeft: '5%'}} onClick={(e) => this.processDelete(this.state.selectedCity.cityid)} label="Удалить"/>
                    </div>
                </div>
                <div className="p-col-20 p-md-2" style={{display: this.state.editFieldsIsVisible ? 'block' : 'none'}}>
                    <div className="p-inputgroup">
                        <span className="p-float-label">
                            <InputText id="inputCity" name="username" value={this.state.addedCityName} onChange={(e) => this.setState({ addedCityName: e.target.value })}/>
                            <label htmlFor="inputCity">Название</label>
                        </span>
                        <Button style={{display: 'block', height: '30px',  marginLeft: '5%'}} onClick={(e) => this.processIsAdded()} label="Сохранить"/>
                    </div>
                </div>
                <DataTable styleClass="borderless" style={{display: this.state.progress ? 'none' : 'block'}}
                           value={this.state.cities} header="Города"
                           selection={this.state.selectedCity} onSelectionChange={e => this.setState({ selectedCity: e.data })}
                           emptyMessage="Список городов пока пуст">
                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                    <Column field="cityname" header="Название"/>
                </DataTable>
            </div>
        );
        return div;
    }
}

export default Cities