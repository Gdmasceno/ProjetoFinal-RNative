import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,FlatList } from "react-native";
import axios from 'axios';

interface Moeda {
  bid: string;
}


export default function Cotacao({ navigation }) {
  const [moedas, setMoedas] = useState<Moeda[]>([]);

  async function getCotacao() {
    axios
      .get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL')
      .then(res => {
        const dolar: Moeda = { id: 'USDBRL', ...res.data.USDBRL };
        const euro: Moeda = { id: 'EURBRL', ...res.data.EURBRL };
        setMoedas([dolar, euro]);
      });
  }

  useEffect(() => {
    getCotacao();
  }, []);

  return (
    <View style={styles.all}>
      <View style={styles.head}>
        <Text style={styles.title}>Cotação do real</Text>
        <Text style={styles.subt}>| Hoje</Text>

      </View>


      <FlatList
        data={moedas}
        renderItem={({ item }) => (

          <View style={styles.content}>

            <View style={styles.card}>
              <View style={styles.left}></View>
              <View style={styles.text}>
                <Text style={styles.real}>{item?.code === 'USD' ? 'U$' : '€'} 1</Text>
                <Text style={styles.realinfo}>1 {item?.code === 'USD' ? 'dólar americano' : 'euro'}</Text>
                <Text style={styles.dolar}>R$ {item.bid}</Text>
                <Text style={styles.dolarinfo}>Equivale em média R$ {item.bid} em reais</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: '#4c0677',
    fontWeight: 'bold',
    marginTop: 20
  },

  head: {
    display: 'flex',
  },

  img: {
    width: 80,
    height: 80
  },

  subt: {
    fontSize: 25
  },

  card: {
    width: 300,
    height: 170,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 70,
    backgroundColor: '#e3e3e3',
  },

  left: {
    width: 7,
    height: 170,
    backgroundColor: '#4C0677'
  },

  real: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10
  },

  dolar: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 20
  },

  realinfo: {
    fontSize: 19,
    marginLeft: 15,
    marginTop: 4
  },

  dolarinfo: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 4
  },

  all: {
    marginLeft: 40
  }

})