
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app,  Datastore} from 'codehooks-js'
import { date, object, string, number} from 'yup';
import {crudlify} from 'codehooks-crudlify'
import jwtDecode from 'jwt-decode';

const taskYup = object({
  taskName: string().required(),
  status: string(),
  createdOn: date().default(() => new Date()),
});

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

app.get('/taskList', async (req, res) => {
  // connect to the key-value datastore
  // const key_val_store = await Datastore.open();
  res.send('ok')
  
})

app.post('/add', async (req, res) => {
  // connect to the key-value datastore
  // const key_val_store = await Datastore.open();
  const { name } = req.body;
  res.send("add")
  
})
// Use Crudlify to create a REST API for any collection
crudlify(app, {task: taskYup})

// bind to serverless runtime
export default app.init();
