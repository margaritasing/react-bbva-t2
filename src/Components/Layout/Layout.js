import React from 'react';
import PublicHeader from '../Frontoffice/PublicHeader/PublicHeader';
import Footer from '../Frontoffice/Footer/Footer';
import getToken from '../../Services/getToken';
import { useHistory } from 'react-router-dom'

const Layout = ({children}) => {

  let history = useHistory()

  return (
    <>
    {!getToken() ? (history.push('/login')) : (
      <>
      <PublicHeader/>
      <main>
        { children }
      </main>
      <Footer/>
    </>
    )}
    </>
  )
}

export default Layout