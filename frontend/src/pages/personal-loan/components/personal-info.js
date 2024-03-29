import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../components';

export const PersonalInfo = () => {
  const { t } = useTranslation('PersonalLoan');
  return (
    <section>
      <h6 className='mb-3'>{t('PersonalInfo.Title')}</h6>
      <Row>
        <Input
          className='col-sm-6 mb-3'
          label={t('PersonalInfo.FirstName')}
          controlId='firstName'
          required
        />
        <Input
          className='col-sm-6 mb-3'
          label={t('PersonalInfo.LastName')}
          controlId='lastName'
          required
        />
      </Row>
      <Row>
        <Input
          className='col-sm-6 mb-3'
          label={t('PersonalInfo.Email')}
          controlId='email'
          required
          type='email'
        />
      </Row>
    </section>
  );
};
