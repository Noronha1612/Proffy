import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.css';

interface PageHeaderProps {
    titleHeader: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ titleHeader, description, children }) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="back-icon"/>
        </Link>
        <img src={logoImg} alt="logo"/>
      </div>

      <div className="header-content">
        <strong>
            {titleHeader}
        </strong>

        {description && (
          <p className="description">
            {description}
          </p>
        )}

        { children }
      </div>
    </header>
  );
}

export default PageHeader;