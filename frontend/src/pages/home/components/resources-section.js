import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLink } from '../../../components';

export const ResourcesSection = () => {
  const { t } = useTranslation('Home');
  return (
    <section className='resources-section'>
      <ul>
        <ArrowLink
          text={t('Resources.PhpSignatureSdk')}
          link='https://developers.docusign.com/docs/esign-rest-api/sdks/php/'
          secondary
        />
        <ArrowLink
          text={t('Resources.PhpAdminSdk')}
          link='https://github.com/docusign/docusign-admin-php-client'
          secondary
        />
      </ul>
    </section>
  );
};
