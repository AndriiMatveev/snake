import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_PAGES } from '../../constants/routingConstants';
import './MainMenuPage.modules.css';

function MainMenuPage() {
  const navigate = useNavigate();

  const navigateToReactSnake = () => {
    navigate(APP_PAGES.ReactSnake);
  };

  const navigateToReactReduxSnake = () => {
    navigate(APP_PAGES.ReactSnake);
  };

  return (
      <div className='page'>
        <h1>Main Menu</h1>
        <div className='button-container'>
          <button onClick={navigateToReactSnake} className='button'>React Snake</button>
          <button onClick={navigateToReactReduxSnake} className='button'>ReactRedux Snake</button>
        </div>
      </div>
  );
}

export default MainMenuPage;
