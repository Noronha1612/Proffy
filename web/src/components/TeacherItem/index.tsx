import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
          <header>
            <img src="https://avatars1.githubusercontent.com/u/56375499?s=460&u=b2e69ac18ca2159e016598a84d44c69a97bc4829&v=4" alt="Noronha"/>
            <div>
              <strong>Gabriel Noronha</strong>
              <span>Matemática</span>
            </div>
          </header>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <footer>
            <p>
              Preço/hora
              <strong>R$ 50,00</strong>
            </p>
            <button>
              <img src={whatsappIcon} alt="whatsapp"/>
              Entrar em contato
            </button>
          </footer>
        </article>
  );
}

export default TeacherItem;