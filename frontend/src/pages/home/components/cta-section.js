import React from 'react';
import { useTranslation } from 'react-i18next';
import { PrimaryButton, SecondaryButton } from '../../../components';

export const CTASection = () => {
  const { t } = useTranslation('Home');
  return (
    <section className='cta-section text-center'>
      <div className='container'>
        <h2 className='h2 cta-title'>{t('Footer1')}</h2>
        <div className='cta-description'>{t('Footer2')}</div>
        <div className='cta-button-holder'>
          <a
            href='https://go.docusign.com/o/sandbox/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <PrimaryButton text={t('SandBoxButton')} />
          </a>
          <a
            href='https://developers.docusign.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <SecondaryButton text={t('LearnMoreButton')} />
          </a>
        </div>
      </div>
    </section>
  );
};
