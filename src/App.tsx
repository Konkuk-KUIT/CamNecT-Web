import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CommunityPage from './pages/Community/CommunityPage';
import WritePage from './pages/Community/WritePage';
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
