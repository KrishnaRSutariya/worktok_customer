/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Layout } from './Layout';
import { ChatProvider } from './components/common/StreamChat';
import { ToastContainer } from './components/common/Toaster';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <ChatProvider>
        <ToastContainer>
          <Layout />
        </ToastContainer>
      </ChatProvider>
    </PaperProvider>
  );
}

export default App;
