import { useState, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router"
import Modecontext from './context/context.js'
import Quiz from './components/quiz.jsx'
import Nav from './components/Nav.jsx'
import './App.css'

function App() {
  const [mode, setmode] = useState(() => {
    return localStorage.getItem("mode") || "light";
  });
  useEffect(() => {
    let set = localStorage.getItem("mode")
    if (!set) {
      let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", isDarkMode ? 'dark' : 'light');
      localStorage.setItem("mode", isDarkMode ? 'dark' : 'light')
    } else {
      document.documentElement.setAttribute("data-theme", (mode == 'light') ? 'light' : 'dark');
      localStorage.setItem("mode", (mode == 'light') ? 'light' : 'dark')
    }
  }, [mode]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<><Nav /></>),
    },
    {
      path: "/quiz",
      element: (<><Nav /><Quiz/></>),
    },
    {
      path: "/livequiz",
      element: (<><Nav /></>),
    }
  ]);

  return (
    <>
      <Modecontext.Provider value={{ mode, setmode }}>
        <RouterProvider router={router} />
      </Modecontext.Provider >
    </>
  )
}

export default App
