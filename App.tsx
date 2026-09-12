import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Libro } from './src/models/Libro';
import { LibroService } from './src/services/LibroService';

export default function App() {
  // Instancia única del servicio mantenida en el estado del componente
  const [servicio] = useState(() => new LibroService());
  const [libros, setLibros] = useState<Libro[]>([]);
  
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');

  const mostrarAlerta = (tituloMsg: string, mensaje: string) => {
    if (Platform.OS === 'web') {
      alert(`${tituloMsg}: ${mensaje}`);
    } else {
      Alert.alert(tituloMsg, mensaje);
    }
  };

  const manejarAgregarLibro = () => {
    console.log('Intentando agregar:', { titulo, autor, anio });

    if (!titulo.trim() || !autor.trim() || !anio.trim()) {
      mostrarAlerta('Atención', 'Por favor completa todos los campos.');
      return;
    }

    const anioNumero = parseInt(anio, 10);
    const anioActual = new Date().getFullYear();

    if (isNaN(anioNumero) || anioNumero < 1000 || anioNumero > anioActual) {
      mostrarAlerta('Error', 'Ingresa un año de publicación válido.');
      return;
    }

    // Guardar en el servicio y forzar la actualización con un nuevo arreglo
    servicio.agregarLibro(titulo.trim(), autor.trim(), anioNumero);
    setLibros([...servicio.obtenerLibros()]);

    // Limpiar campos
    setTitulo('');
    setAutor('');
    setAnio('');
  };

  const manejarEliminarLibro = (id: string, tituloLibro: string) => {
    if (Platform.OS === 'web') {
      if (confirm(`¿Deseas eliminar "${tituloLibro}"?`)) {
        servicio.eliminarLibro(id);
        setLibros([...servicio.obtenerLibros()]);
      }
    } else {
      Alert.alert(
        'Eliminar Libro',
        `¿Deseas eliminar "${tituloLibro}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: () => {
              servicio.eliminarLibro(id);
              setLibros([...servicio.obtenerLibros()]);
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerBadge}>MIS LIBROS</Text>
        <Text style={styles.headerTitle}>Gestión de Biblioteca</Text>
        <Text style={styles.headerSubtitle}>POO & Separación de Responsabilidades</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <View style={styles.form}>
          <Text style={styles.formHeader}>Nuevo Libro</Text>

          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            placeholderTextColor="#A0A0A0"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={styles.input}
            placeholder="Autor"
            placeholderTextColor="#A0A0A0"
            value={autor}
            onChangeText={setAutor}
          />

          <TextInput
            style={styles.input}
            placeholder="Año de publicación (ej. 2024)"
            placeholderTextColor="#A0A0A0"
            value={anio}
            onChangeText={setAnio}
            keyboardType="numeric"
            maxLength={4}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={manejarAgregarLibro}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>+ Agregar Libro</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardAuthor}>{item.autor}</Text>
              <View style={styles.cardYearTag}>
                <Text style={styles.cardYearText}>{item.anio}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => manejarEliminarLibro(item.id, item.titulo)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📖</Text>
            <Text style={styles.emptyText}>No hay libros registrados</Text>
            <Text style={styles.emptySubText}>Agrega un libro en el formulario superior.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6C63FF',
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2D3436',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#636E72',
    fontWeight: '500',
    marginTop: 2,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    elevation: 4,
  },
  formHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 10,
    height: 46,
    paddingHorizontal: 14,
    marginBottom: 10,
    fontSize: 15,
    color: '#2D3436',
  },
  button: {
    backgroundColor: '#6C63FF',
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    ...(Platform.OS === 'web' && { cursor: 'pointer' }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
  },
  cardAuthor: {
    fontSize: 13,
    color: '#636E72',
    fontWeight: '500',
    marginVertical: 2,
  },
  cardYearTag: {
    backgroundColor: '#FF6584',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
  },
  cardYearText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 118, 117, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
    ...(Platform.OS === 'web' && { cursor: 'pointer' }),
  },
  deleteButtonText: {
    color: '#FF7675',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 20,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#636E72',
  },
  emptySubText: {
    fontSize: 13,
    color: '#A0A0A0',
    marginTop: 4,
    textAlign: 'center',
  },
});