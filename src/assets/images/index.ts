import { ImageSourcePropType } from 'react-native';

interface ImagesType{
    logo : ImageSourcePropType
}

const Images: ImagesType = {
  logo: require('./logo.png'),
};

export default Images;
