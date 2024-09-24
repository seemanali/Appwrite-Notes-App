import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'





import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


import Dashboard from './components/DashBoard.jsx';
import Profile from './components/Profile.jsx';
import Signup from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import Notes from './components/Notes.jsx';
import GlobalState from './GlobalStateStore/store.js';
import Logout from './components/Logout.jsx';
import MyNotes from './components/MyNotes.jsx';
import NotesForm from './components/NotesForm.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/notes",
        element: <Notes />
      },
      {
        path: "/notes/:notesId",
        element: <Notes />
      },
      {
        path:"/notesform",
        element :<NotesForm/>
      },
      {
        path:"/notesform/:documentId",
        element :<NotesForm/>
      },
      {
        path: "/mynotes",
        element: <MyNotes />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={GlobalState}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
