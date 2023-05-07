import {useEffect} from 'react';
import fetchGeoCodingResults from '../../../services/geoCoding.service';
import {View} from 'react-native';
import CustomList from '../Results';

const SelectResult = (props: {
  searchText: string;
  setSelect: (value: string) => void;
  selected: any;
  data: any;
  setData: (value: any) => void;
}) => {
  useEffect(() => {
    props.setData([]);
    const timeOutId = setTimeout(() => {
      if (props.searchText && props.searchText.length >= 3) {
        if (props.selected && props.searchText == props.selected.label) {
        } else {
          fetchGeoCodingResults(
            {adress: props.searchText},
            props.data,
            props.setData,
          );
        }
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [props.searchText]);

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        top: 130,
        zIndex: 2,
      }}>
      <CustomList
        data={props.data}
        setData={props.setData}
        setSelect={props.setSelect}
      />
    </View>
  );
};

export default SelectResult;
