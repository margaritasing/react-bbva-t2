import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './Spinner.css'

const Spinner = () => {

    return (
        <div className='SpinnerDiv'>
            <CircularProgress/>
        </div>
    )
}

export default Spinner;