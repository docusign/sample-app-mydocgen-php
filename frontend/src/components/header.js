import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import docIcon from '../assets/img/doc-icon.svg';
import { ArrowLink } from './arrow-link';

export const Header = () => {
  const { t } = useTranslation('Common');
  return (
    <header className='header' role='banner'>
      <div className='container-lg'>
        <nav className='navbar'>
          <Link className='navbar-brand' to='/'>
            <div className='logo'>
              <img src={docIcon} alt='' />
            </div>
            <span>{t('ApplicationName')}</span>
          </Link>
          <ArrowLink
            link='https://github.com/docusign/sample-app-mydocgen-php'
            text={t('GitHubLink')}
          />
        </nav>
      </div>
    </header>
  );
};
