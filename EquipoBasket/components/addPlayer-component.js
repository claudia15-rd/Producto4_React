import { set } from 'firebase/database';
import React, {Component, useState, useEffect} from 'react'
import { Text,StyleSheet,View, TextInput, TouchableOpacity, Alert} from 'react-native'
import { Platform } from 'react-native'

import appFirebase from '../credencialesFirebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
const db=getFirestore(appFirebase)

export default function addPlayerComponent(props) {

    const initalPlayer = {
        name:'',
        description: '',
        age: '',
        anillos: '',
        position: '',
        num: '',
        img: '',
        video: ''
    }

    const [jugador, setJugador]=useState(initalPlayer);

    const handleChangeText= (value,name) => {
        setJugador({...jugador, [name]:value})
    }

    const savePlayer = async () => {
        try {
            if (jugador.name === '' || jugador.description==='' || jugador.age==='' || jugador.anillos==='' || jugador.position===''  ||jugador.img==='' || jugador.video==='')
            {
                Alert.alert('Tienes que rellenar todos los campos')
            }
            else 
            {
                
                const play = {
                    name: jugador.name,
                    description: jugador.description,
                    age: jugador.age,
                    anillos: jugador.anillos,
                    position: jugador.position,
                    img: jugador.img,
                    video: jugador.video
                }
                console.log(play)
                await addDoc(collection(db,'players'), {
                    ...play
                })
                Alert.alert('Se ha guardado correctamente')
                props.navigation.navigate('players')
            }
        } catch (error){
            console.log(error)

        }




        
       // console.log(play);
    }






    return (
        <View style={styless.contenedorPadre}>
            <View style={styless.tarjeta}>
               {/* Datos que subiremos */}
                <View style={styless.contenedor}>
                    <TextInput placeholder='Nombre Jugador:' 
                    style={styless.textoInput} 
                    value={jugador.name}
                    onChangeText={(value)=>handleChangeText(value, 'name')}
                    />
                </View>
                <View style={styless.contenedor}>
                    <TextInput placeholder='Descripción del Jugador:' 
                    style={styless.textoInput} 
                    value={jugador.description}
                    onChangeText={(value)=>handleChangeText(value, 'description')}
                    />
                </View>
                <View style={styless.contenedor}>
                    <TextInput placeholder='Edad del Jugador:'
                    style={styless.textoInput} 
                    value={jugador.age}
                    onChangeText={(value)=>handleChangeText(value, 'age')}
                    />
                </View>
                <View style={styless.contenedor}>
                    <TextInput placeholder='Número de anillos:' 
                    style={styless.textoInput} 
                    value={jugador.anillos}
                    onChangeText={(value)=>handleChangeText(value, 'anillos')}
                    />
                </View>
                <View style={styless.contenedor}>
                    <TextInput placeholder='Posición en el campo del Jugador:' 
                    style={styless.textoInput} 
                    value={jugador.position}
                    onChangeText={(value)=>handleChangeText(value, 'position')}
                    />
                </View>
                <View style={styless.contenedor}>
                    <TextInput placeholder='Imagen del Jugador:' 
                    style={styless.textoInput} 
                    value={jugador.img}
                    onChangeText={(value)=>handleChangeText(value, 'img')}
                    />
                </View>
                <View style={styless.contenedor}>
                    <TextInput placeholder='Video del Jugador:' 
                    style={styless.textoInput} 
                    value={jugador.video}
                    onChangeText={(value)=>handleChangeText(value, 'video')}
                    />
                </View>

                {/*Botón para enviar */}
                <View>
                    <TouchableOpacity style={styless.botonGuardar} onPress={savePlayer} >
                        <Text style={styless.textoBotonGuardar}>
                            Guardar Jugador
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )
}

const styless = StyleSheet.create({
    contenedorPadre: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tarjeta:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    contenedor: {
        padding:5
    },
    textoInput:{
        borderColor: 'slategray',
        borderWidth: 1,
        paddin: 2,
        marginTop: 10,
        borderRadius: 8
    },
    botonGuardar:{
        backgroundColor: '#F4D03F',
        borderColor: '#FC4F00',
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textoBotonGuardar:{
        textAlign: 'center',
        padding: 10,
        color: 'black',
        fontSize: 16
    },
})