import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes, { bool, func, string } from 'prop-types';

import { PrimaryButton } from './button';
import iconProcessing from '../assets/img/icon-processing.svg';
import iconSuccess from '../assets/img/icon-success.svg';
import iconError from '../assets/img/icon-error.svg';
import { ArrowLink } from './arrow-link';

export const Feedback = ({
  isLoading,
  isError,
  isCallPerformed,
  successMessage,
  successLink,
  successLinkText,
  openSuccessLink,
  errorMessage,
  onReset,
  children,
  dataPreparedMessage,
  sendDocumentLinkText
}) => {
  const { t } = useTranslation('Common');
  const isSuccess = !isLoading && !isError;
  return (
    <section className='feedback'>
      <Card.Header>
        <div className='message'>
          <Col>
            {isLoading && <img src={iconProcessing} alt='' />}
            {!isLoading && !isError && <img src={iconSuccess} alt='' />}
            {isError && <img src={iconError} alt='' />}
          </Col>
          <Col>
            {isLoading && <h6 className='processing'>{t('Processing')}</h6>}
            {!isLoading && !isError && <h6 className='success'>
              {isCallPerformed ? successMessage : dataPreparedMessage}
            </h6>}
            {isError && <h6 className='error'>{errorMessage}</h6>}
          </Col>
        </div>
        {isSuccess && (successLink || openSuccessLink) && (
          <div className='success-link'>
            <ArrowLink
              link={successLink}
              text={isCallPerformed ? successLinkText : sendDocumentLinkText}
              onClick={openSuccessLink}
            />
          </div>
        )}
      </Card.Header>
      {isSuccess && children && <Card.Body>{children}</Card.Body>}
      <Card.Footer>
        <PrimaryButton
          disabled={isLoading}
          text={t('InitiateOneMore')}
          onClick={onReset}
        />
      </Card.Footer>
    </section>
  );
};

Feedback.propTypes = {
  isLoading: bool.isRequired,
  isError: bool.isRequired,
  isCallPerformed: bool,
  successMessage: string.isRequired,
  successLink: string,
  successLinkText: string,
  openSuccessLink: func,
  errorMessage: string,
  onReset: func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  dataPreparedMessage: string.isRequired,
  sendDocumentLinkText: string.isRequired,
};

Feedback.defaultProps = {
  isCallPerformed: true,
  successLink: null,
  errorMessage: null,
  successLinkText: null,
  openSuccessLink: null,
  children: null,
};
