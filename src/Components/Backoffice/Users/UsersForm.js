import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Get, Put, Post } from '../../../Services/privateApiService';
import './UsersForm.css'
import Alert from '../../Alerts/Alerts';

const UserForm = () => {

    const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_USERS
    let { id } = useParams();
    const [error, setError] = useState('')
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        roleId: '',
        password: ''
    })

    const fetchUser = async () => {
        if(id) {
            const res = await Get(`${endpoint + '/' +id}`)
            const {name, email, role_id} = res.data.data
            setInitialValues({
                name, email, roleId: role_id, password:''
            })
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setInitialValues({
            ...initialValues,
            [e.target.name] : e.target.value
        })
    }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
               name: initialValues.name.toString(),
               email: initialValues.email.toString(),
               password: initialValues.password.toString(),
               roleId: initialValues.roleId.toString(),
           }
           
            if(validate()) {
                   if(id) {
                       try{
                           Put(endpoint + '/' + id, body)
                           setError('')
                           Alert('Exito', 'Usuario editado con exito', 'success');
                       } 
                       catch(err){
                           setError(err)
                       }
                       }
                   else {
                         try{
                           Post(endpoint, body)
                           Alert('Exito', 'Usuario creado con exito', 'success');
                           setError('')
                       } 
                       catch(err){
                           setError(err)
                       }
                   }
   } 
}

    const validate = () => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(initialValues.name.length < 4 || !initialValues.name) {
            setError('El nombre es demasiado corto')
            return false
        } 

        if(!initialValues.email.match(re) || !initialValues.email){
            setError('Email inválido')
            return false
        }

        if(initialValues.password.length < 8 || !initialValues.password){
            setError('La contraseña es demasiado corta')
            return false
        }

        if(initialValues.roleId > 2 || initialValues.roleId < 1) {
            setError('Id de rol inválido')
            return false
        }

        return true
    }

    return (
        <div className="main">
            <div className="container">
                {id ? <h1 className="title">Editar usuario</h1> : <h1 className="title">Crear usuario</h1>}
                <form className="form-container" onSubmit={handleSubmit}>
                    {<p className='error'>{error}</p>}
                    <input className="input" type="text" name="name" value={initialValues.name || ''} onChange={handleChange} placeholder="Name"></input>
                    <input id="outlined-basic" variant="outlined" className="input" type="text" name="email" value={initialValues.email || ''} onChange={handleChange} placeholder="Email"></input>
                    <input id="outlined-basic" variant="outlined" className="input" type="password" name="password" value={initialValues.password || ''} onChange={handleChange} placeholder="Password"></input>
                    <select className="select-field" value={initialValues.roleId || ''} onChange={e => setInitialValues({...initialValues, roleId: e.target.value})}>
                        <option value="" disabled >Select the role</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </select>
                    <button className="primary-backoffice-button" type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}
 
export default UserForm;