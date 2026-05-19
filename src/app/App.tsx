import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LiquidCursor } from './components/LiquidCursor';
import { ChatbotWidget } from './components/ChatbotWidget';

function App() {
  return (
    <>
      <LiquidCursor />
      <RouterProvider router={router} />
      <ChatbotWidget />
    </>
  );
}

export default App;