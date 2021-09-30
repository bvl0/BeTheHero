import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import './styles.css'

import api from '../../Services/api'

import logo from '../../assets/logo.svg'
import Heroes from '../../assets/heroes.png';
export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            // const response = await api.post('session', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', id);
            
            history.push('/profile')

        
        }

        catch(err){
            alert('falho');
        }
    }
    
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e =>setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className ="back-link" to="/register">
                        <FiLogIn size = {16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src = {Heroes} alt="Heroes"/>;
        </div>
    );
}