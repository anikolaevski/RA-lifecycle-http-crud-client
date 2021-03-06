import React from 'react';
import PropTypes from 'prop-types';
import del_icon from './icons/cross_in_circle.png';
import submit_icon from './icons/right-arrow.png';
import refresh_icon from './icons/10044980_refresh-business-continuity-icon-png-hd-png-download.png';
import {read, write, del} from './back.js';

// eslint-disable-next-line no-undef
const { REACT_APP_URL, REACT_APP_GET, REACT_APP_ADD, REACT_APP_DELETE} = process.env;

export class CRUD extends React.Component {
  constructor(props) {
    super(props);
    this.content = [];
  }
  state = { prev: [], current: [] }
  
  render() {
    const callback = async function () {
      const ret = await read(REACT_APP_URL + REACT_APP_GET);
      if (ret) {
        this.content.splice(0, this.content.length);
        ret.forEach(o => { this.content.push(o); });
      }
      this.setState((prev) => ({prev, current: this.content}) );
    };
    return (
      <div className="">
        <h1>CRUD</h1>
        <div className="crud-header-zone">
          <h2>Notes</h2>
          <RefreshButton callback={callback.bind(this)}/>
        </div>
        <div className="crud-content-zone">
          {this.state.current.map(o => <ContentTile 
            key={o.id} 
            id={o.id} 
            content={o.content}
            callback={callback.bind(this)}
          />)}            
        </div>
        <AddForm callback={callback.bind(this)}/>
      </div>
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
  async click() {
    const id = this.props.id;
    const ret = await del(REACT_APP_URL + REACT_APP_DELETE.replace(':id',id), {});
    if (ret) {
      this.props.callback();
    }
  }
  render() {
    return (
      <div className="crud-content-tile">
          {this.props.content}
          <img className="crud-del-sign" src={del_icon}
            onClick={this.click.bind(this)}/>
      </div>
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
  state = { prev: '', current: '' }
  async click() {
    const writeObj = {content: this.state.current};
    await write(REACT_APP_URL + REACT_APP_ADD, writeObj);
    this.props.callback();
  }
  onTextChange(evt) {
    evt.preventDefault();
    this.setState((prev) => ({prev, current: evt.target.value}));
  }
  render() {
    return (
      <form className="crud-footer-zone">
          <label htmlFor="new_note" className="crud-textarea-label">New Note</label>
          <textarea id="new_text_textarea" name="new_note" className="crud-textarea" onChange={this.onTextChange.bind(this)}></textarea>
          <img className="crud-add-button" src={submit_icon} onClick={this.click.bind(this)}/>
      </form>
    );
  }
}
