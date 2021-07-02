const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 8080;
const www = process.env.WWW || './dist/clinicaOnlinev2';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

app.use(express.static(www));
app.use(express.json());

app.get(/^(?!\/api\/)/, (req, res) => {
  res.sendFile(`index.html`, { root: www });
});

app.post('/api/auth/register', async (req, res) => {

  let resJson = { };
  const { email, password, role } = req.body;

  auth.createUser({ email, password }).then(userRecord => {

    resJson.data = userRecord;
    return auth.setCustomUserClaims(userRecord.uid, { role })

  }).catch(err => {

    resJson.message = err.message;
    resJson.data = null;

  }).finally(() => {

    res.json(resJson);

  });

});

app.get('/api/user/:uid', async (req, res) => {
  const user = await auth.getUser(req.params.uid);
  console.log(user);
  res.send();
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
