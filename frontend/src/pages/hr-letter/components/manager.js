import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Input, PrimaryButton, SecondaryButton } from '../../../components';

export const Manager = ({ onBack }) => {
  const { t } = useTranslation('HrLetter');
  return (
    <>
      <section>
        <Row>
          <Input
            className='col-sm-6 mb-3'
            label={t('Manager.FirstName')}
            controlId='manager.firstName'
            required
          />
          <Input
            className='col-sm-6 mb-3'
            label={t('Manager.LastName')}
            controlId='manager.lastName'
            required
          />
        </Row>
        <Row>
          <Input
            className='col-sm-6 mb-3'
            label={t('Manager.Email')}
            controlId='manager.email'
            required
            type='email'
          />
        </Row>
      </section>
      <Card.Footer>
        <SecondaryButton text={t('Footer.Prev')} onClick={onBack} />
        <PrimaryButton type='submit' text={t('Footer.Sign')} />
      </Card.Footer>
    </>
  );
};

Manager.propTypes = {
  onBack: func.isRequired,
};
