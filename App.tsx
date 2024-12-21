/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';


import { AppNavigation } from './src/navigation';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';




function App(): React.JSX.Element {

  return (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <AppNavigation />
  </SafeAreaProvider>
  );
}



export default App;
