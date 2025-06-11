import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MenuContextProvider } from './components/context/ToggleMenu/ToggleMenuContext.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MenuContextProvider>
          <App />
        </MenuContextProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
