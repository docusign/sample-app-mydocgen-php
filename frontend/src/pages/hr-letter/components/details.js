import React, { useEffect } from 'react';
import { Card, Row } from 'react-bootstrap';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  CurrencyInput,
  Input,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import { useFormValues } from '../../../services/formValues';

export const Details = ({ onBack }) => {
  const { t } = useTranslation('HrLetter');
  const {
    values: { recipients },
    changeValue,
  } = useFormValues();

  useEffect(() => {
    for (let i = 0; i < recipients.length; i += 1) {
      changeValue(`recipients[${i}].emailUpdated`, recipients[i].email);
    }
  }, []);

  return (
    <>
      {recipients.map(
        (r, i) =>
          r.selected && (
            <section className='recipient-details' key={r.name}>
              <span className='name'>{r.name}</span>
              <Row>
                <Input
                  className='col-sm-6 mb-3'
                  label={t('Details.Email')}
                  controlId={`recipients[${i}].emailUpdated`}
                  required
                />
              </Row>
              <Row>
                <Input
                  className='col-sm-6 mb-3'
                  label={t('Details.Position')}
                  controlId={`recipients[${i}].position`}
                  required
                />
                <CurrencyInput
                  className='col-sm-6 mb-3'
                  label={t('Details.Salary')}
                  controlId={`recipients[${i}].salary`}
                  required
                  step='1'
                />
              </Row>
              <Row>
                <Input
                  className='col-sm-6 mb-3'
                  label={t('Details.StartDate')}
                  controlId={`recipients[${i}].startDate`}
                  required
                  type='date'
                />
                <Input
                  className='col-sm-6 mb-3'
                  label={t('Details.DueDate')}
                  controlId={`recipients[${i}].dueDate`}
                  required
                  type='date'
                />
              </Row>
            </section>
          ),
      )}
      <Card.Footer>
        <SecondaryButton text={t('Footer.Prev')} onClick={onBack} />
        <PrimaryButton text={t('Footer.Next')} hideArrow type='submit' />
      </Card.Footer>
    </>
  );
};

Details.propTypes = {
  onBack: func.isRequired,
};
