import './App.css';
import Donate from './components/donate';
import BlogList from './components/blog';
import UploadBlog from './components/blog/UploadBlog';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import PostDetail from './components/blog/PostDetail';
import EditBlog from './components/blog/EditBlog';
import Applications from './pages/applications';
import PetDetails from './pages/pet-details';


const router = createBrowserRouter([
  {
    path: "/donate/:id",
    element: <Donate />,
  },

  {
    path: "/blog/",
    element: <BlogList />,
  },
  {
    path: "/blog/upload",
    element: <UploadBlog />,
  },
  {
    path: "/blog/:postId",
    element: <PostDetail />,
  },
  {
    path: "/blog/edit/:postId",
    element: <EditBlog />,
  },

  {
    path: "/applications/",
    element: <Applications />,
  },

  {
    path: "/pets/:id",
    element: <PetDetails />,
  },

]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
