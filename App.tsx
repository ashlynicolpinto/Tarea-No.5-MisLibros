import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, SafeAreaView } from 'react-native';
import { Libro } from './src/models/Libro';
import { LibroService } from './src/services/LibroService';

const libroService = new LibroService();

export default function App() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const cargarLibros = () => {
    setLibros(libroService.obtenerLibros());
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const handleAgregar = () => {
    if (!title.trim() || !author.trim()) return;

    const nuevoLibro: Libro = {
      id: Date.now().toString(),
      title,
      author
    };

    libroService.agregarLibro(nuevoLibro);
    setTitle('');
    setAuthor('');
    cargarLibros();
  };

  const handleEliminar = (id: string) => {
    libroService.eliminarLibro(id);
    cargarLibros();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mis Libros</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título del libro"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={author}
          onChangeText={setAuthor}
        />
        <Button title="Agregar Libro" onPress={handleAgregar} />
      </View>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemAuthor}>{item.author}</Text>
            </View>
            <Button title="Eliminar" color="red" onPress={() => handleEliminar(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffd7d7',
    marginTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffb6e8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffc2e6',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemAuthor: {
    fontSize: 14,
    color: '#666',
  },
});