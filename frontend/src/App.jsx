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
import Quiz from './components/quiz/quiz.jsx';
import QuizNav from './components/quiz/Nav.jsx';

function App() {
  const [mode, setmode] = useState(() => {
    return localStorage.getItem("mode") || "light";
  });

  const [show, setshow] = useState(()=>{
        return localStorage.getItem("side") || "show";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("mode", mode);
  }, [mode]);
  
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
    },
    {
      path: "/quiz",
      element: (<><QuizNav /><Quiz /></>),
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
