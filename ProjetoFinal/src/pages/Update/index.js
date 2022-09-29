import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from "@react-native-community/checkbox";
import { View, TextInput, TouchableOpacity, Text, Alert, FlatList, StyleSheet, Image, ScrollView } from "react-native";
import Toast from 'react-native-toast-message';
import uuid from "react-native-uuid";
import {openDatabase} from 'react-native-sqlite-storage';
import { TextInputMask } from 'react-native-masked-text';
import RadioButtonRN from 'radio-buttons-react-native';
import Toggle from 'react-native-toggle-input'

const dataR = [
    {
        label: 'E-mail'
    },
    {
        label: 'Fax'
    },
    {
        label: 'Whatsapp'
    },
    {
        label: 'Telefone'
    }
];

const dataRR = [
    {
        label: 'Comercial'
    },
    {
        label: 'Residencial'
    }
];

const db = openDatabase({
    name: 'pj_cliente',
});
export default function Update({ navigation,route }) {

    const [clientes,setClientes] = useState("");

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const [segundaFeira, setSegundaFeira] = useState(false)
    const [tercaFeira, setTercaFeira] = useState(false)
    const [quartaFeira, setQuartaFeira] = useState(false)
    const [quintaFeira, setQuintaFeira] = useState(false)
    const [sextaFeira, setSextaFeira] = useState(false)

    const [horario, setHorario] = useState("");
    const [preferencia, setPreferencia] = useState("");
    const [tipoEst, setTipoEst] = useState("");
    const [entrega, setEntrega] = useState("");

    


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
                            if(item.segundaFeira == 1){
                                item.segundaFeira = true;
                            }

                            else{
                                item.segundaFeira = false;
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


    const update = ()=>{

        db.transaction(txn => {
            txn.executeSql(
                `UPDATE clientes SET nome = ?, 
                sobrenome = ?, 
                telefone = ?, 
                email = ?, 
                segundaFeira = ?, 
                tercaFeira = ?, 
                quartaFeira = ?, 
                quintaFeira = ?, 
                sextaFeira = ?,
                horario = ?,
                preferencia = ?,
                tipoEst = ?,
                entrega = ? WHERE id = ${route.params.id}`,
                [nome,sob,telefone,email,segundaFeira,tercaFeira,quartaFeira,quintaFeira,sextaFeira,horario,preferencia,tipoEst,entrega],
                (sql,res)=> {
                    console.log("ATUALIZADO!")
                },
                error => {
                    console.log("Erro ao fazer update "+ error.message)
                }
            )
        })
    }

    useEffect(()=>{
        getClientes();
    },[])

    const renderCliente = ({item})=>{
        return(
               <View style={styles.all}>
                <View style={styles.header}>
                    <Text style={styles.title}>Editar Cliente</Text>
                    <View style={styles.line}><Text></Text></View>
                </View>
                <View style={styles.inpts}>
                    <TextInput
                        placeholder={item.nome}
                        style={styles.inptmeio}
                        TextInput={item.nome}
                        onChangeText={setNome}
                    // onChangeText={setNome}
                    />

                    <TextInput
                        placeholder={item.sobrenome}
                        style={styles.inptmeio}
                        onChangeText={setSobrenome}
                    // onChangeText={setSobrenome}
                    />

                    <TextInputMask style={styles.inptgeral} type={'cel-phone'} placeholder={item.telefone} options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99)'
                    }}
                        value={telefone}
                        onChangeText={text => setTelefone(text)}

                    />

                    <TextInput
                        placeholder={item.email}
                        style={styles.inptgeral}
                        onChangeText={setEmail}
                    // onChangeText={setSobrenome}
                    />

                    <View>
                        <Text style={styles.subt}>Dias para entrega</Text>
                        <View style={styles.chx}><CheckBox disabled={false} value={segundaFeira} onValueChange={(newValue) => setSegundaFeira(newValue)} />
                            <Text style={styles.ft}>Segunda-feira</Text></View>
                        <View style={styles.chx}><CheckBox disabled={false} value={tercaFeira} onValueChange={(newValue2) => setTercaFeira(newValue2)} />
                            <Text style={styles.ft}>Terça-feira</Text></View>
                        <View style={styles.chx}><CheckBox disabled={false} value={quartaFeira} onValueChange={(newValue3) => setQuartaFeira(newValue3)} />
                            <Text style={styles.ft}>Quarta-feira</Text></View>
                        <View style={styles.chx}><CheckBox disabled={false} value={quintaFeira} onValueChange={(newValue4) => setQuintaFeira(newValue4)} />
                            <Text style={styles.ft}>Quinta-feira</Text></View>
                        <View style={styles.chx}><CheckBox disabled={false} value={sextaFeira} onValueChange={(newValue5) => setSextaFeira(newValue5)} />
                            <Text style={styles.ft}>Sexta-feira</Text></View>
                    </View>
                </View>

                <View>
                    <Text style={styles.subt}>Horário para entrega</Text>

                    <TextInputMask style={styles.inptgeral} type={'datetime'} placeholder={item.horario} options={{
                        format: 'HH:mm'
                    }}
                        value={horario}
                        onChangeText={text => setHorario(text)}

                    />
                </View>

                <Text style={styles.subt}>Preferência de contato</Text>

                <RadioButtonRN
                    data={dataR}
                    selectedBtn={(text) => setPreferencia(text.label)}
                />

                <View>
                    <Text style={styles.subt}>Tipo estabelecimento</Text>
                    <RadioButtonRN
                    data={dataRR}
                    selectedBtn={(text) => setTipoEst(text.label)}
                />
                </View>

                <View style={styles.er}>
                    <Text style={styles.subt}>Entrega rastreável</Text>
                    <Toggle toggle={entrega} setToggle={setEntrega} />
                </View>

                <TouchableOpacity
                    // onPress={handleNew}
                    style={styles.btn}
                    onPress={update}
                ><Text style={styles.txt}>Editar</Text></TouchableOpacity>
            </View>
        )
    }

    return (
                <FlatList data={clientes} renderItem={renderCliente}/>
    
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        width: 200,
        color: "#434343",
        fontWeight: 'bold'
    },

    all: {
        paddingLeft: 20,
        paddingTop: 50,
    },

    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },

    line: {
        width: 140,
        height: 5,
        backgroundColor: "#4C0677",
        marginLeft: 0,
        marginRight: 20,
        marginTop: 8
    },

    inpts: {
        width: 350,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
        flexWrap: "wrap"
    },

    inptmeio: {
        backgroundColor: "#E7E5E9",
        width: 170,
        height: 60,
        fontSize: 20,
        padding: 10,
        borderRadius: 12,
        marginTop: 15
    },

    inptgeral: {
        backgroundColor: "#E7E5E9",
        width: 350,
        height: 60,
        fontSize: 20,
        padding: 10,
        borderRadius: 12,
        marginTop: 15
    },

    txt: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold"
    },

    subt: {
        fontSize: 22,
        color: "#434343",
        fontWeight: "bold",
        marginTop: 40
    },

    btn: {
        width: 350,
        height: 50,
        borderRadius: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        backgroundColor: '#4C0677',
        marginTop: 30,
        marginBottom: 30
    },

    chx: {
        display: 'flex',
        flexDirection: 'row'
    },

    ft: {
        fontSize: 18
    },

    ti: {
        fontSize: 25
    },

    er: {
        display: 'flex',
        flexDirection: 'column',
    },

    toggle: {
        marginTop: 10
    },

    tamanhoRN:{
        width: 350
    }
});