import { SafeAreaView } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import React from 'react';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <BottomTabsNavigator />
      </SafeAreaView>
    </AppProvider>
  );
}