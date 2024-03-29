import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Address, Input, PhoneInput } from '../../../components';

export const Employer = () => {
  const { t } = useTranslation('LegalForm');
  return (
    <section>
      <h6 className='mb-3'>{t('Employer.Title')}</h6>
      <Row>
        <Input
          className='col-sm-6 mb-3'
          label={t('Employer.Company')}
          controlId='employer.company'
          required
        />
        <Input
          className='col-sm-6 mb-3'
          label={t('Employer.Contact')}
          controlId='employer.contact'
          required
        />
      </Row>
      <Row className='mb-3'>
        <PhoneInput
          className='col-sm-6'
          label={t('Employer.Phone')}
          controlId='employer.phone'
          required
        />
        <Input
          className='col-sm-6 mb-3'
          label={t('Employer.Email')}
          controlId='employer.email'
          required
          type='email'
        />
      </Row>
      <Address title={t('EmployerAddress')} prefix='employer.' />
    </section>
  );
};
