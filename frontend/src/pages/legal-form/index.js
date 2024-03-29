import React from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import moment from 'moment';
import { Address, CaseForm, CaseLayout } from '../../components';
import {
  Employer,
  PersonalInfo,
  Employment,
  Details,
  WorkedAddress,
  Answer,
} from './components';
import { useLazyLegalFormTemplateQuery, useLegalFormMutation } from '../../api';
import { FormValues } from '../../services/formValues';
import { Feedback } from '../../components/feedback';
import { openLinkInNewTab } from '../../services/openSeperateTab';

export const LegalForm = () => {
  const { t } = useTranslation('LegalForm');
  const [loadTemplateLink] = useLazyLegalFormTemplateQuery();
  const [legalForm, status] = useLegalFormMutation();

  const handleOpenTemplate = async () => {
    openLinkInNewTab(loadTemplateLink().unwrap(), t('OpeningTheDocument'), t('TitleForSecondTab'));
  };

  const translate = (str) => str && t(`Employment.${str}`);

  const handleSubmit = (form) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      country,
    } = form;

    const client = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: `+${parseInt(phone.code, 10)}${phone.number}`,
      address: {
        line_1: addressLine1,
        line_2: addressLine2,
        city,
        state,
        postal_code: zip,
        country,
      },
    };

    const {
      employeeOrApplicant,
      everEmployed,
      appliedPosition,
      stillEmployed,
      employmentStartDate,
      lastDateEmployed,
      leavingReason,
      leavingReasonDescription,
      responsibilities,
    } = form;

    const survey = {
      job_status: translate(employeeOrApplicant),
      worked_here_before: translate(everEmployed),
      applied_to_available_position: translate(appliedPosition),
      still_employed: translate(stillEmployed),
      start_date:
        everEmployed === Answer.yes
          ? moment(employmentStartDate).format('MM-DD-Y')
          : null,
      last_employed_date:
        everEmployed === Answer.yes && stillEmployed === Answer.no
          ? moment(lastDateEmployed).format('MM-DD-Y')
          : null,
      leaving: {
        reason:
          everEmployed === Answer.yes && stillEmployed === Answer.no
            ? translate(leavingReason)
            : null,
        description: leavingReason === Answer.other ? leavingReasonDescription : null,
      },
      responsibility: responsibilities,
    };

    const { employer } = form;

    const employerData = {
      company_name: employer.company,
      contact_name: employer.contact,
      phone: `+${parseInt(employer.phone.code, 10)}${employer.phone.number}`,
      address: {
        line_1: employer.addressLine1,
        line_2: employer.addressLine2,
        city: employer.city,
        state: employer.state,
        postal_code: employer.zip,
        country: employer.country,
      },
    };

    const { workedAddress } = form;

    const workAddress = {
      matches: form.workedAddressSameAsEmployer,
      line_1: workedAddress?.addressLine1,
      line_2: workedAddress?.addressLine2,
      city: workedAddress?.city,
      state: workedAddress?.state,
      postal_code: workedAddress?.zip,
      country: workedAddress?.country,
    };

    const { issue, resolution } = form;

    legalForm({
      client,
      survey,
      employer: employerData,
      work_address: workAddress,
      appeal: {
        description: issue,
        how_to_solve: resolution,
      },
    });
  };

  return (
    <CaseLayout title={t('Title')} apiDescription={parse(t('ApiDescription'))}>
      {status.isUninitialized && (
        <FormValues formName='LegalForm'>
          <CaseForm
            buttonLabel={t('Footer.Button')}
            onTemplateClick={handleOpenTemplate}
            onSubmit={handleSubmit}
          >
            <PersonalInfo />
            <Address />
            <Employment />
            <Employer />
            <WorkedAddress />
            <Details />
          </CaseForm>
        </FormValues>
      )}
      {!status.isUninitialized && (
        <Feedback
          isLoading={status.isLoading}
          isError={status.isError}
          successMessage={t('SuccessMessage')}
          successLinkText={t('SuccessLinkText')}
          successLink={status.data}
          errorMessage={status.error?.data?.message}
          onReset={() => {
            status.reset();
          }}
        />
      )}
    </CaseLayout>
  );
};
