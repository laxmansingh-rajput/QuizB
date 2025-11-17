import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router";
import './App.css'
import Nav from './components/Nav'
import SideBar from './components/sideBar'
import Modecontext from './context/context.js'
import Home from './components/home.jsx'
import Premium from './components/premium.jsx';
import Join from './components/join.jsx'
import Login from './components/login.jsx';
import Create from './components/create.jsx';
import Practice from './components/practice.jsx';
import Faq from './components/faq.jsx';
import Creation from './components/creations.jsx';
import WorkSpace from './components/workSpace.jsx';

function App() {
  const [mode, setmode] = useState("dark");
  const [show, setshow] = useState("show");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    let val = localStorage.getItem("side")
    if (val) {
      setshow(val)
    } else {
      setshow("show")
    }
  }, [])

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (!theme) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = systemPrefersDark ? "dark" : "light";
      localStorage.setItem("theme", theme);
    }
    setmode(theme);
    const s = localStorage.getItem("side")
    if (s) {
      setshow(s);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<><Nav /> <SideBar curr={"home"} /> <Home /></>),
    },
    {
      path: "/premium",
      element: (<><Nav /> <SideBar curr={"premium"} /> <Premium /></>),
    },
    {
      path: "/join",
      element: (<><Nav /> <SideBar curr={"join"} /> <Join /></>),
    },
    {
      path: "/create",
      element: (<><Nav /> <SideBar curr={"create"} /> <Create /></>),
    },
    {
      path: "/practice",
      element: (<><Nav /> <SideBar curr={"practice"} /> <Practice /></>),
    },
    {
      path: "/login",
      element: (<><Login /></>),
    },
    {
      path: "/faq",
      element: (<><Nav /> <SideBar curr={"faq"} /> <Faq /></>),
    }, {
      path: "/creation",
      element: (<><Nav /> <SideBar curr={"creation"} /> <Creation /></>),
    },
    {
      path: "/workspace",
      element: (<><Nav hide={true} /><WorkSpace /></>),
    }
  ]);

  return (
    <>
      <Modecontext.Provider value={{ mode, setmode, show, setshow }}>
        <RouterProvider router={router} />
      </Modecontext.Provider>
    </>
  )
}

export default App
