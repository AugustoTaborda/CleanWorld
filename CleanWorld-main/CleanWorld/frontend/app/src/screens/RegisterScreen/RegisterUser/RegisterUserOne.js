import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';

export default function RegisterUserOne({ navigation, route }) {
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { name, userType } = route.params;

  const handleRegister = () => {  
    navigation.navigate("RegisterUserTwo", { name, cpf, phone, birthDate, userType });
  };

  return (
    <ImageBackground 
      source={require('../../../../assets/Vector3.png')}
      style={styles.container}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.headerBox}>
        <Image 
          source={require('../../../../assets/logo.png')}
 
          style={styles.image}
        />
        <Text style={styles.headerText}>CleanWorld</Text>
      </View>

      <Text style={styles.stepTitle}>Etapa 1</Text>
      <View style={styles.stepDivider} />

      <View style={styles.formBox}>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={setCpf}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="47 9900-0000"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#83D07F',
    paddingTop: 60,
  },
  headerBox: {
    backgroundColor: '#ffffff',
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D0D0D',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  stepDivider: {
    width: '25%',
    height: 2,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 20,
  },
  formBox: {
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
