import {useEffect} from 'react';
import fetchGasStationList from '../../../../services/gasStations.service';

const GasStations = async (props: {
  departmentCodes: string[];
  setGasStations: (value: any[]) => void;
  gasStations: any[];
}) => {
  const myData: string[] = [];

  if (props.departmentCodes) {
    for (let i = 0; i < props.departmentCodes.length; i++) {
      const res = await fetchGasStationList({
        code_department: props.departmentCodes[i].toString(),
      });
      if (!res.ok) {
        continue;
      }
      try {
        const dataResult = await res.json();
        if (!myData.includes(dataResult)) {
          myData.push(dataResult);
        }
      } catch (e) {}
    }
    props.setGasStations(myData);
  }
};

export default GasStations;
