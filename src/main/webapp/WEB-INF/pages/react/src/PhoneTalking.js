import React, {Component} from 'react'
import {Column, DataTable} from 'primereact/datatable'
import {ProgressSpinner} from 'primereact/progressspinner'
import {Button} from 'primereact/button'
import axios from 'axios';
import {Dialog} from 'primereact/dialog'
import {InputText} from 'primereact/inputtext'
import PlacesAutocomplete from 'react-places-autocomplete';

class PhoneTalking extends Component {
    constructor() {
        super();

    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/user').then(res => {
            if (res.data) {
                axios.get('http://localhost:8080/api/cart?id=3').then(res => {
                    this.setState({ cart: res.data })
                    axios.get('http://localhost:8080/api/user?id=3').then(res => {
                        this.setState({ name: res.data.name.trim() })
                        this.setState({ adress: res.data.adress.trim() })
                        this.setState({ surname: res.data.surname.trim() })
                        this.setState({ progress: false })
                    })
                })
            }
            else {
                fetch('http://localhost:8080/cart').then(this.props.history.push('/login'));
            }
        })

    }

    render() {
        const footer = (
            <div>
                <Button label="Ага" icon="pi pi-check" onClick={this.onDelete} />
                <Button label="Не" icon="pi pi-times" onClick={(e) => this.setState({ visible: false })} className="p-button-secondary" />
            </div>
        );
        const confirmFooter = (
            <div>
                <Button label="Да, все верно" icon="pi pi-check" onClick={this.onConFirm} />
                <Button label="Я просто смотрю" icon="pi pi-times" onClick={(e) => this.setState({ confirm: false })} className="p-button-secondary" />
            </div>
        );
        return (
            <div>
                <ProgressSpinner style={{ display: this.state.progress ? 'block' : 'none' }} />
                <DataTable styleClass="borderless" style={{ display: this.state.progress ? 'none' : 'block' }}
                           value={this.state.cart} header="Вот все книги из вашей корзины" footer={this.displaySelection(this.state.selectedBooks)}
                           selection={this.state.selectedBooks} onSelectionChange={e => this.setState({ selectedBooks: e.data })}
                           emptyMessage="Корзина пуста :(">
                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                    <Column field="book.title" header="Название" />
                    <Column body={this.authorTemplate} header="Автор" />
                    <Column field="book.price" header="Стоимость" />
                    <Column field="count" header="Количество" />
                </DataTable>
                <Dialog header="Вопросик" footer={footer} visible={this.state.visible} width="350px" modal={true} onHide={(e) => this.setState({ visible: false })}>
                    Вы точно хотите удалить все выбранные книги из вашей корзины?
                </Dialog>
                <Dialog header="Заказываем" footer={confirmFooter} visible={this.state.confirm} width="500px" modal={true} onHide={(e) => this.setState({ confirm: false })}>

                    <div class="p-grid p-justify-between p-dir-col" style={{ marginBottom: '160px', minHeight: '200px', position: 'relative' }}>
                        <h6>Проверьте правильность данных получателя и адрес доставки:</h6>
                        <span className="p-float-label">
                            <InputText style={{ width: '100%' }} id="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                            <label htmlFor="name">Имя</label>
                        </span>
                        <span className="p-float-label">
                            <InputText style={{ width: '100%' }} id="surname" value={this.state.surname} onChange={(e) => this.setState({ surname: e.target.value })} />
                            <label htmlFor="surname">Фамилия</label>
                        </span>

                        <PlacesAutocomplete
                            value={this.state.adress}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className=''>
                                    <span className='p-autocomplete p-component' style={{ width: '100%' }}>
                                        <input class="p-inputtext p-component" style={{ width: '100%' }}
                                               {...getInputProps({
                                                   placeholder: 'Адрес',
                                                   className: 'location-search-input p-inputtext p-component',
                                               })}
                                        />
                                        <i class="p-autocomplete-loader pi pi-spinner pi-spin" style={{ display: loading ? 'block' : 'none' }}></i>
                                    </span>
                                    <div className='autocomplete-dropdown-container' style={{ position: 'absolute', width: '100%' }}>
                                        {suggestions.map(suggestion => {
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#4c4c4c', cursor: 'pointer', fontSize: '14px', color: '#dedede' }
                                                : { backgroundColor: '#323232', cursor: 'pointer', fontSize: '14px', color: '#dedede' };
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>

                    </div>
                </Dialog>
            </div>
        );
    }
}

export default PhoneTalking