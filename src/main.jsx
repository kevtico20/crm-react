import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente'
import Index, { loader as clientesLoader } from './pages/Index'
import ErrorPage from './components/ErrorPage'
import Editar,{loader as editarLoader, action as editarAction} from './pages/Editar'
import {action as eliminarClienteAction} from './components/Cliente'


const router = createBrowserRouter([{
  path: '/',
  element: <Layout></Layout>,
  children: [
    {
      index: true,
      element: <Index></Index>,
      loader: clientesLoader,
      errorElement: <ErrorPage></ErrorPage>
    },
    {
      path: '/clientes/nuevo',
      element: <NuevoCliente></NuevoCliente>,
      action: nuevoClienteAction,
      errorElement:<ErrorPage></ErrorPage>
    },
    {
      path:'/clientes/:clienteId/editar',
      element:<Editar></Editar>,
      loader:editarLoader,
      errorElement:<ErrorPage></ErrorPage>,
      action:editarAction
    },  
    {
      path:'/clientes/:clienteId/eliminar',
      action:eliminarClienteAction
    }
  ]
},
{

}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
