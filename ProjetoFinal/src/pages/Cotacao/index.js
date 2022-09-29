import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from "react-native";
import { get } from "react-native/Libraries/Utilities/PixelRatio";


          
// console.log(moeda);

export default function Home({navigation}){
  return(
    <View style={styles.all}>
          <View style={styles.head}>
          <Text style={styles.title}>Cotaçaõ do real</Text>
          <Text style={styles.subt}>| Hoje</Text>

          <View style={styles.card}>
            <View style={styles.leftRed}></View>
            <View style={styles.text}>
            <Text style={styles.real}>R$1,00</Text>
            <Text style={styles.realinfo}>1 real brasileiro</Text>
            <Text style={styles.dolar}>$0,19</Text>
            <Text style={styles.dolarinfo}>Equivale a 0,19 Dólar americano</Text>
            </View>
          </View>


          <View style={styles.card}>
            <View style={styles.leftGreen}></View>
            <View style={styles.text}>
            <Text style={styles.real}>R$1,00</Text>
            <Text style={styles.realinfo}>1 real brasileiro</Text>
            <Text style={styles.dolar}>€0,19</Text>
            <Text style={styles.dolarinfo}>Equivale a 0,19 em Euro</Text>
            </View>
          </View>

          </View>
    </View>
  )}


  
const styles = StyleSheet.create({
  title: {
      fontSize: 35,
      color: '#4c0677',
      fontWeight: 'bold',
      marginTop: 20
  },

  head:{
    display: 'flex',
  },

  img:{
    width: 80,
    height: 80
  },

  subt:{
    fontSize: 25
  },

  card:{
    width: 300,
    height: 170,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 70,
    backgroundColor: '#e3e3e3',
  },

  leftRed:{
    width: 7,
    height: 170,
    backgroundColor: 'red'
  },

  leftGreen:{
    width: 7,
    height: 170,
    backgroundColor: 'green'
  },

  real:{
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop:10
  },

  dolar:{
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 20
  },

  realinfo:{
    fontSize:19,
    marginLeft:15,
    marginTop:4
  },

  dolarinfo:{
    fontSize:18,
    marginLeft:15,
    marginTop:4
  },

  all:{
    marginLeft: 40
  }

})