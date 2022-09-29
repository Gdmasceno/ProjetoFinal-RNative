import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

export default function Home({navigation}){
  return(
<View style={styles.all}>
    <View style={styles.allText}>
    <Text style={styles.titulo}>Olá usuário!</Text>
    <Text style={styles.subtitulo}>Estamos cheios de clientes, que tal dar uma olhadinha?</Text>
    </View>

    <Image 
    style={styles.img}
    source={require('../../images/clientes.png')}/>

    <View style={styles.btns}>
      <TouchableOpacity style={styles.btn}
      onPress={() => navigation.navigate('Selects')}>
        <Image 
        style={styles.imgc}
        source={require('../../images/cliente.png')}/>
        <Text style={styles.textbtn}>Gerenciar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Cotacao')}}>
        <Image 
        style={styles.imgc}
        source={require('../../images/dinheiro-de-volta.png')}/>
        <Text style={styles.textbtn}>Cotação</Text>
      </TouchableOpacity>

    </View>

    <Text style={styles.pe}>@Accenture</Text>
</View>
  );
}

const styles = StyleSheet.create({
  all: {
    backgroundColor: '#4C0677',
    paddingBottom: 20
  },

  titulo: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold'
  },

  allText:{
    paddingTop: 100,
    paddingLeft: 50,
  },

  subtitulo:{
    fontSize: 20,
    color: 'white',
    width: 300
  },

  img:{
    marginLeft: -20,
    marginTop: 50
  },

  imgc :{
    width: 40,
    height: 40
  },

  btns:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30
  },

  btn:{
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    width: 320,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20
  },

  textbtn:{
    fontSize: 22,
    color: '#4C0677',
    fontWeight: 'bold',
    marginLeft: 10
  },

  pe:{
    color: 'white',
    textAlign: 'center',
    marginTop:70
  }
});