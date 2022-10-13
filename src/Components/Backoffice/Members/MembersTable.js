import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Get, Delete } from '../../../Services/privateApiService';
import './MembersTable.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_MEMBERS

const MembersTable = () => {
  const [membersData, setMembersData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');
  
  
  const deleteMember = async () => {
    const res = await Delete(endpoint +'/' + selectedMember.id)
    if(res.data.success){
      fetchMembersData();
      handleClose();
    }
  }

  const fetchMembersData = async () => {
      const res = await Get (endpoint + "?limit=10");
      const { data } = res.data;
      setMembersData(data); 
  };
  
  useEffect(() => {
    fetchMembersData();
  }, []);


  const handleClickOpen = (user) => {
    setSelectedMember(user);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedMember('');
    setOpen(false);
  };
  


  return (
    <div className='members-table-container'>
      <table className='members-table' >
        <thead>
          <tr className='members-table-header'>
              <th className='member-th'>Nombre</th>
              <th className='member-th'>Foto</th>
              <th className='member-th'>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {membersData.map( (member) =>{
              return(
                  <tr key={member.id} className='member-row-data'>
                      <td className='member-text'>
                        {member.name}
                      </td>

                      <td className='member-text'>
                        <div className='member-container-img'>
                          <img className='member-img' alt={`${member.name} avatar`} src={member.image}/>
                        </div>
                      </td>

                      <td className='member-text'>
                          <Link to={`/backoffice/members/edit/${member.id}`}>
                            <button className='primary-backoffice-button'>
                              Editar
                            </button>
                          </Link> 
                      </td>

                      <td className='member-text'>
                          <button onClick={() => handleClickOpen(member)} 
                                  className='secondary-backoffice-button'>
                            Borrar
                          </button>
                      </td>
                  </tr>
              )
          })}
        </tbody>
      </table>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent id="alert-dialog-title">
          <h2>¿Estas seguro de querer borrar al miembro {selectedMember.name} ?</h2>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Cancelar</Button>
          <Button variant="outlined" color="error" onClick={deleteMember}>Borrar</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default MembersTable


