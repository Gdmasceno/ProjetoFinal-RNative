import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, TouchableOpacity, Text, Alert, FlatList, StyleSheet, Image, ScrollView } from "react-native";
import Toast from 'react-native-toast-message';
import uuid from "react-native-uuid";
import {openDatabase} from 'react-native-sqlite-storage';


const db = openDatabase({
    name: 'pj_cliente',
});
export default function Detalhe({ navigation,route }) {

    const [clientes,setClientes] = useState("");

    const inativar = ()=>{
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE clientes SET status=false WHERE id = ${route.params.id}`,
                [],
                (sql,res)=> {
                    console.log("INATIVADO!")
                    navigation.navigate('Selects')
                },
                error => {
                    console.log("Erro ao fazer select "+ error.message)
                }
            )
        })
    }



    const getClientes = ()=>{
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM clientes WHERE id = ${route.params.id}`,
                [],
                (sql,res)=> {
                    console.log("Dados selecionados com exito")
                    let len = res.rows.length;

                    if(len > 0){
                        let resultado = [];
                        for(let i = 0; i < len; i++){
                            let item = res.rows.item(i);
                            if(item.segundaFeira == true){
                                item.segundaFeira = "Segunda Feira"
                            }

                            else{
                                item.segundaFeira = "-"
                            }

                            if(item.tercaFeira == true){
                                item.tercaFeira = "Terça feira"
                            }

                            else{
                                item.tercaFeira = "-"
                            }

                            if(item.quartaFeira == true){
                                item.quartaFeira = "Quarta feira"
                            }

                            else{
                                item.quartaFeira = "-"
                            }

                            if(item.quintaFeira == true){
                                item.quintaFeira = "Quinta feira"
                            }

                            else{
                                item.quintaFeira = "-"
                            }

                            if(item.sextaFeira == true){
                                item.sextaFeira = "Sexta feira"
                            }

                            else{
                                item.sextaFeira = "-"
                            }

                            if(item.entrega == "true"){
                                item.entrega = "Sim"
                            }

                            else{
                                item.entrega = "Não"
                            }

                            resultado.push({id: item.id, nome: item.nome, sobrenome: item.sobrenome, telefone: item.telefone, email: item.email, segundaFeira: item.segundaFeira, tercaFeira: item.tercaFeira, quartaFeira: item.quartaFeira, quintaFeira: item.quintaFeira, sextaFeira: item.sextaFeira, horario: item.horario, preferencia: item.preferencia, tipoEst: item.tipoEst, entrega: item.entrega})
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

    const renderCliente = ({item})=>{
        return(
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.nome}</Text>
                    <Image source={require('../../images/alegria.png')}/>
                </View>

                <View style={styles.up}>
                    <Text style={styles.tone}>Telefone:</Text>
                    <Text style={styles.ttwo}>{item.telefone}</Text>

                    <Text style={styles.tone}>E-mail:</Text>
                    <Text style={styles.ttwo}>{item.email}</Text>
                </View>

                <View style={styles.mid}>
                    <View><Text style={styles.tone}>Dias para entrega:</Text>
                    <Text style={styles.ttwo}>{item.segundaFeira}</Text>
                    <Text style={styles.ttwo}>{item.tercaFeira}</Text>
                    <Text style={styles.ttwo}>{item.quartaFeira}</Text>
                    <Text style={styles.ttwo}>{item.quintaFeira}</Text>
                    <Text style={styles.ttwo}>{item.sextaFeira}</Text>
                    
                    </View>

                    <View><Text style={styles.tone}>Horário entrega</Text>
                    <Text style={styles.ttwo}>{item.horario}</Text></View>

                </View>

                <View style={styles.mid}>
                    <View><Text style={styles.tone}>Preferência contato:</Text>
                    <Text style={styles.ttwo}>{item.preferencia}</Text></View>

                    <View><Text style={styles.tone}>Tipo estabele.</Text>
                    <Text style={styles.ttwo}>{item.tipoEst}</Text></View>

                </View>

                <View style={styles.up}>
                    <Text style={styles.tonee}>Entrega rastreável:</Text>
                    <Text style={styles.ttwoo}>{item.entrega}</Text>
                </View>

                <View style={styles.btns}>
                    <TouchableOpacity style={styles.btnI} onPress={inativar}>
                        <Text style={styles.txtI}>Inativar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnE} onPress={()=>{navigation.navigate('Update',{ 
      id: item.id, 
    })}}>
                        <Text style={styles.txtE}>Editar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
            <View style={styles.all}>
                <FlatList data={clientes} renderItem={renderCliente}/>
                </View>
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
        paddingBottom: 50
    },

    up:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: 300,
        marginTop: 40,
        flexWrap: "wrap"
    },

    tone:{
        fontSize: 22,
        fontWeight: "bold",
        color: "#434343",
        width: 120
    },

    tonee:{
        fontSize: 22,
        fontWeight: "bold",
        color: "#434343",
        width: 200
    },

    ttwo:{
        fontSize: 22,
        fontWeight: "bold",
        width: 170
    },

    ttwoo:{
        fontSize: 22,
        fontWeight: "bold",
        width: 40
    },

    img: {
        backgroundColor: "#4C0677",
        padding: 20,
        borderRadius: 15
    },

    mid:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40
    },

    btns:{
        display: "flex",
        flexDirection: "row",
        marginTop: 50,
    },

    btnI:{
        width: 150,
        height: 60,
        borderWidth: 3,
        borderColor: "red",
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    txtI:{
        fontSize: 22,
        color: "red",
        fontWeight: "bold"
    },

    btnE:{
        width: 150,
        height: 60,
        backgroundColor: "#4C0677",
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20
    },

    txtE:{
        fontSize: 22,
        color: "white",
        fontWeight: "bold"
    }
});