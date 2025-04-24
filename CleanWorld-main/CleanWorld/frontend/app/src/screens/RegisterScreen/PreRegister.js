import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

export default function PreRegister({ navigation }) {
  const [nameEnterprise, setnameEnterprise] = useState('');
  const [name, setname] = useState('');
  const [userType, setUserType] = useState(0); // 0: Pessoa Física, 1: Empresa

  const handlePreRegister = () => {
    if (userType === 1 && nameEnterprise.trim() !== '') {
      // Se for empresa e o campo não estiver vazio
      console.log(userType);
      navigation.navigate("RegisterEnterpriseOne", { nameEnterprise, userType });
    } else if (userType === 0 && name.trim() !== '') {
      // Se for pessoa física e o campo não estiver vazio
      console.log(userType);
      navigation.navigate("RegisterUserOne", { name, userType });
    } else {
      alert('Por favor, preencha o campo correspondente antes de prosseguir.');
    }
  };

  return (
    <ImageBackground 
      source={require('../../../assets/Vector3.png')}
      style={styles.container}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../../../assets/logo.png')} 
            style={styles.image}
          />
          <Text style={styles.text}>CleanWorld</Text>
        </View>
      </View>

      <Text style={styles.loginTitle}>Vamos iniciar</Text>
      <View style={styles.divider} />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, userType === 0 ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => {
            setUserType(0);
            setnameEnterprise(''); // Limpa o campo da empresa se selecionar pessoa física
          }}
        >
          <Text style={[styles.toggleText, userType === 0 ? styles.activeText : styles.inactiveText]}>
            Pessoa Física
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, userType === 1 ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => {
            setUserType(1);
            setname(''); // Limpa o campo da pessoa física se selecionar empresa
          }}
        >
          <Text style={[styles.toggleText, userType === 1 ? styles.activeText : styles.inactiveText]}>
            Empresa
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginBox}>
        {userType === 1 && (
          <>
            <Text style={styles.label}>Empresa:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da empresa"
              value={nameEnterprise}
              onChangeText={setnameEnterprise}
            />
          </>
        )}

        {userType === 0 && (
          <>
            <Text style={styles.label}>Pessoa Física:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setname}
            />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handlePreRegister}>
          <Text style={styles.buttonText}>Próximo</Text>
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
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    borderWidth: 1,
  },
  activeToggle: {
    backgroundColor: '#ffffff', // Fundo branco
    borderColor: '#83D07F', // Borda verde
  },
  inactiveToggle: {
    backgroundColor: '#83D07F', // Fundo verde
    borderColor: '#83D07F', // Mesma cor de fundo
  },
  toggleText: {
    fontWeight: 'bold',
  },
  activeText: {
    color: '#83D07F', // Texto verde
  },
  inactiveText: {
    color: '#FFFFFF', // Texto branco
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
    marginTop: 20,
    alignSelf: 'center',
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
  button: {
    backgroundColor: '#83D07F',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageBackground: {
    marginTop: 1,
    height: 1400,
    width: '100%',
    resizeMode: 'contain',
  },
});
