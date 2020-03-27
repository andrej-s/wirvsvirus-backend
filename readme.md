![wirvsviruslogo](https://wirvsvirushackathon.org/wp-content/uploads/2020/03/12-scaled.jpg, "WirVsVirus Hackathon")

# WirVsVirus Hackathon Projekt

This repository is part of a submission to the [WirVsVirus Hackathon](https://wirvsvirushackathon.org/) and aims to classify the infection risk of people in need before it connects them to a contact center. This project uses [Twilio](https://twilio.com) for connectivity via the telephony network (phone, sms) as well as WhatsApp. Incoming requests are routed to [Dialogflow](https://dialogflow.com) for natural language processing and intent detection, a classification is performed on a custom backend (see related repositories). The request is then sent to [Twilio Flex](https://twilio.com/flex), a fully programmable contact center that was modified to serve the needs of an ad-hoc crisis response center.

![Crisis response center screenshot](/img/screenshot.png?raw=true "Crisis response center screenshot")

# Related repositories
- [Backend (node)](https://github.com/andrej-s/wirvsvirus-backend) used for the classification of callers and as fulfillment server for dialogflow requests
- [Frontend (React)](https://github.com/andrej-s/wirvsvirus-frontend), a React Component used to modify Twilio Flex
- [Config (Twilio Studio, Dialogflow)](https://github.com/andrej-s/wirvsvirus-config), configuration files for both platforms used

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

## Config
This server currently runs on port 4000 by default. To change this, modify file `/bin/www`. An `.env` file must be provided, an example can be found in `.env.example`.

## Missing features
Most importantly, authentification for the backend server is currently missing. Additionally, data is only kept in memory without the use of an additional database.

## Development

In order to develop locally, you can run the server by running:

```bash
npm start
```

This will automatically start up the express server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, nodemon will automatically reload your server.