import React,{useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import './styles.css'; // importando o css
import Logo from '../../assets/logo.svg';
import { FiLogIn} from 'react-icons/fi';
import HeroesImg from '../../assets/heroes.png';//importando a imagem
import api from '../../services/api';

export default function Logon(){//criando um componente

    const [id,setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions',{ id });

            localStorage.setItem('ong_id',id);//guarda o id da ong no localStorage
            
            localStorage.setItem('ong_name', response.data.name);//guarda o nome da ong no localStorage

            history.push('/profile');

        }catch(error){

            alert('Falha no Login, tente novamente mais tarde');

        }
    }
    return (//retorna o html em baixo e o Logon e renderizado no App.js
        <div className="logon-container">
            
            <section className="form">

                <img src={Logo} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça Seu Logon</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit"className="button">Entrar</button>

                   <Link className="backlink" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não Tenho Cadastro
                    </Link>
                </form>

            </section>
            <img src={HeroesImg} alt="Heroes"/>
        </div>
    );
}