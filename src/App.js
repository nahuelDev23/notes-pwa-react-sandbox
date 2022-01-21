import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { ChakraProvider } from '@chakra-ui/react'
import {Provider} from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
    </Provider>
  );
}

export default App;
