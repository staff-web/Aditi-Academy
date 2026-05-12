import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LiquidCursor } from './components/LiquidCursor';

function App() {
  return (
    <>
      <LiquidCursor />
      <RouterProvider router={router} />
    </>
  );
}

export default App;