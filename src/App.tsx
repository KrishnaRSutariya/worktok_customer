/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Layout } from './Layout';
import { ToastContainer } from './components/common/Toaster';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <ToastContainer>
        <Layout />
      </ToastContainer>
    </PaperProvider>
  );
}

export default App;
