const faker = require('faker');
const Sequelize = require('sequelize');
const config = {
  logging: false
};

if(process.env.LOGGING){
  delete config.logging
}

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/first-contact', config);

const Contact = db.define('contacts', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
  },
});

Contact.addHook('beforeSave', (contact)=> {
  if(!contact.bio){
    contact.bio = `Bio for ${ contact.name } ${faker.lorem.paragraph(3)}`;
  }
});

module.exports = {
  db,
  Contact,
};
