import { RouterProvider } from 'react-router-dom';
import router from './router';

// main app shell - routing handled in router.jsx
function App() {
  return <RouterProvider router={router} />;
}

export default App;
