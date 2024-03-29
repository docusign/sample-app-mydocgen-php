import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Accordion, Col } from 'react-bootstrap';

export const ApiDescription = ({ description }) => {
  const { t } = useTranslation('Common');
  return (
    <Col lg={4}>
      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            <h5>{t('ApiDescription.Title')}</h5>
          </Accordion.Header>
          <Accordion.Body>{description}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  );
};

ApiDescription.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  description: PropTypes.array.isRequired,
};
