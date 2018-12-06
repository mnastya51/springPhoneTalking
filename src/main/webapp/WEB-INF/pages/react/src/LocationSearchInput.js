import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
        <PlacesAutocomplete
            value={this.state.address}
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
    );
  }
}
export default LocationSearchInput