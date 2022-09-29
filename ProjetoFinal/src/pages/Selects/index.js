import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, TouchableOpacity, Text, Alert, FlatList, StyleSheet, Image, ScrollView } from "react-native";
import Toast from 'react-native-toast-message';
import {openDatabase} from 'react-native-sqlite-storage';
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";


export default function Selects({ navigation }) {

    const db = openDatabase({
        name: 'pj_cliente',
    });

    const [clientes,setClientes] = useState("");
    const [busca,setBusca] = useState("");

    const renderCliente = ({item})=>{
        return(
            <View>
                <View style={styles.card}>
                        <View style={styles.img}>
                            <Image source={require('../../images/ativo.png')} />
                        </View>
                        <Text style={styles.nome} onPress={()=>{navigation.navigate('Detalhe',{ 
      id: item.id, 
    })}}>{item.nome} {item.sobrenome}</Text>
                    </View>
            </View>
        )
    }

    const getClientes = ()=>{
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM clientes where status =true`,
                [],
                (sql,res)=> {
                    console.log("Dados selecionados com exito")
                    let len = res.rows.length;

                    if(len > 0){
                        let resultado = [];
                        for(let i = 0; i < len; i++){
                            let item = res.rows.item(i);
                            resultado.push({id: item.id, nome: item.nome, sobrenome: item.sobrenome})
                        }

                        setClientes(resultado);
                    }
                },
                error => {
                    console.log("Erro ao fazer select "+ error.message)
                }
            )
        })
    }

    const buscar = ()=>{
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM clientes where status =true and nome like'${busca}%'`,
                [],
                (sql,res)=> {
                    console.log("Dados selecionados com exito")
                    let len = res.rows.length;

                    if(len > 0){
                        let resultado = [];
                        for(let i = 0; i < len; i++){
                            let item = res.rows.item(i);
                            resultado.push({id: item.id, nome: item.nome, sobrenome: item.sobrenome})
                        }
                        setClientes(resultado);
                    }
                },
                error => {
                    console.log("Erro ao fazer select "+ error.message)
                }
            )
        })
    }

    useEffect(()=>{
        getClientes();
    },[])

    return (
            <ScrollView>
                <View style={styles.allhead}><Image style={styles.imag} source={require('../../images/sync.png')}/>
                <Text style={styles.atuali} onPress={getClientes}>Atualizar</Text></View>
            <View style={styles.all}>
                <View style={styles.header}>
                    <Text style={styles.title}>Clientes Ativos</Text>
                    <View style={styles.btnAdd}><Text style={styles.more} onPress={() => { navigation.navigate('Select') }}>+</Text></View>
                </View>

                <Text style={styles.subt}
                    onPress={() => { navigation.navigate('SelectInat') }}
                >Visualizar clientes inativos</Text>
                <View style={styles.buscr}>
                <TextInput
                    style={styles.busc}
                    placeholder="Buscar..."
                    onChangeText={setBusca} />

                    <View style={styles.btnBusc}><Text onPress={buscar} style={styles.textBusc}>Buscar</Text></View>
                </View>
                <View style={styles.cards}>
                <FlatList data={clientes} renderItem={renderCliente} key={cat => cat.id}/>
                </View>
            </View>
            </ScrollView>
    );
}


const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        width: 200,
        fontSize: 40,
        color: "#434343",
        fontWeight: "bold"
    },

    all: {
        paddingLeft: 50,
        paddingTop: 50,
    },

    btnAdd: {
        backgroundColor: "#4C0677",
        width: 100,
        height: 100,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    more: {
        fontSize: 50,
        color: "white",
        fontWeight: "bold"
    },

    subt: {
        fontSize: 20,
        color: "#4C0677",
        marginTop: 30
    },

    busc: {
        width: 220,
        height: 50,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        fontSize: 20,
        color: "#4C0677",
        fontWeight: "bold",
        borderWidth: 2,
        borderColor: '#4C0677'
    },

    card: {
        width: 320,
        display: "flex",
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: "#C7C7C7"
    },

    img: {
        backgroundColor: "#4C0677",
        padding: 20,
        borderRadius: 15
    },

    nome: {
        color: "#434343",
        fontSize: 25,
        fontWeight: "bold",
        marginRight: 20,
        width: 150
    },

    cards: {
        display: "flex",
        flexDirection: "column",
        marginTop:20,
        paddingBottom: 30
    },

    allhead:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },

    atuali:{
        color: '#4C0677',
        fontSize: 25,
        fontWeight: 'bold'
    },

    imag:{
        width: 30,
        height: 30
    },

    buscr:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },

    btnBusc:{
        backgroundColor: '#4C0677',
        color: 'white',
        height: 50,
        width: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBusc:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});