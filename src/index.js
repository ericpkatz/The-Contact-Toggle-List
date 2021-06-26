import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ContactList from './ContactList';
import SingleContact from './SingleContact';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      selectedId: '',
      details: {}
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }
  async toggleFavorite(contact){
    const response = await axios.put(`/api/contacts/${contact.id}`, {
      favorite: !contact.favorite,
    });
    const updated = response.data;
    const contacts = this.state.contacts.map(contact => contact.id === updated.id ? updated : contact);
    this.setState({ contacts });

  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/contacts');
      const contacts = res.data;
      this.setState({ contacts });
      const hash = window.document.location.hash.slice(1);
      if(hash){
        this.selectContact(hash);
      }
      window.addEventListener('hashchange', ()=> {
        this.selectContact(window.location.hash.slice(1));
      });
    } catch (err) {
      console.log('There was a problem making contact!');
    }
  }

  async selectContact(contactId) {
    if(!contactId){
      this.setState({ selectedId: ''});
    }
    else {
      this.setState({ selectedId: contactId*1 });
      if(this.state.details.id !== contactId){
        try {
          const res = await axios.get(`/api/contacts/${contactId}`);
          const details = res.data;
          this.setState({ details });
          } catch (err) {
          console.log('There was a problem making contact!');
        }
      }
    }
  }

  render() {
    const { toggleFavorite } = this;
    const { details, contacts } = this.state;
    let selected;
    if(this.state.selectedId){
      selected = {...contacts.find(contact => this.state.selectedId === contact.id), ...details};
    }
    return (
      <div id="main">
        <div id="navbar">
          <div><a href='#' style={{ color: 'cornSilk'}}>Contact List ({ this.state.contacts.filter( contact => contact.favorite ).length} favorites!)</a></div>
        </div>
        <div id="container">
          {selected ? (
            <SingleContact
              selectedContact={ selected }
              // 👇 This wasn't there originally
              toggleFavorite={ toggleFavorite }
            />
          ) : (
            <ContactList
              contacts={this.state.contacts}
              toggleFavorite={ toggleFavorite }
            />
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
