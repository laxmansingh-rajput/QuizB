import express from 'express';
import { passRoutes } from './routes/passport.js';

const app = express();
const port = 3000;

app.use('/', passRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
