import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'pj_cliente',
});

export default function Inicio({ navigation }) {

  const createTable = ()=>{
    db.transaction(txn => {
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome VARCHAR(45),
                sobrenome VARCHAR(45),
                telefone VARCHAR(45),
                email VARCHAR(45),
                segundaFeira BOOLEAN,
                tercaFeira BOOLEAN,
                quartaFeira BOOLEAN,
                quintaFeira BOOLEAN,
                sextaFeira BOOLEAN,
                horario VARCHAR(45),
                preferencia VARCHAR(45),
                tipoEst VARCHAR(45),
                entrega VARCHAR(45),
                status BOOLEAN);
                
                CREATE TABLE IF NOT EXISTS adms (
                  email VARCHAR(45),
                  senha VARCHAR(45);`,
                [],
                (sql,res)=>{
                    console.log('Tabela criada com sucesso!')
                },
                error => {
                    console.log("erro ao criar tabela" + error.message);
                }
        )
    });
    };


  
    useEffect(()=>{
        createTable();
    })
  return (
    <View style={styles.all}>
      <View style={styles.container}>
        <Image
          source={require('../../images/logo.png')}
          style={styles.img} />
      </View>
      <View style={styles.down}>
        <Text style={styles.titulo}>Gerencie os clientes do nosso sistema</Text>
        <Text style={styles.text}>Gerencie todos os clientes da nossa plataforma e mantenha nosso sistema atualizado</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Autenticacao')}
          style={styles.btn}>
          <Text style={styles.textoBtn}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  all: {

  },
  container: {
    display: 'flex',
    width: '100%',
    height: 400,
    marginTop: -100,
    borderRadius: 50,
    backgroundColor: '#4C0677',
    justifyContent: 'center',
    alignItems: 'center',
  },

  down: {
    padding: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  titulo: {
    fontSize: 28,
    color: '#313131',
    fontWeight: 'bold',
    fontFamily: 'Sego UI',
    textAlign: 'center'
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20
  },

  btn: {
    backgroundColor: '#4C0677',
    width: 200,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 100,
  },

  textoBtn: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold'
  },

  npc: {
    fontSize: 18,
    color: '#4C0677',
    marginTop: 10
  },

  img: {
    marginTop: 80
  }
})