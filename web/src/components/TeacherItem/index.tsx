import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

import api from '../../services/api';

interface TeacherItemProps {
  teacher_id: number;
  avatar: string;
  name: string;
  subject: string;
  bio: string;
  cost: number;
  whatsapp: string;
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {

  function convertCurrencyToReal(cost: number) {
    return `R$ ${cost.toFixed(2).replace('.', ',')}`
  }


  async function handleContact() {
    try {
      await api.post('/connections', { user_id: props.teacher_id });

      window.open(`https://wa.me/${props.whatsapp}`)
    }
    catch (err) {
      console.log(`Error while trying contact ${props.name}: ${err}`);
    }
  }

  return (
    <article className="teacher-item">
          <header>
            <img src={props.avatar} alt={props.name} />
            <div>
              <strong>{props.name}</strong>
              <span>{props.subject}</span>
            </div>
          </header>

          <p>
            {props.bio}
          </p>

          <footer>
            <p>
              Preço/hora
              <strong>{convertCurrencyToReal(props.cost)}</strong>
            </p>
            <button onClick={ handleContact }>
              <img src={whatsappIcon} alt="whatsapp"/>
              Entrar em contato
            </button>
          </footer>
        </article>
  );
}

export default TeacherItem;