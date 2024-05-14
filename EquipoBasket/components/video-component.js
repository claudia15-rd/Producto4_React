import React, {Component, useState, useEffect} from 'react'
import { Text,StyleSheet,View ,Button,TouchableOpacity } from 'react-native'
import { Video, ResizeMode} from 'expo-av'


export default function videoComponent(props) {
   /* return (
        <View>
            <Text> Pruebas Video </Text>
        </View>
    )*/

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View style={styles.container}>
        <Video
            ref={video}
            style={styles.video}
            source={{
            uri: props.route.params.playerVideo
            //'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        < View style={styles.buttons}>
            <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
            />
        </View>

        <TouchableOpacity style={styles.botonVolver} onPress={()=>{props.navigation.navigate('players', {})}}>
                    <Text style={styles.textoVolver}>Volver a lista de Jugadores</Text>
        </TouchableOpacity> 
        



    </View>
  );





}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      backgroundColor: '#ecf0f1',
    },
    video: {
      alignSelf: 'center',
      width: 360,
      height: 300,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    botonVolver: {
        backgroundColor: '#FFC300',
        borderColor: '#FFC300',
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textoVolver: {
        textAlign: 'center',
        padding: 10,
        color: 'black',
        fontSize: 16
    }




  });




