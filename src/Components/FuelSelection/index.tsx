import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GasType} from '../../Types';

const RadioButton = (props: {isSelected: boolean}) => {
  const {isSelected} = props;
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      {isSelected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#000',
          }}
        />
      ) : null}
    </View>
  );
};

const FuelSelection = (props: {
  isSelected: GasType | null;
  fuelName: GasType | undefined;
  setFuelName: (value: GasType) => void;
  imageName: ImageSourcePropType;
}) => {
  const {isSelected, fuelName, setFuelName, imageName} = props;

  return (
    <TouchableOpacity
      onPress={() => {
        setFuelName(fuelName as GasType);
      }}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Text>{fuelName}</Text>
      <Image
        source={imageName}
        style={{width: 50, height: 50, marginVertical: 10}}></Image>
      <RadioButton isSelected={isSelected == fuelName} />
    </TouchableOpacity>
  );
};

export default FuelSelection;
