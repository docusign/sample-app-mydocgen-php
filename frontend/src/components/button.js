import React from 'react';
import { bool, func, string } from 'prop-types';
import { ArrowIcon } from './arrow-icon';

export const PrimaryButton = ({ text, type, onClick, disabled, hideArrow }) => (
  <button type={type} className='btn btn-primary' onClick={onClick} disabled={disabled}>
    <span>{text}</span>
    {!hideArrow && <ArrowIcon />}
  </button>
);

PrimaryButton.propTypes = {
  text: string.isRequired,
  type: string,
  onClick: func,
  disabled: bool,
  hideArrow: bool,
};

PrimaryButton.defaultProps = {
  type: 'button',
  onClick: null,
  disabled: false,
  hideArrow: false,
};

export const SecondaryButton = ({ text, onClick }) => {
  return (
    <button type='button' className='btn btn-secondary' onClick={onClick}>
      {text}
    </button>
  );
};

SecondaryButton.propTypes = {
  text: string.isRequired,
  onClick: func,
};

SecondaryButton.defaultProps = { onClick: () => {} };
