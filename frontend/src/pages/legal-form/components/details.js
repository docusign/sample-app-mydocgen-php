import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../../components';

export const Details = () => {
  const { t } = useTranslation('LegalForm');
  return (
    <section>
      <h6>{t('Details.Title')}</h6>
      <Text
        className='mb-3'
        controlId='issue'
        label={t('Details.Issue')}
        required
        info={t('Details.IssueInfo')}
      />
      <Text
        className='mb-3'
        controlId='resolution'
        label={t('Details.Resolution')}
        required
      />
    </section>
  );
};
