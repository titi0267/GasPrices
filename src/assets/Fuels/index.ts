import {GasType} from '../../Types';

export const FuelAssociation = [
  {
    name: 'SP95-E10' as GasType,
    image: require('./SP95-E10.png'),
    apiName: 'e10',
  },
  {
    name: 'SP95-E5' as GasType,
    image: require('./SP95-E5.png'),
    apiName: 'sp95',
  },
  {
    name: 'SP98-E5' as GasType,
    image: require('./SP98-E5.png'),
    apiName: 'sp98',
  },
  {
    name: 'Gasoil' as GasType,
    image: require('./Gasoil.png'),
    apiName: 'gazole',
  },
  {
    name: 'GPL' as GasType,
    image: require('./GPL.png'),
    apiName: 'gplc',
  },
  {
    name: 'Ethanol' as GasType,
    image: require('./Ethanol.png'),
    apiName: 'e85',
  },
];
