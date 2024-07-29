import express from 'express';
import cors from 'cors';
import bodyparse from 'body-parser';
import {Patient} from 'fhir/r4';

const app = express();
const port = 3000;

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.setHeader('Access-Control-Expose-Headers', 'Origin, Accept, Content-Location, ' +
    'Location, X-Requested-With');

  // Pass to next layer of middleware
  next();
});


app.use(bodyparse.json())
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/cds-services', (req, res)=>{
  res.json({
    "services": [
      {
        "hook": "patient-view",
        "title": "Stella CDS Service Example",
        "description": "An example of a CDS Service that returns a static set of cards",
        "id": "patient-greeter",
        "prefetch": {
          "patientToGreet": "Patient/{{context.patientId}}"
        }
      }
    ]
  }
  )
});


app.listen(port, () => {
  console.log(`CDS service listening at http://localhost:${port}`);
});


app.post('/cds-services/patient-greeter', (req, res)=>{
  const body = req.body
  const patient: Patient = body.prefetch.patientToGreet
  const prefix = patient?.name?.[0]?.prefix?.[0]
  const name = patient?.name?.[0]?.given?.[0]
  const message = `Hello ${name}!`

  res.json({
    "cards": [
      {
        "summary": message,
        "indicator": "info",
        "detail": message,
        "source": {
          "label": "Stella CDS Demo Service",
          "url": "https://stellatechnology.com",
          "icon": "https://stellatechnology.com/stella-logo-w.2b69cdce.svg"
        },
        "links": [
          {
            "label": "Stella Technology",
            "url": "https://stellatechnology.com"
          }
        ],
      }
    ]
  })
});