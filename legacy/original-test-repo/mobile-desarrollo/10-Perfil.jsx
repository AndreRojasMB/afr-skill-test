import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
        setCargando(false);
      });
  }, []);
  
  if (cargando) return <ActivityIndicator />;

  return (
    <View>
      <Text>{usuario?.name}</Text>
    </View>
  );
}