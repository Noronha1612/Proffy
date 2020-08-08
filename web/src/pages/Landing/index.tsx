import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

import Logo from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/landing.svg';

import StudyIcon from '../../assets/images/icons/study.svg';
import GiveClassesIcon from '../../assets/images/icons/give-classes.svg';
import PurpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

const Landing: React.FC = () => {
    const [ totalConnections, setTotalConnections ] = useState(0);

    useEffect(() => {
        async function loadConnections() {
            try {
                const response = await api.get<{ total: number }>('/connections');

                setTotalConnections(response.data.total);
            }
            catch (err) {
                console.log('Unexpected error: ' + err);
            }
        }

        loadConnections();
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={Logo} alt="logo"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img 
                    src={LandingImg} 
                    alt="hero" 
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={StudyIcon} alt="study"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={GiveClassesIcon} alt="give-classes"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas 
                    <img src={PurpleHeartIcon} alt="purple-heart"/>
                </span>
            </div>
        </div>
    );
}

export default Landing;