import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import moment from 'moment';

import { Address, CaseForm, CaseLayout } from '../../components';
import { Loan, PersonalInfo, Lender } from './components';
import { useLazyPersonalLoanTemplateQuery, usePersonalLoanMutation } from '../../api';
import { Feedback } from '../../components/feedback';
import { FormValues } from '../../services/formValues';
import { openLinkInNewTab } from '../../services/openSeperateTab';

export const PersonalLoan = () => {
  const { t } = useTranslation('PersonalLoan');
  const [loadTemplateLink] = useLazyPersonalLoanTemplateQuery();
  const [personalLoan, status] = usePersonalLoanMutation();

  const [formData, setFormData] = useState(null);

  const handleSubmit = async ({
    firstName,
    lastName,
    email,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,
    loanAmount,
    loanRate,
    paymentAmount,
    loanDueDate,
    paymentDay,
    penaltyAmount,
    lenderFirstName,
    lenderLastName,
    lenderEmail,
  }) => {
    const payload = {
      customer: { first_name: firstName, last_name: lastName, email },
      address: {
        line_1: addressLine1,
        line_2: addressLine2,
        city,
        state,
        postal_code: zip,
        country,
      },
      loan: {
        amount: loanAmount,
        rate: loanRate,
        monthly_payment: paymentAmount,
        due_date: moment(loanDueDate).format('MM-DD-Y'),
        monthly_payment_day: parseInt(paymentDay, 10),
        penalty_amount: penaltyAmount,
      },
      lender: {
        first_name: lenderFirstName,
        last_name: lenderLastName,
        email: lenderEmail,
      },
    };

    setFormData(payload);
  };

  const handleOpenTemplate = async () => {
    openLinkInNewTab(loadTemplateLink().unwrap(), t('OpeningTheDocument'), t('TitleForSecondTab'));
  };

  const handleOpenResultLink = async () => {
    openLinkInNewTab(personalLoan(formData).unwrap(), t('OpeningTheDocument'), t('TitleForSecondTab'));
  };

  return (
    <CaseLayout title={t('Title')} apiDescription={parse(t('ApiDescription'))}>
      {!formData && (
        <FormValues formName='PersonalLoan'>
          <CaseForm
            onTemplateClick={handleOpenTemplate}
            onSubmit={handleSubmit}
            buttonLabel={t('Footer.Button')}
          >
            <PersonalInfo />
            <Address />
            <Loan />
            <Lender />
          </CaseForm>
        </FormValues>
      )}
      {formData && (
        <Feedback
          isLoading={status.isLoading}
          isError={status.isError}
          isCallPerformed={status.isSuccess}
          successMessage={t('SuccessMessage')}
          successLinkText={t('SuccessLinkText')}
          dataPreparedMessage={t('DataPreparedMessage')}
          sendDocumentLinkText={t('SendDocumentLinkText')}
          openSuccessLink={handleOpenResultLink}
          errorMessage={status.error?.data?.message}
          onReset={() => {
            setFormData(null);
            status.reset();
          }}
        />
      )}
    </CaseLayout>
  );
};
