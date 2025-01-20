/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Layout } from './Layout';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <Layout />
    </PaperProvider>
  );
}

export default App;
