import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { SideBar } from './components';
import { Settings } from './routes/Settings';
import theme from './theme';

import '@fontsource/bluu-next/700.css';
import '@fontsource/uncut-sans/300.css';
import '@fontsource/uncut-sans/400.css';
import '@fontsource/uncut-sans/500.css';
import '@fontsource/uncut-sans/600.css';
import '@fontsource/uncut-sans/700.css';
import { Logs } from './routes/Logs';
import { Maps } from './routes/Maps';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box className="App w-screen h-screen">
          <Router>
            <Flex direction="row" className="w-full h-full">
              <SideBar />
              <Box width={'full'} height={'100%'}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<Maps />} />
                  <Route path="/stats" element={<Statistics />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/workers" element={<Workers />} />
                  <Route path="/settings" element={<Settings />}>
                    <Route path="user" element={<Users />} />
                    <Route path="devices" element={<About />} />
                  </Route>
                </Routes>
              </Box>
            </Flex>
          </Router>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Workers() {
  return <h2>Workers</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Statistics() {
  return <h2>Statistics</h2>;
}

export default App;
