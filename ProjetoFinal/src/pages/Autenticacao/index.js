import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

// const db = openDatabase({
//     name: 'pj_cliente',
//   });

export default function Autenticacao({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // const buscar = ()=>{
    //     db.transaction(txn => {
    //         txn.executeSql(
    //             `SELECT * FROM adms where email = ${email} and senha = ${senha}`,
    //             [],
    //             (sql,res)=> {
    //                 console.log("Dados selecionados com exito")
    //                 let len = res.rows.length;

    //                 if(len > 0){
    //                     console.log("Tem dados")
    //                 }
    //             },
    //             error => {
    //                 console.log("Erro ao fazer select "+ error.message)
    //             }
    //         )
    //     })
    // }

    async function login() {
        await signInWithEmailAndPassword(auth, email, senha)
            .then(value => {
                console.log("Login com sucesso");
                navigation.navigate('Home');
            })
            .catch(error => console.log(error));
    }

    return (
        <View>
            <View style={styles.img}><Image style={styles.imgp} source={require('../../images/login.png')} /></View>
            <Text style={styles.title}>Bem vindo de volta</Text>
            <Text style={styles.subt}>Faça login para continuar</Text>
            <View style={styles.allinpt}>
                <View style={styles.inpt}>
                    <Image style={styles.icon} source={require('../../images/o-email.png')} />
                    <TextInput
                        placeholder="email"
                        value={email}
                        onChangeText={value => setEmail(value)}
                        style={styles.inptt}
                    />
                </View>

                <View style={styles.inpt}>
                    <Image style={styles.icon} source={require('../../images/trancar.png')} />
                    <TextInput
                        placeholder="senha"
                        value={senha}
                        onChangeText={value => setSenha(value)}
                        style={styles.inptt}
                    />
                </View>
                <Text style={styles.inc}>Email ou senha incorreta</Text>
            </View>

            <View style={styles.allbtn}>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')/* login() */}>
                    <Text style={styles.textoBtn}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}><Text style={styles.npc}>Não possui cadastro?</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 20
    },

    subt: {
        textAlign: 'center',
        fontSize: 18
    },

    inpt: {
        fontSize: 20,
        width: 300,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 30
    },

    inptt: {
        width: 200,
        fontSize: 20,
        marginLeft: 10
    },

    allinpt: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        width: 20,
        height: 20
    },

    btn: {
        backgroundColor: '#4C0677',
        width: 200,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    textoBtn: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    },

    allbtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },

    npc: {
        fontSize: 18,
        color: '#4C0677',
        marginTop: 10
    },

    img: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imgp: {
        width: 80,
        height: 80,
        marginTop: 80
    },

    inc:{
        textAlign: 'left',
        color: 'red',
        fontSize: 18,
        display: 'none'
    }
})