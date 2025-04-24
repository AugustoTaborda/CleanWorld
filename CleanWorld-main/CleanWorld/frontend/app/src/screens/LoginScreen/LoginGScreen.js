import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

export default function LoginGScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setIdUser, setUserType } = useContext(AppContext);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.100:8000/api/login", // Substitua pelo IP correto
        { email, password },
        { timeout: 10000 } // Timeout de 10 segundos
      );

      const { token, userType, idUser } = response.data;

      setIdUser(idUser);
      setUserType(userType);

      if (token) {
        if (userType === 0) {
          navigation.navigate('DiscardingProfile', { token, idUser });
        } else if (userType === 1) {
          navigation.navigate('EnterpriseProfile', { token, idUser });
        }
        setLoading(false);
      } else {
        setError("Credenciais inválidas");
        setLoading(false);
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setError("Tempo de conexão excedido. Verifique o servidor.");
      } else {
        setError("Erro na conexão com o servidor");
      }
      setLoading(false);
      console.error("Erro no login: ", {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.response,
      });
    }
  };

  const handlePreRegister = () => {
    navigation.navigate('Pre-registro');
  };

  const handleLoginAsEnterprise = () => {
    navigation.navigate('LoginGEnterprise');
  };

  return (
    <ImageBackground 
      source={require('../../../assets/Vector3.png')}
      style={styles.container}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.overlay} />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../../../assets/logo.png')} 
            style={styles.image}
          />
          <Text style={styles.text}>CleanWorld</Text>
        </View>
      </View>

      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Login</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          accessibilityLabel="Campo de email"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Campo de senha"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} accessibilityLabel="Botão de login">
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.registerButton} onPress={handlePreRegister} accessibilityLabel="Botão de cadastro">
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleLoginAsEnterprise} accessibilityLabel="Botão de login da empresa">
          <Text style={styles.forgotPasswordText}>Login da Empresa</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83D07F',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(131, 208, 127, 0.5)',
  },
  header: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 5,
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
  text: {
    fontSize: 34,
    color: '#0D0D0D',
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
    elevation: 5,
    marginTop: 150,
    alignSelf: 'center',
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
  },
  loginButton: {
    backgroundColor: '#83D07F',
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#83D07F',
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageBackground: {
    resizeMode: 'cover',
    width: '100%',
  },
});