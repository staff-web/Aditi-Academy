import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LiquidCursor } from './components/LiquidCursor';
import { ChatbotWidget } from './components/ChatbotWidget';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <>
      <LiquidCursor />
      <RouterProvider router={router} />
      <ChatbotWidget />
      <CookieConsent />
    </>
  );
}

export default App;