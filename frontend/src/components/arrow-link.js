import React from 'react';
import { bool, func, string } from 'prop-types';
import classNames from 'classnames';
import { ArrowIcon } from './arrow-icon';

export const ArrowLink = ({ text, link, onClick, back, secondary }) => (
  <a
    className={classNames('arrow-link', { secondary, back })}
    href={link}
    onClick={onClick}
    target={!onClick ? '_blank' : ''}
    rel='noopener noreferrer'
  >
    {!back && <span>{text}</span>}
    <ArrowIcon style={back && { transform: 'rotate(180deg)' }} />
    {back && <span>{text}</span>}
  </a>
);

ArrowLink.propTypes = {
  text: string.isRequired,
  link: string,
  onClick: func,
  back: bool,
  secondary: bool,
};

ArrowLink.defaultProps = {
  link: null,
  onClick: null,
  back: false,
  secondary: false,
};
