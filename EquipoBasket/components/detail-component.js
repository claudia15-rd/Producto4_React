import React, {Component, useState, useEffect} from 'react'
import { Text,StyleSheet,View, TextInput, TouchableOpacity, Alert,Image} from 'react-native'

import appFirebase from '../credencialesFirebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
const db=getFirestore(appFirebase)



export default function detailComponent(props) {
    
    const [player, setPlayer]=useState({})

    const getPlayer = async(id) =>{
        try 
        {
            const docRef= doc(db,'players', id)
            const docSnap= await getDoc(docRef)
            setPlayer(docSnap.data())

        }
        catch (error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getPlayer(props.route.params.playerId)
    },[])

    const deletePlayer= async(id) =>  {
        await deleteDoc(doc(db,'players',id))
        Alert.alert('Jugador Eliminado')
        props.navigation.navigate('players')
    }




    return (
        <View>
            <View style={styles.contenedor}>
                <Text style={styles.texto}>Nombre: {player.name}</Text>
                <Image source={{uri: player.img}}
                  style={{width: 130 , height: 130}} />
                <Text style={styles.texto}>Descripción: {player.description}</Text>
                <Text style={styles.texto}>Edad: {player.age}</Text>
                <Text style={styles.texto}>Número de anillos:  {player.anillos}</Text>
                <Text style={styles.texto}>Posicion: {player.position}</Text>

                <TouchableOpacity style={styles.botonEliminar} onPress={()=>{props.navigation.navigate('video', {
                    playerVideo:player.video
                    })}} >
                    <Text style={styles.textoEliminar}>Ver video</Text>
                </TouchableOpacity> 

                            
             {/*   <Text style={styles.texto}>Imagen: {player.img}</Text> 
                <Text style={styles.texto}>Video: {player.video}</Text>

                <TouchableOpacity style={styles.botonEliminar} onPress={()=>deletePlayer(props.route.params.playerId)} >
                    <Text style={styles.textoEliminar}>Elimiar Jugador</Text>
                </TouchableOpacity> */}


            </View>
        </View>
        
    )
}

const styles=StyleSheet.create({
    contenedor: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height:2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    texto: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10
    },
    botonEliminar: {
        backgroundColor: '#FFC300',
        borderColor: '#FFC300',
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textoEliminar: {
        textAlign: 'center',
        padding: 10,
        color: 'black',
        fontSize: 16
    }




})