import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

export default function MaterialDiscarding({ navigation }) {
  const { idUser } = useContext(AppContext);
  console.log(idUser);
  const [quantityItems, setQuantityItems] = useState(''); // Alterado de quantityVolume para quantityItems
  const [volumeSize, setVolumeSize] = useState('');
  const [collectionDate, setCollectionDate] = useState('');
  const [collectionTime, setCollectionTime] = useState('');
  const [weight, setWeight] = useState(''); // Novo estado para peso
  const [itemsDescription, setItemsDescription] = useState(''); // Alterado de materialDescription para itemsDescription
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState(0); // Padrão para quem cria o pedido -> 0 representa que o pedido foi feito e está aguardando ser aceito

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/registerOrder', {
        quantityItems, // Alterado de quantityVolume
        volumeSize,
        collectionDate,
        collectionTime,
        weight, // Adicionado peso
        address,
        itemsDescription, // Alterado de materialDescription
        status,
        idUser,
      });
      console.log('Pedido realizado com sucesso:', response.data);
      clearInput();
      Alert.alert('Material Registrado!');
    } catch (error) {
      console.error('Erro ao realizar o pedido:', error);
    }
  };

  const clearInput = () => {
    setCollectionDate('');
    setCollectionTime('');
    setItemsDescription(''); // Alterado de setMaterialDescription
    setVolumeSize('');
    setQuantityItems(''); // Alterado de setQuantityVolume
    setWeight(''); // Adicionado
    setAddress('');
  };

  return (
    <ImageBackground
      source={require('../../../assets/Vector3.png')}
      style={styles.container}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Informações do Material</Text>
      </View>

      <View style={styles.profileBox}>
        {/* Quantidade de Itens */}
        <Text style={styles.label}>Quantidade de Itens</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 5"
          value={quantityItems}
          onChangeText={setQuantityItems}
          keyboardType="numeric"
        />

        {/* Tamanho do Volume */}
        <Text style={styles.sectionTitle}>Tamanho do Volume</Text>
        <View style={styles.volumeOptions}>
          <TouchableOpacity
            style={[styles.volumeOption, volumeSize === 'Pequeno' && styles.selectedOption]}
            onPress={() => setVolumeSize('Pequeno')}
          >
            <Text
              style={[styles.optionText, volumeSize === 'Pequeno' && styles.selectedOptionText]}
            >
              Pequeno
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.volumeOption, volumeSize === 'Médio' && styles.selectedOption]}
            onPress={() => setVolumeSize('Médio')}
          >
            <Text
              style={[styles.optionText, volumeSize === 'Médio' && styles.selectedOptionText]}
            >
              Médio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.volumeOption, volumeSize === 'Grande' && styles.selectedOption]}
            onPress={() => setVolumeSize('Grande')}
          >
            <Text
              style={[styles.optionText, volumeSize === 'Grande' && styles.selectedOptionText]}
            >
              Grande
            </Text>
          </TouchableOpacity>
        </View>

        {/* Data e Hora */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Data de Coleta</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2024-11-18"
              value={collectionDate}
              onChangeText={setCollectionDate}
            />
            <Text style={styles.label}>Peso</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 10 kg"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Horário</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 14:00"
              value={collectionTime}
              onChangeText={setCollectionTime}
            />
          </View>
        </View>

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          placeholder="Rua, n°"
          value={address}
          onChangeText={setAddress}
        />

        {/* Descrição dos Itens */}
        <Text style={styles.label}>Descrição dos Itens</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Detalhe os itens aqui..."
          value={itemsDescription}
          onChangeText={setItemsDescription}
          multiline
        />

        {/* Botão Realizar Pedido */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Realizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83D07F', // Fallback para garantir o fundo verde
    justifyContent: 'center',
    alignItems: 'center',
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
  textArea: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    height: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  volumeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  volumeOption: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  selectedOption: {
    backgroundColor: '#83D07F',
    borderColor: '#83D07F',
  },
  optionText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOptionText: {
    color: '#FFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#83D07F',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
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