import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LoginGScreen from '../screens/LoginScreen/LoginGScreen';
import LoginGEnterprise from '../screens/LoginScreen/LoginGEnterprise';
import RegisterUserTwo from '../screens/RegisterScreen/RegisterUser/RegisterUserTwo';
import RegisterUserOne from '../screens/RegisterScreen/RegisterUser/RegisterUserOne';
import DiscardingProfile from '../screens/Profile/DiscardingProfile/DiscardingProfile';
import PreRegister from '../screens/RegisterScreen/PreRegister';
import RegisterEnterpriseOne from '../screens/RegisterScreen/RegisterEnterprise/RegisterEnterpriseOne';
import RegisterEnterpriseTwo from '../screens/RegisterScreen/RegisterEnterprise/RegisterEnterpriseTwo';
import React, { useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import EnterpriseProfile from '../screens/Profile/CollectorProfile/EnterpriseProfile';
import RegisterVehicle from '../screens/EnterpriseScreen/RegisterVehicle';
import MaterialDiscarding from '../screens/DiscardingScreen/MaterialDiscarding';
import OrdenAccept from '../screens/DiscardingScreen/OrdenAccept';
import OrderList from '../screens/EnterpriseScreen/OrderList';
import OrderAccepted from '../screens/EnterpriseScreen/OrderAccepted';

export default function BottomTabsNavigator() {
  const Tab = createBottomTabNavigator();
  const { userType } = useContext(AppContext);
  console.log("User Type:", userType);

  const getTabBarVisibility = useCallback((routeName) =>
    [
      'Login',
      'Pre-registro',
      'RegisterEnterpriseOne',
      'RegisterEnterpriseTwo',
      'RegisterUserOne',
      'RegisterUserTwo',
      'LoginGEnterprise',
    ].includes(routeName)
      ? 'none'
      : 'flex',
    []
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle: {
            display: getTabBarVisibility(route.name),
            backgroundColor: '#83D07F',
          },
        })}
      >
        <Tab.Screen
          name="Login"
          component={LoginGScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />

        {/* Registros */}
        <Tab.Screen
          name="RegisterEnterpriseOne"
          component={RegisterEnterpriseOne}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="RegisterEnterpriseTwo"
          component={RegisterEnterpriseTwo}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="Pre-registro"
          component={PreRegister}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="RegisterUserOne"
          component={RegisterUserOne}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="RegisterUserTwo"
          component={RegisterUserTwo}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="EnterpriseProfile"
          component={EnterpriseProfile}
          options={{
            headerShown: false,
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="business-outline" color={color} size={size} />
            ),
            tabBarButton: userType === 1 ? undefined : () => null,
          }}
        />
        <Tab.Screen
          name="DiscardingProfile"
          component={DiscardingProfile}
          options={{
            headerShown: false,
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
            tabBarButton: userType === 0 ? undefined : () => null,
          }}
        />
        <Tab.Screen
          name="LoginGEnterprise"
          component={LoginGEnterprise}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />

        {userType === 0 && (
          <>
            <Tab.Screen
              name="MaterialDiscarding"
              component={MaterialDiscarding}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="trash-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="OrdenAccept"
              component={OrdenAccept}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="list-outline" color={color} size={size} />
                ),
              }}
            />
          </>
        )}

        {userType === 1 && (
          <>
            <Tab.Screen
              name="RegisterVehicle"
              component={RegisterVehicle}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="car-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="OrderList"
              component={OrderList}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="list-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="OrderAccepted"
              component={OrderAccepted}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="checkmark-outline" color={color} size={size} />
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}