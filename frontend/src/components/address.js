import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import { string } from 'prop-types';
import codes from 'country-calling-code';
import { Input, Select } from './inputs';

const countries = codes.map((c) => c.country).sort();

export const Address = ({ title, prefix }) => {
  const { t } = useTranslation('Common');
  return (
    <section>
      <h6 className='mb-3'>{title ?? t('Address.Title')}</h6>
      <Row>
        <Input
          label={t('Address.Line1')}
          className='col-sm-6 mb-3'
          controlId={`${prefix}addressLine1`}
          required
        />
        <Input
          label={t('Address.Line2')}
          className='col-sm-6 mb-3'
          controlId={`${prefix}addressLine2`}
        />
      </Row>
      <Row>
        <Col sm={6} className='mb-3'>
          <Input
            className='mb-3'
            label={t('Address.City')}
            controlId={`${prefix}city`}
            required
          />
          <Select
            options={countries}
            label={t('Address.Country')}
            controlId={`${prefix}country`}
            required
          />
        </Col>
        <Col sm={6}>
          <Row>
            <Input
              label={t('Address.State')}
              className='col-xxl-8 mb-3'
              controlId={`${prefix}state`}
              required
            />
            <Input
              label={t('Address.Zip')}
              className='col-xxl-4 mb-3'
              controlId={`${prefix}zip`}
              required
              pattern={'\\d{1,9}'}
            />
          </Row>
        </Col>
      </Row>
    </section>
  );
};

Address.propTypes = {
  title: string,
  prefix: string,
};

Address.defaultProps = {
  title: null,
  prefix: '',
};
