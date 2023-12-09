import './App.css';
import Donate from './components/donate';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/donate/:id",
    element: <Donate />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
