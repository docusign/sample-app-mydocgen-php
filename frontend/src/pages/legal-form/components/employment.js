import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { Input, Question, Text } from '../../../components';
import { useFormValues } from '../../../services/formValues';

export const Answer = {
  employee: 'Employee',
  applicant: 'Applicant',
  yes: 'Yes',
  no: 'No',
  fired: 'Fired',
  quit: 'Quit',
  laidOff: 'LaidOff',
  other: 'Other',
};

export const Employment = () => {
  const { t } = useTranslation('LegalForm');
  const { values, changeValue } = useFormValues();
  const { employeeOrApplicant, everEmployed, stillEmployed, leavingReason } = values;

  useEffect(() => {
    changeValue('stillEmployed', everEmployed);
    if (everEmployed === Answer.no) {
      changeValue('leavingReason', Answer.fired);
    }
  }, [everEmployed]);

  useEffect(() => {
    if (employeeOrApplicant === Answer.employee) {
      changeValue('everEmployed', Answer.yes);
    }
  }, [employeeOrApplicant]);

  useEffect(() => {
    if (stillEmployed === Answer.yes) {
      changeValue('leavingReason', Answer.fired);
    }
  }, [stillEmployed]);

  return (
    <section>
      <h6 className='mb-3'>{t('Employment.Title')}</h6>
      <Row className='mb-3'>
        <Question
          question={t('Employment.EmployeeOrApplicant')}
          options={[
            { title: t('Employment.Employee'), value: Answer.employee },
            { title: t('Employment.Applicant'), value: Answer.applicant },
          ]}
          className='col-sm-6'
          controlId='employeeOrApplicant'
        />
        <Question
          question={t('Employment.DidApplyPosition')}
          options={[
            { title: t('Employment.Yes'), value: Answer.yes },
            { title: t('Employment.No'), value: Answer.no },
          ]}
          className='col-sm-6'
          controlId='appliedPosition'
          disabled={employeeOrApplicant === Answer.employee}
        />
      </Row>
      <Row className='mb-3'>
        <Question
          question={t('Employment.EverEmployed')}
          options={[
            { title: t('Employment.Yes'), value: Answer.yes },
            { title: t('Employment.No'), value: Answer.no },
          ]}
          className='col-sm-6'
          controlId='everEmployed'
          disabled={employeeOrApplicant === Answer.employee}
        />
        <Input
          className='col-sm-6'
          type='date'
          label={t('Employment.StartingDate')}
          controlId='employmentStartDate'
          required
          disabled={everEmployed === Answer.no}
        />
      </Row>
      <Row className='mb-3'>
        <Question
          question={t('Employment.StillEmployed')}
          options={[
            { title: t('Employment.Yes'), value: Answer.yes },
            { title: t('Employment.No'), value: Answer.no },
          ]}
          className='col-sm-6'
          controlId='stillEmployed'
          disabled={everEmployed === Answer.no}
        />
        <Input
          className='col-sm-6'
          type='date'
          label={t('Employment.LastDateEmployed')}
          controlId='lastDateEmployed'
          required
          disabled={stillEmployed === Answer.yes || everEmployed === Answer.no}
        />
      </Row>
      <Row className='mb-3'>
        <Question
          question={t('Employment.LeavingReason')}
          options={[
            { title: t('Employment.Fired'), value: Answer.fired },
            { title: t('Employment.Quit'), value: Answer.quit },
            { title: t('Employment.LaidOff'), value: Answer.laidOff },
            { title: t('Employment.Other'), value: Answer.other },
          ]}
          className='col-sm-6'
          controlId='leavingReason'
          disabled={stillEmployed === Answer.yes || everEmployed === Answer.no}
        />
        {leavingReason === Answer.other && stillEmployed === Answer.no && (
          <Text
            controlId='leavingReasonDescription'
            placeholder={t('Employment.DescribeReason')}
            required
          />
        )}
      </Row>
      <Text
        className='mb-3'
        label={t('Employment.WhatKindOfWork')}
        controlId='responsibilities'
        placeholder={t('Employment.DescribeResponsibilities')}
        required
      />
    </section>
  );
};
