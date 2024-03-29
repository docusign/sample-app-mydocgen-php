import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import moment from 'moment';
import { CaseForm, CaseLayout } from '../../components';
import { FormValues } from '../../services/formValues';
import { Steps, Stepper, Recipients, Details, Manager, SentList } from './components';
import { useHrLetterMutation, useLazyHrLetterTemplateQuery } from '../../api';
import { Feedback } from '../../components/feedback';
import { openLinkInNewTab } from '../../services/openSeperateTab';

export const HrLetter = () => {
  const { t } = useTranslation('HrLetter');
  const [step, setStep] = useState(Steps.recipients);
  const [loadTemplateLink] = useLazyHrLetterTemplateQuery();
  const [hrLetter, status] = useHrLetterMutation();

  const goNext = () => {
    setStep(step + 1);
  };
  const goBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = ({ recipients, manager }) => {
    if (step < Steps.manager) {
      goNext();
      return;
    }
    hrLetter({
      applicants: recipients
        .filter((r) => r.selected)
        .map(({ name, emailUpdated, position, salary, startDate, dueDate }) => ({
          full_name: name,
          email: emailUpdated,
          position,
          start_date: moment(startDate).format('MM-DD-Y'),
          end_date: moment(dueDate).format('MM-DD-Y'),
          salary: salary.toString(),
        })),
      manager: {
        full_name: `${manager.firstName} ${manager.lastName}`,
        email: manager.email,
      },
    });
  };

  const handleOpenTemplate = async () => {
    openLinkInNewTab(loadTemplateLink().unwrap(), t('OpeningTheDocument'), t('TitleForSecondTab'));
  };

  return (
    <CaseLayout title={t('Title')} apiDescription={parse(t('ApiDescription'))}>
      <FormValues formName='HrLetter'>
        {status.isUninitialized && (
          <CaseForm onSubmit={handleSubmit} onTemplateClick={handleOpenTemplate}>
            <Stepper step={step} />
            {step === Steps.recipients && <Recipients onNext={goNext} />}
            {step === Steps.details && <Details onBack={goBack} />}
            {step === Steps.manager && <Manager onBack={goBack} />}
          </CaseForm>
        )}
        {!status.isUninitialized && (
          <Feedback
            isLoading={status.isLoading}
            isError={status.isError}
            successMessage={t('Success.Message')}
            successLinkText={t('Success.LinkText')}
            openSuccessLink={handleOpenTemplate}
            errorMessage={status.error?.data?.message}
            onReset={() => {
              window.location.reload();
            }}
          >
            <SentList />
          </Feedback>
        )}
      </FormValues>
    </CaseLayout>
  );
};
