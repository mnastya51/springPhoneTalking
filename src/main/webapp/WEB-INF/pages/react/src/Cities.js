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
            addedCityName: ''
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
        return (
            <div>
                <ProgressSpinner style={{display: this.state.progress ? 'block' : 'none'}}/>
                <Button style={{display: this.state.editFieldsIsVisible ? 'none' : 'block'}} onClick={(e) => this.processAdd()} label="Добавить"/>
                <div style={{display: this.state.editFieldsIsVisible ? 'block' : 'none'}}>
                    <span className="p-float-label">
                        <InputText id="inputCity" name="username" value={this.state.addedCityName} onChange={(e) => this.setState({ addedCityName: e.target.value })}/>
                        <label htmlFor="inputCity">Название</label>
                    </span>
                    <Button style={{display: 'block'}} onClick={(e) => this.processIsAdded()} label="Добавить"/>
                </div>
                <DataTable styleClass="borderless" style={{display: this.state.progress ? 'none' : 'block'}}
                           value={this.state.cities} header="Города"
                           onRowToggle={(e) => this.setState({expandedRows: e.data})}
                           emptyMessage="Список городов пока пуст">
                    <Column expander={true} style={{width: '3em'}}/>
                    <Column field="cityname" header="Название"/>
                </DataTable>
            </div>
        );
    }
}

export default Cities