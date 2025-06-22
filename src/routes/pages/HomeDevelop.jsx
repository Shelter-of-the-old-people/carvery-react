import React, { useEffect, useState } from 'react';
import Weather from '../../components/Weather';
import OneLineCardSet from '../../components/OneLineCardSet';
import TwoLineCardSet from '../../components/TwoLineCardSet';
import CarSupplies from '../../components/CarSupplies';
import Gnb from '../../components/Gnb';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Weather.css';
import '../../styles/Home.css';
import '../../styles/Gnb.css'
import '../../styles/facilityCard.css';
import { useGeoLocation} from '../../hooks/useGeoLocation';
import { useGeoCoder} from '../../hooks/useGeoCoder';

  const mockMenus =
  [
    {title: "날씨", targetId: "weather"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"},
    {title: "차량용품", targetId: "supplies"}
  ];

const HomeDevelop = () => {
  const { location } = useGeoLocation();
  
  const {apiAddressObj} = useGeoCoder(location?.latitude, location?.longitude);

  const [apiAddress, setApiAddress] = useState(false);
  
  useEffect(() => {
  if (apiAddressObj) {
      setApiAddress(apiAddressObj.address[0].unitAddress);
    }
  }, [apiAddressObj]);

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span  id="weather">
        <Weather />
      </span>
      <span  id="carwash">
        <OneLineCardSet title={"세차장"} lat={location?.latitude} lng={location?.longitude} address = {apiAddress}/>
      </span>
      <span  id="setting">
        <OneLineCardSet title={"정비소"}/>
      </span>
      <span  id="supplies">
        <CarSupplies/>
      </span>
    </div>
  );
};

export default HomeDevelop;