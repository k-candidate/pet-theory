const {promisify} = require('util');
const {Storage}   = require('@google-cloud/storage');
const exec        = promisify(require('child_process').exec);
const storage     = new Storage();

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Listening on port', port);
});

app.post('/', async (req, res) => {
  try {
    const file = decodeBase64Json(req.body.message.data);
    await downloadFile(file.bucket, file.name);
    const pdfFileName = await convertFile(file.name);
    await uploadFile(process.env.PDF_BUCKET, pdfFileName);
    await deleteFile(file.bucket, file.name);
  }
  catch (ex) {
    console.log(`Error: ${ex}`);
  }
  res.set('Content-Type', 'text/plain');
  res.send('\n\nOK\n\n');
})

function decodeBase64Json(data) {
  return JSON.parse(Buffer.from(data, 'base64').toString());
}

