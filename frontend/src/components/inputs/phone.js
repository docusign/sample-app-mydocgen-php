import { Form, Row } from 'react-bootstrap';
import countryCodes from 'country-calling-code';
import { bool, string } from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import iconInfo from '../../assets/img/icon-info.svg';
import { useFormValues } from '../../services/formValues';

export const PhoneInput = ({ label, controlId, className, required, info }) => {
  const { t } = useTranslation('Common');
  const { values, changeValue } = useFormValues();
  const sortable = (code) => code.replace('-', '').padEnd(6, '0');
  const currentValue = _.get(values, controlId);

  const onCodeChange = (e) => {
    changeValue(controlId, { code: e.target.value, number: currentValue?.number });
  };

  const onNumberChange = (e) => {
    changeValue(controlId, { code: currentValue?.code, number: e.target.value });
  };

  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label className={required && 'required'}>{label}</Form.Label>
      <Row className='phone'>
        <div className='mb-3 col-xl-5'>
          <Form.Select value={currentValue?.code ?? '+1 (US)'} onChange={onCodeChange}>
            {countryCodes
              .sort((a, b) => sortable(a.countryCodes[0]) - sortable(b.countryCodes[0]))
              .map((c) => (
                <option key={`${controlId}_${c.isoCode2}`}>
                  +{c.countryCodes[0]} ({c.isoCode2})
                </option>
              ))}
          </Form.Select>
        </div>
        <div className='mb-3 col-xl-7'>
          <Form.Control
            type='tel'
            pattern='[0-9]{9,14}'
            required={required}
            value={currentValue?.number ?? ''}
            onChange={onNumberChange}
          />
          <Form.Control.Feedback type='invalid'>
            {t('PhoneInvalid')}
          </Form.Control.Feedback>
        </div>
        {info && (
          <Form.Text className='phone-hint'>
            <img src={iconInfo} alt='' />
            {info}
          </Form.Text>
        )}
      </Row>
    </Form.Group>
  );
};

PhoneInput.propTypes = {
  label: string.isRequired,
  controlId: string.isRequired,
  className: string,
  required: bool,
  info: string,
};

PhoneInput.defaultProps = {
  className: null,
  required: false,
  info: null,
};
