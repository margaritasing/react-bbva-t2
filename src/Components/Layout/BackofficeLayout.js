import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../Backoffice/Header/Header';
import { getIsAdmin } from '../Backoffice/RoutesSecurity/RoutesSecurity';

const BackofficeLayout = ({children}) => {
  const [tokenAdmin, setTokenAdmin] = useState()

  //verifico si localStorage tiene isAdmin, en caso de que no lo tenga, llama a la función en el RoutesSecurity
  const checkIsAdmin = async () => {
    let result = await getIsAdmin()
    setTokenAdmin(localStorage.getItem('isAdmin'))
    return result;
  } 

  useEffect(() => {
      checkIsAdmin();
  },[])

    return (
      <>
        {//Si no es admin, redirige al home.
          (tokenAdmin == 'false') && <Redirect to="/" />
        }
        <Header/>
        <main>
          { children }
        </main>
      </>
    )
  }
  
  export default BackofficeLayout