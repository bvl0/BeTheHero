import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import './styles.css'
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../Services/api'
import api2 from '../../Services/api2.js';
import logo from '../../assets/logo.svg'


export default function Profile(){
    const ongName= localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    
    useEffect(()=>{
        api2.get('incidents').then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api2.delete(`incidents/${id}`, {
            });
        
        setIncidents(incidents.filter(incident => incident.id !== id))
        }
        catch(err){
            alert('erro ao deletar')

        }
    }

    function handelLogout(){
        localStorage.clear();

        history.push('/')
    }
    return(
        <div className="profile-container">
            <header>
            <img src={logo} alt="logo"/>
            <span>Bem vinda, {ongName}</span>

            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button onClick={handelLogout}>
                <FiPower size={18} color="#e02041" />
            </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2  size={20} color="#a8a8b3"/>                 
                        </button >
                    </li>
                ))}
            </ul>
        </div>
    )
}