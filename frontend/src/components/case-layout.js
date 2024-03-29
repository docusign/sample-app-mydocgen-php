import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ArrowLink } from './arrow-link';
import { ApiDescription } from './api-description';

export const CaseLayout = ({ title, apiDescription, children }) => {
  const navigate = useNavigate();
  const onGoBack = () => navigate('/');
  return (
    <section>
      <Container>
        <ArrowLink text='Back' onClick={onGoBack} back />
        <h3 className='mb-4'>{title}</h3>
        <Row>
          <Col lg={8}>
            <Card>{children}</Card>
          </Col>
          <ApiDescription description={apiDescription} />
        </Row>
      </Container>
    </section>
  );
};

CaseLayout.propTypes = {
  title: PropTypes.string.isRequired,
  apiDescription: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};
