import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import { ChatProvider } from './context/ChatContext'; // 👈 اضافه کن
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <ChatProvider> {/* 👈 این رو اضافه کن */}
        <App />
      </ChatProvider>
    </AppContextProvider>
  </BrowserRouter>
);
