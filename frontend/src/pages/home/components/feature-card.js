import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../../components';

export const FeatureCard = ({
  imgSrc,
  title,
  description,
  featuresDescription,
  buttonTitle,
  onClick,
}) => (
  <div className='card-info'>
    <div className='card-info-image-holder'>
      <img src={imgSrc} alt='' />
    </div>
    <h2 className='card-info-title'>{title}</h2>
    <div className='card-info-button-holder'>
      <PrimaryButton text={buttonTitle} onClick={onClick} />
    </div>
    <div className='card-info-description'>{description}</div>
    <div className='card-info-list'>{featuresDescription}</div>
  </div>
);
FeatureCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  featuresDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
