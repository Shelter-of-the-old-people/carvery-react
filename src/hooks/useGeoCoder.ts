import { useState, useEffect } from 'react'

export interface IAddress {
  address: string
  state: string
  city: string
}

function extractAddressInfo(data) {
  return data.response.result.map(item => ({
    address: item.text,
    state: item.structure.level1,
    city: item.structure.level2
  }));
}
export const useGeoCoder = (lat?: number, lon?: number) => {
    const [address, setAddress] = useState<IAddress>();
    const [error, setError] = useState('');
    const geoURL = '/vworld-api/req/address?service=address&version=2.0&request=getaddress&format=json&type=both&zipcode=true&simple=true';

    useEffect(() => {
        if (lat === undefined || lon === undefined) return;
        const fetchLocation = async () => {
            try {
                if (lat !== undefined && lon !== undefined) {
                    const res = await fetch(`${geoURL}&key=EBFC36B2-17FB-3D53-9846-443BFF68A942&point=${lon},${lat}`);
                    const data = await res.json();
                    setAddress(extractAddressInfo(data));
                    setError('');
                }
            } catch (err) {
                setError('주소 정보를 불러오는데 실패했습니다.');
            }
        };
        fetchLocation();
    }, [lat, lon]);

    return { address, error };
};