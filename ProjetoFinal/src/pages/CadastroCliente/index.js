import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from "@react-native-community/checkbox";
import ToggleSwitch from 'toggle-switch-react-native'
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Checkbox, ScrollView } from "react-native";
import Toast from 'react-native-toast-message';
import { openDatabase } from 'react-native-sqlite-storage';
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

export default function CadastroCliente({ navigation }) {
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


    const testar = () => {
        console.log('nome: ' + nome, ' sobrenome: ' + sobrenome, ' telefone: ' + telefone, ' email: ' + email);
        console.log('Segunda feira : ' + segundaFeira);
        console.log('Terça feira : ' + tercaFeira);
        console.log('Quarta feira : ' + quartaFeira);
        console.log('Quinta feira : ' + quintaFeira);
        console.log('Sexta feira : ' + sextaFeira);

        console.log('Horário : ' + horario);
        console.log('Preferencia : ' + preferencia);
        console.log('Tipo estabelecimento : ' + tipoEst);
        console.log('Rastreavel?: '+entrega)
    }


    const addCliente = () => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO clientes (nome,sobrenome,telefone,email,segundaFeira,tercaFeira,quartaFeira,quintaFeira,sextaFeira,horario,preferencia,tipoEst,entrega,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,true)`,
                [nome, sobrenome,telefone,email,segundaFeira,tercaFeira,quartaFeira,quintaFeira,sextaFeira,horario,preferencia,tipoEst,entrega],
                (sql, res) => {
                    console.log("Dado inserido com sucesso")
                    Alert.alert(
                        "Cliente inserido",
                        "Novo cliente inserido com sucesso")
                    navigation.navigate('Selects')
                },
                error => {
                    console.log("Erro ao inserir dado " + error.message)
                }

            )
        })
    };


    return (
        <ScrollView>
            <View style={styles.all}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cadastro Cliente</Text>
                    <View style={styles.line}><Text></Text></View>
                </View>
                <View style={styles.inpts}>
                    <TextInput
                        placeholder="Nome"
                        style={styles.inptmeio}
                        onChangeText={setNome}
                    // onChangeText={setNome}
                    />

                    <TextInput
                        placeholder="Sobrenome"
                        style={styles.inptmeio}
                        onChangeText={setSobrenome}
                    // onChangeText={setSobrenome}
                    />

                    <TextInputMask style={styles.inptgeral} type={'cel-phone'} placeholder="Telefone" options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99)'
                    }}
                        value={telefone}
                        onChangeText={text => setTelefone(text)}

                    />

                    <TextInput
                        placeholder="E-mail"
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

                    <TextInputMask style={styles.inptgeral} type={'datetime'} placeholder="HH:mm" options={{
                        format: 'HH:mm'
                    }}
                        value={horario}
                        onChangeText={text => setHorario(text)}

                    />
                </View>

                <Text style={styles.subt}>Preferência de contato</Text>

                <View style={styles.tamanhoRN}>
                <RadioButtonRN
                    data={dataR}
                    selectedBtn={(text) => setPreferencia(text.label)}
                    activeColor="#4C0677"
                />
                </View>

                <View>
                    <Text style={styles.subt}>Tipo estabelecimento</Text>
                    <View style={styles.tamanhoRN}>
                    <RadioButtonRN
                    data={dataRR}
                    selectedBtn={(text) => setTipoEst(text.label)}
                    activeColor="#4C0677"
                />
                    </View>
                </View>

                <View style={styles.er}>
                    <Text style={styles.subt}>Entrega rastreável</Text>
                    <Toggle toggle={entrega} setToggle={setEntrega} />
                </View>

                <TouchableOpacity
                    // onPress={handleNew}
                    style={styles.btn}
                    onPress={addCliente}
                ><Text style={styles.txt}>Cadastrar</Text></TouchableOpacity>
            </View>
        </ScrollView >
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