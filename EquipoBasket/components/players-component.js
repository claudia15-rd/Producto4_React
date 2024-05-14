import React, {Component, useState, useEffect} from 'react'
import { Text,StyleSheet,View, ScrollView, TouchableOpacity} from 'react-native'
import { Platform } from 'react-native'

import appFirebase from '../credencialesFirebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'

import { ListItem, Avatar} from '@rneui/themed'
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron'
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content'
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title'
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle'

//Parte de la mensajeria 
import messaging from "@react-native-firebase/messaging";
import { StatusBar } from "expo-status-bar";


const db=getFirestore(appFirebase)



export default function playersComponent(props) {

    const [lista, setLista]=useState([]);

    //Lógica para llamar a la lista
    useEffect(() =>{
        const getLista = async()=> {
            try {
                const querySnapshot = await getDocs(collection(db,'players'))
                const docs=[]
                querySnapshot.forEach((doc)=>{
                    const {name, description, age, anillos, position, img,video} = doc.data()
                    docs.push({
                        id:doc.id,
                        name,
                        description,
                        age,
                        anillos,
                        position,
                        img,
                        video
                    })
                })
                setLista(docs);
            } catch (error) {
                console.log(error);
            }
        }
        getLista()
    }, [])

//[lista] Lo he comentado porque cada vez se va actualizando y ha hecho que excedamos firebase


//Aqui empieza para los mensajes


//Aquí vamos a empezar a esperar los mensajes.
const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled=
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled){
      console.log("Authorization  status: ", authStatus);
    }
  };

  useEffect(()=>{
    if (requestUserPermission()){
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    } else {
      console.log("Permission not granted", authStatus);
    }

    // Check wheter  an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app open from quit state:",
            remoteMessage.notification
          );
        }
      });

      // Assume a message-notification contains a "Type" property in data payload of de screen to open
      messaging().onNotificationOpenedApp((remoteMessage)=> {
        console.log(
          "Notification caused app to open from background state: ",
          remoteMessage.notification
        );
      });

      //REgister background handler
      messaging().setBackgroundMessageHandler( async (remoteMessage) =>{
        console.log("Message handle in background!",remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async (remoteMessage) =>{
        Alert.alert("A new FCM message arrived!",JSON.stringify(remoteMessage));
      });

      return unsubscribe;
    }, []);

    



    return (
        <ScrollView>
        {/*
            <View>
                <TouchableOpacity style={styless.boton} onPress={()=>props.navigation.navigate('addPlayers')} >
                    <Text style={styless.textoBoton}>Añadir Jugadores</Text>
                </TouchableOpacity>
    </View> */}

            <View style={styless.contenedor}>
                {lista.map((pla)=>(
                    <ListItem bottomDivider key={pla.id} onPress={()=>{props.navigation.navigate('details', {
                        playerId: pla.id
                    })}}>
                        <ListItemChevron />

                        <ListItemContent>
                            <ListItemTitle style={styless.titulo}>{pla.name}</ListItemTitle>
                            <ListItemSubtitle>{pla.position}</ListItemSubtitle>
                        </ListItemContent>
                    </ListItem>

                ))}
            </View>


        </ScrollView>
      
    )
}

const styless = StyleSheet.create({
    boton:{
        backgroundColor: '#F4D03F',
        borderColor: '#FC4F00' ,
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textoBoton: {
        textAlign: 'center',
        padding: 10,
        color: 'black',
        fontSize: 16
    },

    contenedor: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius: 4,
        elevation: 5
    },

    titulo: {
        fontWeight: 'bold'
    }

})