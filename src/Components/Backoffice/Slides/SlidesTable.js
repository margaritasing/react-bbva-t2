import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Get, Delete } from '../../../Services/privateApiService';
import './SlidesTable.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SLIDES;

const SlidesTable = () => {
  const [slidesData, setSlidesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState('');

  const deleteSlide = async () => {
    const res = await Delete(endpoint +'/' + selectedSlide.id)
    if(res.data.success){
      fetchSlidesData();
      handleClose();
    }
  }

  const fetchSlidesData = async () => {
      const res = await Get (endpoint + "?");
      const { data } = res.data;
      setSlidesData(data); 
  };

  useEffect(() => {
    fetchSlidesData();
  }, []);

  const handleClickOpen = (user) => {
    setSelectedSlide(user);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedSlide('');
    setOpen(false);
  };

  return (
    <div className='slides-table-container'>
        <table className='slides-table' >
          <thead>
            <tr className='slides-table-header'>
                <th className='slide-th'>Nombre</th>
                <th className='slide-th'>Descripcion</th>
                <th className='slide-th'>Foto</th>
                <th className='slide-th'>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {slidesData.map( (slide) =>{
                return(
                    <tr key={slide.id} className='slide-row-data'>
                        <td className='slide-text'>
                          {slide.name}
                        </td>

                        <td className='slide-text'>
                          {slide.description}
                        </td>

                        <td className='slide-text'>
                          <div className='slide-container-img'>
                            <img className='slide-img' alt={`${slide.name} avatar`} src={slide.image}/>
                          </div>
                        </td>

                        <td>
                            <Link to={`/backoffice/slides/edit/${slide.id}`}>
                              <button className='primary-backoffice-button'>
                                Editar
                              </button>
                            </Link> 
                        </td>

                        <td>
                            <button onClick={() => handleClickOpen(slide)} 
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
            <h2>¿Estas seguro de querer borrar el testimonio de {selectedSlide.name} ?</h2>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>Cancelar</Button>
            <Button variant="outlined" color="error" onClick={deleteSlide}>Borrar</Button>
          </DialogActions>
        </Dialog>
        
    </div>
  )
}

export default SlidesTable

