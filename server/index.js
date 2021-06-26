const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { db, Contact } = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.get('/api/contacts', async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'favorite'],
    });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

app.get('/api/contacts/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.contactId, { attributes: ['bio', 'imageUrl']});
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

app.put('/api/contacts/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.contactId);
    await contact.update(req.body);
    res.send(contact)
  } catch (err) {
    next(err);
  }
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling endware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

(async function startServer() {
  try {
    await db.sync();
    console.log('The database is synced!');
    app.listen(PORT, () =>
      console.log(`

        Listening on port ${PORT}
        http://localhost:${PORT}/

      `)
    );
  } catch (err) {
    console.error(err);
  }
})();
