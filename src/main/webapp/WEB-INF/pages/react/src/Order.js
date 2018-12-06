import React, { Component } from 'react'
import { DataTable, Column } from 'primereact/datatable'
import { ProgressSpinner } from 'primereact/progressspinner'
import axios from 'axios';

class Order extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            progress: true,
            visible: false,
            expandedRows: []
        };
        this.priceTemplate = this.priceTemplate.bind(this);
        this.dateTemplate = this.dateTemplate.bind(this);
        this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/user').then(res => {
            if (res.data) {
                axios.get('http://localhost:8080/api/orders?id=3').then(res => {
                    this.setState({ orders: res.data })
                    let ors = this.state.orders;
                    ors.forEach((o, i) => {
                        axios.get(`http://localhost:8080/api/orderBooks?id=${o.id}`).then(res => {
                            o.books = res.data;
                            if (ors.length === i + 1) {
                                this.setState({ orders: ors })
                                this.setState({ progress: false })
                            }
                        })
                    })
                })
            }
            else {
                fetch('http://localhost:8080/order').then(this.props.history.push('/login'));
            }
        })
    }

    priceTemplate(rowData, column) {
        const price = rowData.price;
        return price + ' ' + '₽';
    }

    dateTemplate(rowData, column) {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        const date = (new Date(rowData.date)).toLocaleDateString('ru', options);
        return date;
    }

    rowExpansionTemplate(data) {
        return (
            <ul style={{ textAlign: 'left' }}>
                {data.books.map(b =>
                    <li key={b.book.id}>{b.book.authors[0].name[0] + '. ' + b.book.authors[0].lastname[0] + '. ' + b.book.authors[0].surname + ' - ' +
                        b.book.title + ' - ' + ` ${b.book.price}₽ x ` + b.count + 'шт.'}
                    </li>)}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <ProgressSpinner style={{ display: this.state.progress ? 'block' : 'none' }} />
                <DataTable styleClass="borderless" style={{ display: this.state.progress ? 'none' : 'block' }}
                    value={this.state.orders} header="Вот все ваши заказы"
                    expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({ expandedRows: e.data })}
                    rowExpansionTemplate={this.rowExpansionTemplate}
                    emptyMessage="Заказов нет :(">
                    <Column expander={true} style={{ width: '3em' }} />
                    <Column field="id" header="Номер заказа" />
                    <Column body={this.dateTemplate} header="Дата заказа" />
                    <Column field="adress" header="Адрес доставки" />
                    <Column body={this.priceTemplate} header="Общая стоимость" />
                    <Column field="state" header="Текущий статус" />
                </DataTable>
            </div>
        );
    }
}

export default Order