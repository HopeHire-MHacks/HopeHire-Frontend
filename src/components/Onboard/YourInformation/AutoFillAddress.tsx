import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import AllCountriesSelect from '@components/Onboard/YourInformation/AllCountriesSelect';
import { Loader } from '@googlemaps/js-api-loader';
import { ToasterType, toasterAtom } from '@/utils/atoms/toaster';
import { useRecoilState } from 'recoil';

const gMaps = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API || '',
  version: 'weekly',
  libraries: ['places'],
});

interface AutoFillAddressProps {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  onSetAddress: (address: string) => void;
  onSetCity: (city: string) => void;
  onSetState: (state: string) => void;
  onSetPostalCode: (postalCode: string) => void;
  onSetCountry: (country: string) => void;
  onSetLatLong: (lat: number, long: number) => void;
}

const AutoFillAddress = ({
  address,
  city,
  state,
  postalCode,
  country,
  onSetAddress,
  onSetCity,
  onSetState,
  onSetPostalCode,
  onSetCountry,
  onSetLatLong,
}: AutoFillAddressProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToaster] = useRecoilState(toasterAtom);
  let autocomplete: google.maps.places.Autocomplete;
  let addressField: HTMLInputElement;
  let postalField: HTMLInputElement;

  const initMap = async () => {
    try {
      const googleMaps = await gMaps.load();

      addressField = document.querySelector('#address') as HTMLInputElement;
      postalField = document.querySelector('#postal-code') as HTMLInputElement;

      // Create the autocomplete object, restricting the search predictions to
      // addresses in the US and Canada.
      autocomplete = new googleMaps.maps.places.Autocomplete(addressField, {
        fields: ['address_components', 'geometry'],
        types: ['address'],
      });

      // When the user selects an address from the drop-down, populate the
      // address fields in the form.
      autocomplete.addListener('place_changed', fillInAddress);
    } catch (error) {
      setToaster({ isShown: true, type: ToasterType.ERROR, message: 'Error loading maps', title: 'Error' });
      console.log(error);
    }
  };

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
    onSetLatLong(place.geometry?.location?.lat() || 0, place.geometry?.location?.lng() || 0);
    let address = '';
    let postcode = '';

    addressField.value = address;
    postalField.value = postcode;
    (document.querySelector('#city') as HTMLInputElement).value = '';
    (document.querySelector('#region') as HTMLInputElement).value = '';
    (document.querySelector('#country') as HTMLInputElement).value = '';

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      const componentType = component.types[0];
      switch (componentType) {
        case 'street_number': {
          address = `${component.long_name} ${address}`;
          break;
        }
        case 'route': {
          address += component.short_name;
          break;
        }
        case 'postal_code': {
          postcode = `${component.long_name}${postcode}`;
          break;
        }
        case 'postal_code_suffix': {
          postcode = `${postcode}-${component.long_name}`;
          break;
        }
        case 'locality': {
          (document.querySelector('#city') as HTMLInputElement).value = component.long_name;
          onSetCity(component.long_name);
          break;
        }
        case 'administrative_area_level_1': {
          (document.querySelector('#region') as HTMLInputElement).value = component.long_name;
          onSetCity(component.long_name);
          break;
        }
        case 'country':
          (document.querySelector('#country') as HTMLInputElement).value = component.long_name;
          onSetCountry(component.long_name);
          break;
      }
    }

    addressField.value = address;
    postalField.value = postcode;
    onSetAddress(address);
    onSetPostalCode(postcode);
  }

  useEffect(() => {
    initMap();
  }, []);

  return (
    <>
      <div className='col-span-6 sm:col-span-4'>
        <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
          Country
        </label>
        <AllCountriesSelect country={country} onSetCountry={onSetCountry} />
      </div>

      <div className='col-span-6'>
        <label htmlFor='street-address' className='block text-sm font-medium text-gray-700'>
          Street address
        </label>
        <input
          value={address}
          onChange={e => onSetAddress(e.target.value)}
          id='address'
          type='text'
          name='street-address'
          autoComplete={uuid()}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>

      <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
        <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
          City
        </label>
        <input
          value={city}
          onChange={e => onSetCity(e.target.value)}
          type='text'
          name='city'
          id='city'
          autoComplete={uuid()}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>

      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
        <label htmlFor='region' className='block text-sm font-medium text-gray-700'>
          State / Province
        </label>
        <input
          value={state}
          onChange={e => onSetState(e.target.value)}
          type='text'
          name='region'
          id='region'
          autoComplete={uuid()}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>

      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
        <label htmlFor='postal-code' className='block text-sm font-medium text-gray-700'>
          ZIP / Postal code
        </label>
        <input
          value={postalCode}
          onChange={e => onSetPostalCode(e.target.value)}
          type='text'
          name='postal-code'
          id='postal-code'
          autoComplete={uuid()}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>
    </>
  );
};

export default AutoFillAddress;
