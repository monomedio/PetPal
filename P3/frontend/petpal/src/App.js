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
import ReplyBlog from './components/blog/ReplyBlog';
import Applications from './pages/applications';
import PetDetails from './pages/pet-details';
import Login from './pages/login';
import ShelterDetails from './pages/shelter-details';
import Search from './pages/search';
import SignUpGeneral from './pages/sign-up-general';
import SignUpSeeker from './pages/sign-up-seeker';
import AdoptForm from './pages/adopt-form';


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
  // {
  //   path: "/blog/:postId/replies",
  //   element: <ReplyBlog />,
  // },

  {
    path: "/applications/",
    element: <Applications />,
  },

  {
    path: "/adopt/:pet_id",
    element: <AdoptForm />,
  },

  {
    path: "/pets/",
    element: <Search />,
  },

  {
    path: "/pets/:id",
    element: <PetDetails />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/shelters/:id",
    element: <ShelterDetails />,
  },

  {
    path: "/signup",
    element: <SignUpGeneral />,
  },

  {
    path: "/signup-seeker",
    element: <SignUpSeeker />,
  },

]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
