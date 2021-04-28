import React from 'react';
import PropTypes from 'prop-types';
import Container from './components/Container';
// import shortid from 'shortid';
import del_icon from './icons/cross_in_circle.png';
import submit_icon from './icons/right-arrow.png';
import refresh_icon from './icons/10044980_refresh-business-continuity-icon-png-hd-png-download.png';
import {read, write, del} from './back.js';

// eslint-disable-next-line no-undef
const { REACT_APP_URL, REACT_APP_GET, REACT_APP_ADD, REACT_APP_DELETE} = process.env;
const content = [
  // {id: 1, content: "Lorem Ipsum"},
  // {id: 2, content: "Мой дядя самых честных правил"},
  // {id: 3, content: "Однажды в студеную зимнюю пору"},
];
// eslint-disable-next-line no-undef
console.log(content, process.env);

export class CRUD extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { prev: content, current: content }
  
  render() {
    const callback = async function () {
      const ret = await read(REACT_APP_URL + REACT_APP_GET);
      if (ret) {
        content.splice(0, content.length);
        ret.forEach(o => { content.push(o); });
      }
      this.setState((prev) => ({prev, content}) );
    };
    return (
      <Container class="">
        <h1>CRUD</h1>
        <Container class="crud-header-zone">
          <h2>Notes</h2>
          <RefreshButton callback={callback.bind(this)}/>
        </Container>
        <Container class="crud-content-zone">
          {this.state.current.map(o => <ContentTile 
            key={o.id} 
            id={o.id} 
            content={o.content}
            callback={callback.bind(this)}
          />)}            
        </Container>
        <AddForm callback={callback.bind(this)}/>
      </Container>
    );
  }
}

class RefreshButton extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    callback: PropTypes.func.isRequired
  }
  render() {
    return (
      <img className="crud_refresh_button" 
      src={refresh_icon} onClick={this.props.callback}/>
    );
  }
}

class ContentTile extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
  }
  state = { prev: [], current: [] }
  async click() {
    const id = this.props.id;
    // console.log(id);
    const ret = await del(REACT_APP_URL + REACT_APP_DELETE.replace(':id',id), {});
    if (ret) {
      this.props.callback();
    }
  }
  render() {
    return (
      <Container class="crud-content-tile">
          {this.props.content}
          <img className="crud-del-sign" src={del_icon}
            onClick={this.click.bind(this)}/>
      </Container>
    );
  }
}

class AddForm extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    callback: PropTypes.func.isRequired
  }
  async click() {
    // eslint-disable-next-line no-undef
    const new_text_textarea = document.querySelector("#new_text_textarea");
    if (!new_text_textarea) { return; }
    // console.log(new_text_textarea.value, REACT_APP_URL);
    const writeObj = {content: new_text_textarea.value};
    await write(REACT_APP_URL + REACT_APP_ADD, writeObj);
    this.props.callback();
    // console.log(ret, content);
  }
  render() {
    return (
      <form className="crud-footer-zone">
          <label htmlFor="new_note" className="crud-textarea-label">New Note</label>
          <textarea id="new_text_textarea" name="new_note" className="crud-textarea"></textarea>
          <img className="crud-add-button" src={submit_icon} onClick={this.click.bind(this)}/>
      </form>
    );
  }
}