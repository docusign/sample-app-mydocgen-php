import React from 'react';
import { bool, oneOf, string } from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const Steps = {
  recipients: 1,
  details: 2,
  manager: 3,
};
const Step = ({ current, finished, title, left, middle, right }) => {
  return (
    <div className={classNames('step', { left, middle, right })}>
      <div className={classNames('indicator', { current, finished })} />
      <span className={classNames('title', { current, finished })}>{title}</span>
    </div>
  );
};

Step.propTypes = {
  current: bool.isRequired,
  finished: bool.isRequired,
  title: string.isRequired,
  left: bool,
  middle: bool,
  right: bool,
};

Step.defaultProps = {
  left: false,
  middle: false,
  right: false,
};

const Connector = ({ finished }) => {
  return (
    <div className='connector'>
      <div className={classNames('shape', { finished })} />
    </div>
  );
};
Connector.propTypes = {
  finished: bool.isRequired,
};

export const Stepper = ({ step }) => {
  const { t } = useTranslation('HrLetter');
  return (
    <section>
      <div className='step-ruler'>
        <Connector finished={step > Steps.recipients} />
        <Connector finished={step > Steps.details} />
      </div>
      <Row className='steps-container'>
        <Col>
          <Step
            current={step === Steps.recipients}
            finished={step > Steps.recipients}
            title={t('Recipients.Title')}
            left
          />
        </Col>
        <Col>
          <Step
            current={step === Steps.details}
            finished={step > Steps.details}
            title={t('Details.Title')}
            middle
          />
        </Col>
        <Col>
          <Step
            current={step === Steps.manager}
            finished={false}
            title={t('Manager.Title')}
            right
          />
        </Col>
      </Row>
    </section>
  );
};

Stepper.propTypes = {
  step: oneOf([1, 2, 3]).isRequired,
};
