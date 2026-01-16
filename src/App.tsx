import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AlumniSearchPage from './pages/Alumni/AlumniPage';
import AlumniProfilePage from './pages/Alumni/ProfilePage';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/alumni-search',
    element: <AlumniSearchPage />,
  },
  {
    path: '/alumni/:id',
    element: <AlumniProfilePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
