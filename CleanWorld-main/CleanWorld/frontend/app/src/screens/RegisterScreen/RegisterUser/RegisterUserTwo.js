import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import axios from "axios";

export default function RegisterUserTwo({ navigation, route }) {
  const { name, cpf, phone, birthDate, userType } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/user", {
        name,
        cpf,
        phone,
        birthDate,
        userType,
        email,
        password
      });
      console.log(response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  const handleUserOne = () => {
    navigation.navigate('Pre-registro'); 
  };

  return (
    <ImageBackground 
          source={require('../../../../assets/Vector3.png')}
          style={styles.container}
          imageStyle={styles.imageBackground}
        >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../../../../assets/logo.png')} 
            style={styles.image}
          />
          <Text style={styles.headerText}>CleanWorld</Text>
        </View>
      </View>

      {/* Texto "Etapa 2" com linha abaixo, centralizado no fundo verde */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>Etapa 2</Text>
        <View style={styles.stepLine} />
      </View>

      {/* Conteúdo da tela de registro */}
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Registro</Text>
        
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Finalizar Cadastro</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de voltar fora do bloco principal, abaixo e à esquerda */}
      <TouchableOpacity style={styles.backButtonContainer} onPress={handleUserOne}>
        <View style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83D07F',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    top: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 5,
  },
  headerText: {
    fontSize: 34,
    color: '#0D0D0D',
  },
  // Estilos para "Etapa 2"
  stepContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 100, // Ajusta a posição abaixo do cabeçalho
  },
  stepText: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepLine: {
    width: '25%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 5,
  },
  loginBox: {
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    marginTop: 20, // Espaço abaixo de "Etapa 2"
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#83D07F',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonContainer: {
    marginTop: 10, // Define espaço abaixo do quadro branco
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#83D07F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageBackground: {
    marginTop: 1,
    height: 1400,
    width: '100%',
    resizeMode: 'contain',
  },
});
