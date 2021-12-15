import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
