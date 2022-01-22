import React from 'react';
import { IMG } from '../../../../images';
import './Hero.scss';
const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${IMG.bgHero})` }}>
      <div className="container">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">isekai team</h1>
            <p className="hero__text">& Minh Nguyên handsome</p>
            <button className="hero__btn">Sign in</button>
          </div>
          <div className="hero__img">
            <img src={IMG.imgHero} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
