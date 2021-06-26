import React from 'react';

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
                <td><a href={`#${ id }`}>Details</a></td>
                <td><a href='#' onClick={()=> toggleFavorite(contact )}>Toggle Favorite</a></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
};

export default ContactList;
