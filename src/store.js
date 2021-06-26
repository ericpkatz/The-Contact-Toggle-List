import { createStore } from 'redux';

const store = createStore((state={ contacts: [] }, action)=> {
  if(action.type === 'SET_CONTACTS'){
    state = {...state, contacts: action.contacts }
  }
  if(action.type === 'UPDATE_CONTACT'){
    state = {...state, contacts: state.contacts.map( contact => contact.id === action.contact.id ? action.contact : contact) }
  }
  return state;
});

export const setContacts = (contacts)=> {
  return {
    type: 'SET_CONTACTS',
    contacts
  };
};

export const updateContact = (contact)=> {
  return {
    type: 'UPDATE_CONTACT',
    contact
  };
};
export default store;

