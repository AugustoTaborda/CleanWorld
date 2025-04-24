import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import { AppContext } from '../../../context/AppContext';

export default function DiscardingProfile({ navigation }) {
  const { idUser } = useContext(AppContext);
  console.log(idUser);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchDiscarderData = async () => {
    try {
      const response = await axios.get(`http://192.168.x.x:8000/api/user/${idUser}`); // Substitua pelo IP
      if (response.data && Array.isArray(response.data) && response.data[0]) {
        const { name, cpf, phone, birthDate, email, password } = response.data[0];
        setName(name || '');
        setCpf(cpf || '');
        setPhone(phone || '');
        setBirthDate(formatBirthDate(birthDate) || '');
        setEmail(email || '');
        setPassword(password || '');
      } else {
        console.error('Resposta da API inválida');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    fetchDiscarderData();
  }, []);

  const formatBirthDate = (date) => {
    if (date) {
      return format(new Date(date), 'dd/MM/yyyy');
    }
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateDate = (date) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(date);
  };

  const handleSaveChanges = async () => {
    if (!validatePhone(phone)) {
      alert('Telefone inválido. Use o formato (XX) XXXXX-XXXX');
      return;
    }
    if (!validateDate(birthDate)) {
      alert('Data de nascimento inválida. Use o formato DD/MM/AAAA');
      return;
    }

    try {
      await axios.put(`http://192.168.x.x:8000/api/user/${idUser}`, { // Substitua pelo IP
        name,
        cpf,
        phone,
        birthDate,
        email,
        password,
      });
      alert('Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
      alert('Erro ao salvar as alterações.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground 
      source={require('../../../../assets/Vector3.png')}
      style={styles.container}
      imageStyle={styles.imageBackground}
    >
      <TouchableOpacity 
        style={styles.exitButton} 
        onPress={handleLogout}
        accessibilityLabel="Botão de logout"
      >
        <Text style={styles.exitButtonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil do Descartante</Text>
      </View>

      <View style={styles.profileBox}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          accessibilityLabel="Campo de nome"
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          placeholder="CPF"
          value={cpf}
          editable={false}
          accessibilityLabel="Campo de CPF (não editável)"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="(XX) XXXXX-XXXX"
          value={phone}
          onChangeText={setPhone}
          accessibilityLabel="Campo de telefone"
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={birthDate}
          onChangeText={setBirthDate}
          accessibilityLabel="Campo de data de nascimento"
        />

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

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSaveChanges}
          accessibilityLabel="Botão de salvar alterações"
        >
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
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
    backgroundColor: '#83D07F',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileBox: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
  },
  inputDisabled: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
  },
  saveButton: {
    backgroundColor: '#83D07F',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exitButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  imageBackground: {
    resizeMode: 'cover',
    width: '100%',
  },
});