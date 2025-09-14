import React, { useState } from 'react';
import { View, Text, Alert, Pressable, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

const FileUploader: React.FC<{ allowedTypes: string[], maxSizeMB: number , buttonText : string, buttonContainer?:ViewStyle,  pressableStyle?:ViewStyle, pressableTextStyle?:TextStyle  }> = ({ allowedTypes, maxSizeMB ,buttonText ,buttonContainer , pressableStyle, pressableTextStyle}) => {
  const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: allowedTypes,
      });

      if (res.size && res.size > maxSizeMB * 1024 * 1024) {
        Alert.alert('File too large', `File size should not exceed ${maxSizeMB}MB`);
        return;
      }

      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  return (
    <View style={[buttonContainer]}>
      <Pressable style={pressableStyle} onPress={pickFile} >
        <Text style={pressableTextStyle}>{buttonText}</Text>
      </Pressable>
      {
      //selectedFile && (
      //  <Text style={{ marginTop: 10 }}>
      //    Selected File: {selectedFile.name} ({(selectedFile.size || 0) / 1024 / 1024} MB)
      //  </Text>
      // )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  label:{
    color:'#36455A',
  }
})

export default FileUploader;
