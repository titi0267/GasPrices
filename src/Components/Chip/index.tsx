import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

const CustomChip = (props: {
  text: string;
  isChipSelected: boolean;
  resetChip: (chipType: string) => void;
}) => {
  const {text, isChipSelected, resetChip} = props;
  return (
    <Chip
      selectedColor="#000000"
      textStyle={styles(isChipSelected).chipText}
      style={styles(isChipSelected).chip}
      onPress={() => resetChip(text)}>
      {text}
    </Chip>
  );
};

const styles = (isChipSelected?: boolean) =>
  StyleSheet.create({
    chipText: {
      marginLeft: 'auto',
      marginRight: 'auto',
      color: isChipSelected ? '#fff' : '#000000',
      fontSize: 17,
    },
    chip: {
      backgroundColor: isChipSelected ? '#00A19B' : '#C8CCCE40',
      borderColor: '#565F64',
      borderWidth: 1.5,
      height: 50,
      marginRight: 5,
      width: '45%',
      textDecorationColor: isChipSelected ? '#fff' : '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CustomChip;
