
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app,  Datastore} from 'codehooks-js'
import { date, object, string, number} from 'yup';
import {crudlify} from 'codehooks-crudlify'

const taskYup = object({
  taskName: string().required(),
  status: string(),
  createdOn: date().default(() => new Date()),
});

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
