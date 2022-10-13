import { useState, useEffect } from 'react';
import { Get, Delete } from '../../../Services/privateApiService';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../Services/validatorsService';
import './CategoriesList.css';

function CategoriesList() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const endpoint = process.env.REACT_APP_CATEGORIES;

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const response = await Get(baseURL + endpoint);
        const categoriesData = await response.data.data;
        setCategories(categoriesData);
    }

    const deleteCategorie = async (id) => {
        const response = await Delete(baseURL + endpoint + `/${id}`);
        const isDeleted = await response.data.success;
        if(isDeleted) {
            getCategories();
        }
    }   

    useEffect(() => {
        getCategories();
    }, [])

    const categoriesRows = categories.map(categorie => (
        <tr key={categorie.id} className="table__row">
            <td className="table__column table__column--data">{categorie.name}</td>
            <td className="table__column table__column--data">
                <div className='categories-table__img-container'>
                    <img className='categories-table__img' alt={categorie.name} src={categorie.image}/>   
                </div>
            </td>
            <td className="table__column table__column--data">{formatDate(categorie.created_at)}</td>
            <td className="table__column table__column--data"><Link className="primary-backoffice-button" to={`/backoffice/categories/edit/${categorie.id}`}>Editar</Link></td>
            <td className="table__column table__column--data"><button className="secondary-backoffice-button" onClick={() => deleteCategorie(categorie.id)}>Borrar</button></td>
        </tr>
    ))

    return ( 
        <div className='categories-table-container'>  
            <table className="table">
                <caption className="table__title">Categorías</caption>
                <thead>
                    <tr className="table__row">
                        <td></td><td></td>
                        <td colSpan={2} className="table__column table__column--btn"><Link className="primary-backoffice-button btn--create" to={'/backoffice/categories/create'}>Crear Categoría</Link></td>
                    </tr>
                    <tr className="table__row">
                    <th scope="col" className="table__column table__column--header">Name</th>
                    <th scope="col" className="table__column table__column--header">Image</th>
                    <th scope="col" className="table__column table__column--header">Created At</th>
                    <th scope="col" className="table__column table__column--header" colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { categoriesRows }
                </tbody>
            </table>
        </div>
     );
}

export default CategoriesList;