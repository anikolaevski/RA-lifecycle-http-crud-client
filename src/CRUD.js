import React from 'react';
import PropTypes from 'prop-types';
import Container from './components/Container';
import shortid from 'shortid';
import del_icon from './icons/cross_in_circle.png';
const content = [
  {id: shortid(), content: "Lorem Ipsum"},
  {id: shortid(), content: "Мой дядя самых честных правил"},
  {id: shortid(), content: "Однажды в студеную зимнюю пору"},
];
// eslint-disable-next-line no-undef
console.log(content);

export class CRUD extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { prev: content, current: content }
  render() {
    return (
      <Container class="">
        <h1>CRUD</h1>
        <Container class="crud-header-zone">
          <h2>Notes</h2>
          <RefreshButton/>
        </Container>
        <Container class="crud-content-zone">
          {this.state.current.map(o => <ContentTile key={o.id} id={o.id} content={o.content}/>)}            
        </Container>
        <AddForm/>
      </Container>
    );
  }
}

class RefreshButton extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { prev: [], current: [] }
  render() {
    return (
      <Container class="">
        <button></button>
      </Container>
    );
  }
}

class ContentTile extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }
  state = { prev: [], current: [] }
  render() {
    return (
      <Container class="crud-content-tile">
          {this.props.content}
          <img className="crud-del-sign" src={del_icon}/>
      </Container>
    );
  }
}

class AddForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { prev: [], current: [] }
  render() {
    return (
      <form className="crud-footer-zone">
          <label htmlFor="new_note">New Note</label>
          <textarea name="new_note" className="crud-textarea"></textarea>
          <button className="crud-add-button"></button>
      </form>
    );
  }
}