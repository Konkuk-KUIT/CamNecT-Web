import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AlumniSearchPage from './pages/alumni/AlumniPage';
import AlumniProfilePage from './pages/alumni/ProfilePage';
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
