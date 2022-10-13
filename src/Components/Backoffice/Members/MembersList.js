import React from 'react'
import { Link } from 'react-router-dom'
import './MembersList.css'
import MembersTable from './MembersTable'

const MembersList = () => {
  return (
    <div className='members-screen'>
      <div className='members-container'>

        <h1 className='title members-title'>Miembros</h1>

        <div className='members__upper-bar'>
          <Link to='/backoffice/members/create'>
              <button className='create-backoffice-button'>Crear nuevo miembro</button>
          </Link>
        </div>
        
        <MembersTable/>

      </div>
    </div>
  )
}

export default MembersList;