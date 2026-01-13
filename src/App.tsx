import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import CommunityPage from './pages/community/CommunityPage';
import WritePage from './pages/community/WritePage';
import AlumniSearchPage from './pages/alumni/AlumniPage';
import AlumniProfilePage from './pages/alumni/ProfilePage';
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
  {
    path: '/community/write',
    element: <WritePage />,
  },
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
