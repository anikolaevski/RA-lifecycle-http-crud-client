import React from 'react';
// import PropTypes from 'prop-types';
import Container from './components/Container';

export class CRUD extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { prev: [], current: [] }
  render() {
    return (
      <Container class="">
        <div>Page is under development</div>
      </Container>
    );    
  }
}