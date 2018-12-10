import React, {Component} from 'react'
import {Button} from 'primereact/button'
import {Panel} from 'primereact/panel'
import {Dropdown} from 'primereact/dropdown'
import {DataView, DataViewDoc, DataViewLayoutOptions} from 'primereact/dataview'
import {Dialog} from 'primereact/dialog'
import {InputText} from 'primereact/inputtext'
import {ProgressSpinner} from 'primereact/progressspinner'
import {Growl} from 'primereact/growl';
import axios from 'axios';

class Books extends Component {
    constructor() {
        super();
        this.state = {
            cars: [],
            layout: 'list',
            selectedCar: null,
            visible: false,
            sortKey: null,
            sortOrder: null,
            globalFilter: '',
            shownBooks: null,
            progress: true,
            tooltip: null,
        };
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.filterBooks = this.filterBooks.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        // this.setState({ shownBooks: this.state.cars })
        // axios.get('https://www.primefaces.org/primereact/showcase/resources/demo/data/cars-small.json')
        //     .then(res => {
        //         this.setState({ cars: res.data.data })
        //     })
        axios.get('http://localhost:8080/api/user').then(res => {
            if (!res.data) {
                this.setState({tooltip: 'Неплохо бы авторизоваться'})
            }
            axios.get('http://localhost:8080/api/books').then(res => {
                this.setState({shownBooks: res.data})
                this.setState({cars: res.data})
                this.setState({progress: false})
            })
        })
    }

    addToCart(book) {
        axios.get(`http://localhost:8080/api/addToCart?book_id=${book.id}&user_id=3`)
        this.growl.show({severity: 'success', summary: 'Успешно', detail: 'Добавлено в корзину!'})
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1,
                sortField: value.substring(1, value.length),
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1,
                sortField: value,
                sortKey: value
            });
        }
    }

    renderListItem(car) {
        const author = car ? `${car.authors[0].surname} ${car.authors[0].name} ${car.authors[0].lastname}` : '';
        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                <div class="p-grid">
                    <div className="p-col-12 p-md-3">
                        <img src={`data:image/jpeg;base64,${car.image}`} style={{height: 'auto', width: '70%'}}/>
                    </div>
                    <div className="p-col-12 p-md-7 p-grid p-dir-col" style={{fontSize: '16px'}}>
                        <div className="p-col">Названиие: <b>{car.title}</b></div>
                        <div className="p-col">Автор: <b>{author}</b></div>
                        <div className="p-col">Цена: <b>{car.price} &#8381;</b></div>
                    </div>

                    <div className="p-col-12 p-md-2" style={{marginTop: '40px'}}>
                        <div className="p-inputgroup">
                            <Button disabled={this.state.tooltip !== null} className="p-button-success"
                                    label="Добавить в корзину" onClick={(e) => this.addToCart(car)}
                                    tooltipOptions={{position: 'left'}} tooltip={this.state.tooltip}/>
                            <Button icon="pi pi-search"
                                    onClick={(e) => this.setState({selectedCar: car, visible: true})}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderGridItem(car) {
        const author = car ? `${car.authors[0].surname} ${car.authors[0].name.substring(0, 1)}. ${car.authors[0].lastname.substring(0, 1)}.` : '';
        return (
            <div style={{padding: '.5em'}} className="p-col-12 p-md-3">
                <Panel header={`${car.title} - ${author}`} style={{textAlign: 'center'}}>
                    <img src={`data:image/jpeg;base64,${car.image}`} style={{height: 'auto', width: '70%'}}/>
                    <div className="car-detail"><b>Цена: {car.price} &#8381;</b></div>
                    <hr className="ui-widget-content" style={{borderTop: 0}}/>
                    <div className="p-inputgroup p-justify-center">
                        <Button disabled={this.state.tooltip !== null} className="p-button-success"
                                label="Добавить в корзину" onClick={(e) => this.addToCart(car)}
                                tooltipOptions={{position: 'left'}} tooltip={this.state.tooltip}/>
                        <Button icon="pi pi-search"
                                onClick={(e) => this.setState({selectedCar: car, visible: true})}></Button>
                    </div>
                </Panel>
            </div>
        );
    }

    filterBooks(query) {
        if (!query || query.trim() == '') {
            this.setState({shownBooks: this.state.cars})
        } else {
            const crs = this.state.cars.filter(c => `${c.id}`.includes(query.toLowerCase())
                || c.title.toLowerCase().includes(query.toLowerCase()));
            this.setState({shownBooks: crs})
        }
    }

    itemTemplate(car, layout) {
        if (!car) {
            return null;
        }

        if (layout === 'list')
            return this.renderListItem(car);
        else if (layout === 'grid')
            return this.renderGridItem(car);
    }

    renderCarDialogContent() {
        if (this.state.selectedCar) {
            const car = this.state.selectedCar
            const author = `${car.authors[0].surname} ${car.authors[0].name} ${car.authors[0].lastname}`;
            return (
                <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-col-12" style={{textAlign: 'center'}}>
                        <img src={`data:image/jpeg;base64,${this.state.selectedCar.image}`}
                             style={{width: '100%', height: 'auto'}}/>
                    </div>

                    <div className="p-col-4">Название:</div>
                    <div className="p-col-8">{this.state.selectedCar.title}</div>

                    <div className="p-col-4">Автор:</div>
                    <div className="p-col-8">{author}</div>

                    <div className="p-col-4">Цена:</div>
                    <div className="p-col-8">{this.state.selectedCar.price} &#8381;</div>
                </div>
            );
        }
        else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'По названию', value: 'title'},
            {label: 'Дешевле', value: 'price'},
            {label: 'Дороже', value: '!price'}
        ];

        return (
            <div className="p-grid p-align-center">
                <div className="p-col-7" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Сортировать по"
                              onChange={this.onSortChange} style={{minWidth: '150px'}}/>
                </div>
                <div className="p-col-5 p-grid p-align-center p-justify-end" style={{marginTop: '0'}}>
                    <InputText type="search" onInput={(e) => this.filterBooks(e.target.value)} placeholder="Поиск"/>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})}
                                           style={{paddingLeft: '10px'}}/>
                </div>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div>
                <Growl ref={(el) => this.growl = el}/>
                {/* <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Книги</h1>
                        <p>Очень много книжок...</p>
                    </div>
                </div> */}

                <div className="content-section implementation">
                    <ProgressSpinner style={{display: this.state.progress ? 'block' : 'none'}}/>
                    <DataView style={{display: this.state.progress ? 'none' : 'block'}} value={this.state.shownBooks}
                              layout={this.state.layout} header={header}
                              itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={4}
                              sortOrder={this.state.sortOrder} sortField={this.state.sortField}
                              emptyMessage="Книжек нет :("/>

                    <Dialog header="Подробненько..." visible={this.state.visible} width="400px" modal={true}
                            onHide={() => this.setState({visible: false})}>
                        {this.renderCarDialogContent()}
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default Books