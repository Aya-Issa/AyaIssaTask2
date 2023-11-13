import React from 'react';
import { View, Button, Image, Platform, ToastAndroid } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

export default function PhotoCaptureScreen() {
  const [imageUri, setImageUri] = React.useState(null);

  const handleCapturePhoto = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      const uri = image.path;
      setImageUri(uri);

      const destinationPath = '/storage/emulated/0/Pictures/'; 

      const success = await RNFS.moveFile(uri, destinationPath + image.modificationDate + '.jpg');

      if (success) {
        ToastAndroid.show('Image saved to specified location', ToastAndroid.LONG);
      } else {
        
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };

  return (
    <View>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Capture Photo" onPress={handleCapturePhoto} />
    </View>
  );
}
