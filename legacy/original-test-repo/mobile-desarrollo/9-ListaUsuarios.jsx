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
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.nombre}</Text>}
      />
    </View>
  );
}