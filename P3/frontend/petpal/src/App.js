import './App.css';
import Donate from './components/donate';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Applications from './pages/applications';

const router = createBrowserRouter([
  {
    path: "/donate/:id",
    element: <Donate />,
  },
  {
    path: "/applications/",
    element: <Applications />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
