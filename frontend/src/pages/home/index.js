import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { FeatureCard, ResourcesSection, CTASection } from './components';

import feature1Icon from '../../assets/img/feature1.svg';
import feature2Icon from '../../assets/img/feature2.svg';
import feature3Icon from '../../assets/img/feature3.svg';

export const Home = () => {
  // When the sigining is complete, we are redirected to the homepage 
  // with /?event=<event-name>. In this case, just close the browser tab.
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const eventsToHandle = ['viewing_complete', 'signing_complete'];
    const event = queryParams.get('event');

    if (event && eventsToHandle.includes(event)) {
      window.close();
    }
  }, []);

  const { t } = useTranslation('Home');
  const navigate = useNavigate();

  const handleClick = async (event, redirectUrl) => {
    event.preventDefault();
    navigate(redirectUrl);
  };

  return (
    <div className='home-page'>
      <section className='title-section'>
        <h1>{t('Header1')}</h1>
        <div className='sub-title'>{parse(t('Header2'))}</div>
      </section>
      <section className='features-section'>
        <FeatureCard
          imgSrc={feature1Icon}
          title={parse(t('Card1.Title'))}
          description={parse(t('Card1.Description'))}
          featuresDescription={parse(t('Card1.Features'))}
          buttonTitle={parse(t('Card1.Button'))}
          onClick={(event) => handleClick(event, '/personal_loan')}
        />
        <FeatureCard
          imgSrc={feature2Icon}
          title={parse(t('Card2.Title'))}
          description={parse(t('Card2.Description'))}
          featuresDescription={parse(t('Card2.Features'))}
          buttonTitle={t('Card2.Button')}
          onClick={(event) => handleClick(event, '/hr_letter')}
        />
        <FeatureCard
          imgSrc={feature3Icon}
          title={parse(t('Card3.Title'))}
          description={parse(t('Card3.Description'))}
          featuresDescription={parse(t('Card3.Features'))}
          buttonTitle={parse(t('Card3.Button'))}
          onClick={(event) => handleClick(event, '/legal_form')}
        />
      </section>
      <CTASection />
      <ResourcesSection />
    </div>
  );
};
