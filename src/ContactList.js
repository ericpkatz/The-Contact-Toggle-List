import React from 'react';
import { connect } from 'react-redux';
import { updateContact } from './store';
import axios from 'axios';

const ContactList = (props) => {
  const { contacts, toggleFavorite } = props;

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
        </tr>
        {
          contacts.map( contact => {
            const { favorite, name, phone, email, id } = contact;
            return (
              <tr className={ favorite ? 'favorite': ''} key={ id }>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td><a href='#' onClick={()=> toggleFavorite(contact )}>Toggle Favorite</a></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    toggleFavorite: async(contact)=> {
      const response = await axios.put(`/api/contacts/${contact.id}`, {
        favorite: !contact.favorite,
      });
      const updated = response.data;
      dispatch(updateContact(updated));
    }
  };
};

export default connect(state => state, mapDispatchToProps)(ContactList);
