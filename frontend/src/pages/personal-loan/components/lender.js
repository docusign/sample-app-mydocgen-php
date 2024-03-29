import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../components';

export const Lender = () => {
  const { t } = useTranslation('PersonalLoan');
  return (
    <section>
      <h6 className='mb-3'>{t('Lender.Title')}</h6>
      <Row>
        <Input
          className='col-sm-6 mb-3'
          label={t('Lender.FirstName')}
          controlId='lenderFirstName'
          required
        />
        <Input
          className='col-sm-6 mb-3'
          label={t('Lender.LastName')}
          controlId='lenderLastName'
          required
        />
      </Row>
      <Row>
        <Input
          className='col-sm-6 mb-3'
          label={t('Lender.Email')}
          controlId='lenderEmail'
          required
          type='email'
        />
      </Row>
    </section>
  );
};
