const { db, Contact } = require('./server/db');
const seedData = [
  {
    "name": "Kylo",
    "phone": "666-666-6666",
    "email": "kylo@ren.com",
    "imageUrl": "kylo.png"
  },
  {
    "name": "Rey",
    "phone": "777-777-7777",
    "email": "rey@milleniumfalcon.com",
    "imageUrl": "rey.png"
  },
  {
    "name": "Finn",
    "phone": "888-888-8888",
    "email": "finn@resistance.com",
    "imageUrl": "finn.png"
  },
  {
    "name": "Poe",
    "phone": "999-999-9999",
    "email": "poe@resistance.com",
    "imageUrl": "poe.png"
  }
];

(async function seedDatabase() {
  try {
    await db.sync({ force: true });
    await Promise.all(seedData.map((contact) => Contact.create(contact)));
    console.log(`
      Seed success!
    `);
  } catch (err) {
    console.error(err.stack);
  } finally {
    db.close();
  }
})();
