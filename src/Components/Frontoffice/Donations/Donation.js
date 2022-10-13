import { useHistory } from "react-router-dom";
import { useState } from 'react'
import React from 'react';
import Alert from '../../Alerts/Alerts'
import { validCardNumber, validCodeLength, validAmount } from '../../../features/validations/creditCardValidations';

import './Donation.css';

const Donation = (props) => {
    const history = useHistory();
    
    const [initialValues, setInitialValues] = useState({
        name: '',
        creditNumber: '',
        id: '',
        securityCode: ''
    })

    const handleChange = (e) => {
        setInitialValues({...initialValues, [e.target.name] : e.target.value});
    }
    
    //chequeo si los campos estan completos o son vacios
    const isBlank = () => {
        let keys = Object.keys(initialValues);
        //en el for hago keys.lenght-1 para evitar verificar el campo logo en este lugar
        for (let i = 0; i < keys.length; i++) {
            let str = initialValues[keys[i]];
            if (!str || /^\s*$/.test(str)) {
                return true;
            }
        }     
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isBlank()) {
            return Alert('Error', 'Debes completar todos los campos', 'error');
        }
        //tarjeta de prueba 4111111111111111
        if (!validCardNumber(initialValues.creditNumber)) {
            return Alert('Error', 'el numero de la tarjeta es invalido', 'error');
        }
        if (!validCodeLength(initialValues.securityCode)) {
            return Alert('Error', 'El codigo de seguridad es invalido', 'error');
        }
        if (!validAmount(initialValues.amount)) {
            return Alert('Error' , 'No puedes ingresar un valor menor a 0', 'error');
        }
        history.push({
            pathname: '/gracias',
            state: { contribution: initialValues.amount}
        })
    }

    return (
        <>
        <h2 className="donation-h2">Ingrese los datos de su tarjeta para realizar la donación</h2>
        <div id='popUp' className='pop-up-container pop-up-container-hidden'>
            <form className='pop-up-form' onSubmit={handleSubmit}>
                <input className='pop-up-form__input' type='text' name='name' onChange={handleChange} placeholder='Nombre'></input>
                <input className='pop-up-form__input' type='text' name='creditNumber' onChange={handleChange} placeholder='Numero de tarjeta'></input>
                <input className='pop-up-form__input' type='text' name='id' onChange={handleChange} placeholder='Numero de dni'></input>
                <input className='pop-up-form__input' type='text' name='securityCode' onChange={handleChange} placeholder='Codigo de seguridad'></input>
                <input className='pop-up-form__input' type='number' name='amount' onChange={handleChange} placeholder='Donacion'></input>
                <button className='secondary-button pop-up-form__button' type='submit'>Donar</button>
            </form>
        </div>
        </>
    )
}


export default Donation;