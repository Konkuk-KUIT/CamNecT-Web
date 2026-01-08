import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CommunityPage from './pages/Community/Community';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/community',
    element: <CommunityPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
