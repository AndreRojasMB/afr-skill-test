import React from 'react';
import { View, Text, FlatList } from 'react-native';

const usuarios = [
  { id: '1', nombre: 'Ana' },
  { id: '2', nombre: 'Carlos' },
  { id: '3', nombre: 'Lucía' },
];

export default function ListaUsuarios() {
  return (
    <View>
      {/* TODO: Usa FlatList para renderizar la lista "usuarios".
          - Prop "data": el arreglo de usuarios
          - Prop "keyExtractor": retorna el id de cada item
          - Prop "renderItem": muestra el nombre en un Text */}
      {/* tu código aquí */}
    </View>
  );
}