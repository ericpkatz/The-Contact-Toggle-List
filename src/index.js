import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ContactList from './ContactList';
import { Provider, connect } from 'react-redux';
import store, { setContacts } from './store';


class _Main extends React.Component {
  async componentDidMount() {
    this.props.setContacts();
  }
  render() {
    const { contacts } = this.props;
    return (
      <div id="main">
        <div id="navbar">
          <div>Contact List ({ contacts.filter( contact => contact.favorite ).length} favorites!)</div>
        </div>
        <div id="container">
          <ContactList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  return state;
};

const mapDispatchToProps = (dispatch)=> {
  return {
    setContacts: async()=> {
      const res = await axios.get('/api/contacts');
      const contacts = res.data;
      dispatch(setContacts(contacts));
    }
  };
};
const Main = connect(mapStateToProps, mapDispatchToProps)(_Main);


ReactDOM.render(<Provider store={ store }><Main /></Provider>, document.getElementById('app'));
