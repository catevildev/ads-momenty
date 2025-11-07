import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TelaGaleria from './screens/TelaGaleria';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <TelaGaleria />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
