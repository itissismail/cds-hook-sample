# Sample CDS Hook Service

CDS Hook Patient Card

## Description

Sample CDS hook, run application via `npm start` 

## Getting Started

### Dependencies

* Install NodeJs
* Setup Ngrok and publish your APIs. Get Started `https://ngrok.com/docs/getting-started/`

### Running 

 ```
* npm start
* ngrok tunnel --label edge=[EDGE ID] http://localhost:3000
* Goto https://sandbox.cds-hooks.org/
* Add CDS Service url https://[ngrokBaseURL]/cds-services
```

![Alt text](./help-img.jpeg?raw=true "Sample App Running")


### TroubleShoot

* If you face error, while adding cds-service to Sandbox. Add a custom header to your request `ngrok-skip-browser-warning` with any value `true`

![Alt text](./troubleshoot1.jpeg?raw=true "Troubleshoot")

![Alt text](./troubleshoot2.jpeg?raw=true "Troubleshoot")
