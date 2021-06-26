import React from 'react';

const SingleContact = (props) => {
  const { selectedContact, toggleFavorite } = props;
  const { name, email, phone, imageUrl, bio, favorite } = selectedContact;

  return (
    <div id="single-contact">
      <img src={imageUrl} />
      <div id="contact-info">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p style={{width: '500px'}}>{ bio }</p>
        <div className="fav-container" onClick={() => toggleFavorite(selectedContact)}>
          {favorite ? (
            <img className="fav-image" src="/checked.png"></img>
          ) : (
            <img className="fav-image" src="/unchecked.png"></img>
          )}
          <span>Favorite</span>
        </div>
      </div>
    </div>
  );
};

export default SingleContact;
