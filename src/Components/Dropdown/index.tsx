import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const renderItems = (
  item: ListRenderItemInfo<string>,
  isLoading: boolean,
  onPress: (item: string) => void,
) => {
  return isLoading ? (
    <ActivityIndicator size={40}></ActivityIndicator>
  ) : (
    <TouchableOpacity
      style={flatlistStyles.itemContainer}
      onPress={() => {
        onPress(item.item);
      }}>
      <Text style={flatlistStyles.item}>{item.item}</Text>
    </TouchableOpacity>
  );
};

const CustomDropdown = (props: {
  data: string[];
  isLoading: boolean;
  onPress: (item: string) => void;
  onChangeText: (value: string) => void;
}) => {
  const {data, isLoading, onPress} = props;

  return (
    <View style={flatlistStyles.dropdownContainer}>
      {data.length != 0 ? (
        <FlatList
          style={flatlistStyles.container}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
          data={data}
          renderItem={item => renderItems(item, isLoading, onPress)}
          ItemSeparatorComponent={() => (
            <View style={flatlistStyles.separator} />
          )}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const flatlistStyles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: 'black',
  },
  itemContainer: {
    height: 35,
    width: '100%',
    paddingLeft: 10,
  },
  item: {
    fontSize: 25,
    color: 'black',
  },
  separator: {
    alignSelf: 'center',
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 2,
  },
});

export default CustomDropdown;
