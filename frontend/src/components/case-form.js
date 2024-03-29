import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ArrowLink } from './arrow-link';
import { PrimaryButton } from './button';
import { useFormValues } from '../services/formValues';

export const CaseForm = ({
  children,
  buttonLabel,
  onTemplateClick,
  onSubmit,
  headerTitle,
}) => {
  const { t } = useTranslation('Common');
  const [validated, setValidated] = useState(false);
  const { values } = useFormValues();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      document.querySelector('.form-control:invalid,.form-select:invalid').focus();
    } else {
      onSubmit(values);
    }
  };

  return (
    <>
      <Card.Header>
        <h5>{headerTitle ?? t('Header.Title')}</h5>
        <ArrowLink text={t('Header.TemplateLink')} onClick={onTemplateClick} />
      </Card.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Card.Body>{children}</Card.Body>
        {buttonLabel && (
          <Card.Footer>
            <PrimaryButton type='submit' text={buttonLabel} />
          </Card.Footer>
        )}
      </Form>
    </>
  );
};

CaseForm.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  onSubmit: PropTypes.func.isRequired,
  onTemplateClick: PropTypes.func.isRequired,
  headerTitle: PropTypes.string,
};

CaseForm.defaultProps = {
  buttonLabel: null,
  headerTitle: null,
};
