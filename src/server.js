const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./utils/db.client');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
