import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { CurrencyInput, Input, PercentInput, Select } from '../../../components';

export const Loan = () => {
  const { t } = useTranslation('PersonalLoan');
  return (
    <section>
      <h6 className='mb-3'>{t('Loan.Title')}</h6>
      <Row>
        <CurrencyInput
          className='col-sm-6 mb-3'
          label={t('Loan.Amount')}
          controlId='loanAmount'
          required
        />
        <PercentInput
          className='col-sm-6 mb-3'
          label={t('Loan.Rate')}
          controlId='loanRate'
          required
        />
      </Row>
      <Row>
        <Input
          type='date'
          className='col-sm-6 mb-3'
          controlId='loanDueDate'
          label={t('Loan.DueDate')}
          required
        />
      </Row>
      <Row>
        <CurrencyInput
          className='col-sm-6 mb-3'
          controlId='paymentAmount'
          label={t('Loan.PaymentAmount')}
          required
        />
        <Select
          options={Array.from({ length: 31 }, (_, i) => i + 1)}
          className='col-sm-6 mb-3'
          controlId='paymentDay'
          label={t('Loan.PaymentDate')}
          required
          placeholder={t('Loan.PaymentDateHint')}
        />
      </Row>
      <Row>
        <CurrencyInput
          className='col-sm-6 mb-3'
          label={t('Loan.Penalty')}
          controlId='penaltyAmount'
          required
        />
      </Row>
    </section>
  );
};
