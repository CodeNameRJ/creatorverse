import { useState } from 'react'
import { useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators.jsx";
import AddCreator from './pages/AddCreator.jsx';
import ViewCreator from './pages/ViewCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';




const App = () => {
  
  const element = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/new", element: <AddCreator /> },
    { path: "/view/:id", element: <ViewCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
  ]);


  return(

    <div className="App">{element}</div>

  )

}

export default App
