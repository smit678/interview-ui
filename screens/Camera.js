import { StyleSheet, Text, View , Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './Button';

const Camera = ({ route, navigation }) => {

    
 
// const [hasCameraPermission ,setHasCameraPermission] = useState();
const [permission, requestPermission] = useCameraPermissions();
const [image, setImage] = useState(null);
const [type, setType] = useState(CameraView.CameraType ='back');
const cameraRef = useRef(null);

useEffect(()=>{
    async ()=>{
        MediaLibrary.requestPermissionsAsync();
        if (!permission) {
          
            // Camera permissions are still loading.
            return <View />;
          }
        
          if (!permission.granted) {
            // Camera permissions are not granted yet.
            return (
              <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
              </View>
            );
          } 
    }
},[])


   const takePicture = async ()=>{
    if(cameraRef){
        try {
           const data = await cameraRef.current.takePictureAsync();
           setImage(data.uri);
           console.log(data);
           

        } catch (error) {
            console.log(e);
            
        }
    }
   }
/// code for save image ////

   const saveImage = async ()=>{

    if(image){
        try {
           
            await MediaLibrary.createAssetAsync(image);
            alert('save Image')
            navigation.navigate('Personalinfo',{image})
            setImage(null)
        } catch (error) {
            console.log(e);
            
        }
    }
   }

/// function for switch camera fron or back    
   function toggleCameraFacing() {
    setType(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
        {!image ?
    <CameraView style={styles.camera} facing={type} ref={cameraRef}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
      }}>
        <Button icon={'retweet'} onPress={toggleCameraFacing}/>
        <Button icon={'flash'}/>
      </View>
    </CameraView>
    :<Image source={{uri:image}} style={styles.camera}/> }
    <View >
        {image ? 
        <View style={{flexDirection: 'row'
                     ,justifyContent:"space-between",
                      paddingHorizontal: 50,}}>
        <Button title={'re-Take'} icon="retweet" onPress={()=> setImage(null) }/>
        <Button title={'Save'} icon="check" onPress={saveImage}/>
        </View>
        :
        <Button title={' Take a picture'} icon="camera" onPress={takePicture}/>
        }
      </View>
  </View>
  )
}

export default Camera

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
      },
      camera: {
        width: '100%',
        flex: 1,
      },
    //   buttonContainer: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     backgroundColor: 'transparent',
    //     margin: 64,
    //   },
    //   button: {
    //     flex: 1,
    //     alignSelf: 'flex-end',
    //     alignItems: 'center',
    //   },
})