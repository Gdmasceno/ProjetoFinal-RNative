import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './src/pages/Inicio';
import Home from './src/pages/Home';
import CadastroCliente from './src/pages/CadastroCliente';
import Selects from './src/pages/Selects';
import SelectInat from './src/pages/SelectInat';
import Autenticacao from './src/pages/Autenticacao';
import Cadastro from './src/pages/Cadastro';
import Detalhe from './src/pages/Detalhe';
import DetalheIn from './src/pages/DetalheIn';
import Update from './src/pages/Update';
import Cotacao from './src/pages/Cotacao';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Inicio" component={Inicio} options ={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options ={{headerShown: false}}/>
        <Stack.Screen name="CadastroCliente" component={CadastroCliente} options={{headerTitle : "", headerTintColor: "#4C0677", headerStyle: {background: "none"}}}/>
        <Stack.Screen name="Selects" component={Selects} options={{headerTitle : "", headerTintColor: "#4C0677", headerStyle: {background: "none"}}}/>
        <Stack.Screen name="SelectInat" component={SelectInat} options={{headerTitle : "", headerTintColor: "#4C0677", headerStyle: {background: "none"}}}/>
        <Stack.Screen name="Autenticacao" component={Autenticacao} options={{headerTitle : "Login"}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerTitle : "", headerTintColor: "#4C0677", headerStyle: {background: "none"}}}/>
        <Stack.Screen name="Update" component={Update} options={{headerTitle : "", headerTintColor: "#4C0677", headerStyle: {background: "none"}}}/>
        <Stack.Screen name="Detalhe" component={Detalhe} options={{headerTitle : "", headerTintColor: "#4C0677", headerStyle: {background: "none"}}}/>
        <Stack.Screen name="DetalheIn" component={DetalheIn} options={{headerTitle : "", headerTintColor: "#4C0677", headerStyle: {background: "none"}}}/>
        <Stack.Screen name="Cotacao" component={Cotacao} options={{headerTitle : "", headerTintColor: "#4C0677", headerStyle: {background: "none"}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}