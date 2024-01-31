import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


// IMPORT ICONS
import { FaExchangeAlt } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

function App() {

  const [screen, setScreen] = useState(1);

  // USER DATA
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const [warnAlert, setWarnAlert] = useState({show: false, title: null, text: null});


  // FUNÇÕES ===================================>

  const handleChangeScreen = () => {
    document.title = screen == 1 ? 'Register' : 'Login';

    setScreen(screen == 1 ? 2 : 1)
  }

  // CONTROLE DE INSERÇÃO DE DADOS
  const handleUsername = ({target: {value}}) => setUsername(value);

  const handleEmail = ({target: {value}}) => setEmail(value);

  const handlePassword = ({target: {value}}) => setPassword(value);



  const handleScreenFunction = async () => {

    const functionalEmail = email ? email.indexOf('@') : null;

    switch(screen){
      case 1:
        try{
          if(email && functionalEmail && password){
            console.warn('ESTOU AQUI!');
  
            const response = await axios.get('http://localhost:3000/auth/login', {
              params:{
                email: email,
                password: password,
              }
            })
  
            console.warn('RESPONSE:', response);
  
            if(response.status == 200 && response.data){
              setWarnAlert({show: true, title: 'Bem vindo de volta ', text: `Seja bem vindo(a) de volta, ${response.data.username}!`});
            }

          } else {
            setWarnAlert({show: true, title: 'Erro', text: 'Digite corretamente os dados antes de continuar.'});
          }

        } catch (error) {
          if(error.response.status == 500){
            console.error('ERROR - LOGIN SERVER FUNCTION:', error);
          }
          setWarnAlert({show: true, title: 'Erro', text: `Não foi possível encontrar os dados da sua conta!`});
        }
        break;

      case 2:
        try{

          if(username && email && functionalEmail && password){
            const response = await axios.post('http://localhost:3000/auth/register', {
              data: {
                username: username,
                email: email,
                password: password,
              }
            });
  
            console.warn('REGISTER RESPONSE:', response);
  
            if(response.status == 200){
              setWarnAlert({show: true, title: 'Erro', text: `Parece que existe um outro usuário utilizando seus dados de ${response.data === 'USERNAME' ? 'nome de usuário' : 'email'}!`});

            } else {
              setWarnAlert({show: true, title: 'Aviso', text: `Sua conta foi criada com sucesso!`});
            }

          } else {
            setWarnAlert({show: true, title: 'Erro', text: 'Digite corretamente os dados antes de continuar.'});
            
          }
        } catch (error) {
          setWarnAlert({show: true, title: 'Erro', text: 'Não foi possível realizar seu cadastro em nossa plataforma!\n\nTente novamente em alguns instantes.'});
          
        }
        break;

      default:
        break;
    }
  }

  return (
    <div className="App">

      {warnAlert.show == true && (
        <div className='alert-area'>
          <div className='overflow'/>

          <div className='box-alert'>
            <button className='close-alert-btn' onClick={() => setWarnAlert({show: false, title: null, text: null})}>
              <IoIosCloseCircle size={24} color={'black'}/>
            </button>

            <h1 className='title-alert'>{warnAlert.title}</h1>
            <p className='text-alert'>{warnAlert.text}</p>
          </div>
        </div>
      )}


      <button className='turn-form-button' onClick={() => handleChangeScreen()}>
        <FaExchangeAlt size={24} color={'#333'}/>
      </button>

      {screen == 1 ? (
        <div className='screen'>
          <section className='spacing' style={{backgroundColor: '#d75413'}}>
            <h1 className='title-form'>Login</h1>
            <p className='text-form'>Insira seus dados para realizar seu login em nossa plataforma!</p>
          </section>

          <section className='spacing' style={{backgroundColor: '#333'}}>
            <div className='form-spacing'>
              <div className='input-area'>
                <p className='label-input'>Email:</p>
                <input className='input' type='text' value={email} onChange={handleEmail} placeholder='Email'/>
              </div>

              <div className='input-area'>
                <p className='label-input'>Senha:</p>
                <input className='input' type='password' value={password} onChange={handlePassword} placeholder='Senha'/>
              </div>

              <button className='button-form' onClick={handleScreenFunction}>
                <spam className='text-btn-form'>Login</spam>
              </button>
            </div>

          </section>
        </div>
      ) : (
        <div className='screen'>
          <section className='spacing' style={{backgroundColor: '#333'}}>
            <div className='form-spacing'>
              <div className='input-area'>
                <p className='label-input'>Nome de usuário:</p>
                <input className='input' type='text' value={username} onChange={handleUsername} placeholder='Nome de usuário'/>
              </div>

              <div className='input-area'>
                <p className='label-input'>Email:</p>
                <input className='input' type='text' value={email} onChange={handleEmail} placeholder='Email'/>
              </div>

              <div className='input-area'>
                <p className='label-input'>Senha:</p>
                <input className='input' type='password' value={password} onChange={handlePassword} placeholder='Senha'/>
              </div>

              <button className='button-form' onClick={handleScreenFunction}>
                <spam className='text-btn-form'>Registrar</spam>
              </button>
            </div>

          </section>

          <section className='spacing' style={{backgroundColor: '#d75413'}}>
            <h1 className='title-form'>Registre-se</h1>
            <p className='text-form'>Insira seus dados nos campos abaixo para que você possa realizar o registro em nossa plataforma e ter acesso a todos os nossos serviços!</p>
          </section>

        
        </div>
      )}
    </div>
  );
}

export default App;
