import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';

import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const {idCollector} = useContext(AppContext);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [recusedOrders, setRecusedOrders] = useState([]);

  const getOrders = async () => {
    try{
      const response = await axios.get("http://localhost:8000/api/registerOrder")
      console.log(response.data)
      setOrders(response.data)
    }catch(error){
      console.error("Erro ao buscar informações do pedido: ", error.response?.data || error.message);
    }
  }

  const filterOrders = (collectorId) => {
    if (!collectorId) {
      return orders;
    } else {
      return orders.filter(order => order.idCollector === null);
    }
  };

  const formatBirthDate = (date) => {
    if (date) {
      const formattedDate = format(new Date(date), 'dd/MM/yyyy'); 
      return formattedDate;
    }
    return ''; 
  };

  useEffect(() => {
    getOrders()
  }, [])
  

  useEffect(() => {
    const filtered = filterOrders(idCollector);
    setFilteredOrders(filtered);
  }, [idCollector, orders]);

  const handleAccept = async (order) => {

    try{
      const response = await axios.put(`http://localhost:8000/api/registerOrder/${order.idregisterOrder}`, {
        quantityVolume: order.quantityVolume,
        volumeSize: order.volumeSize,
        collectionDate: formatBirthDate(order.collectionDate),
        collectionTime: order.collectionTime,
        address: order.address,
        materialDescription: order.materialDescription,
        status: 1,
        idUser: order.idUser,
        idCollector
       })
       console.log(`Pedido ${order.idregisterOrder} aceito!`);
       await getOrders();
      
     }catch(error){
       console.error("Erro ao aceitar pedido: ", error.response?.data || error.message);
     }

  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>lista de Pedidos</Text>
      </View>

      {/* Lista de Pedidos */}
      <ImageBackground
        source={require('../../../assets/Vector3.png')}
        style={styles.orderContainer}
        imageStyle={styles.imageBackground}
      >
        {filteredOrders.map((order) => (
          <View key={order.idRegisterOrder} style={styles.orderBox}>
            <View style={styles.orderLeft}>
              <Text style={styles.orderText}>{formatBirthDate(order.collectionDate)}</Text>
              <Text style={styles.orderText}>{order.collectionTime}</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderText}>Nome: {order.name}</Text>
              <Text style={styles.orderText}>Endereço: {order.address}</Text>
              <Text style={styles.orderText}>Telefone: {order.phone}</Text>
              <Text style={styles.orderText}>Descrição: {order.materialDescription}</Text>

              {/* Botões Aceitar e Recusar */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAccept(order)}
                >
                  <Text style={styles.buttonText}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => handleReject(order)}
                >
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#83D07F',
    padding: 10,
  },
  header: {
    backgroundColor: '#83D07F',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  orderContainer: {
    marginTop: 20,
  },
  orderBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  orderLeft: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderRight: {
    flex: 1,
    justifyContent: 'center',
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageBackground: {
    marginTop: 1,
    height: 1150,
    width: '100%',
    resizeMode: 'contain',
  },
  
});
