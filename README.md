# CSAT Examples
This repo uses `express` and `react` to create a simple server that can interact with Smooch webhooks and deploy the frontend of the custom CSAT app.

⚠️ This app is really not yet optimized for use by anyone, but we are working on it. If you have any questions, feel free to reach out. ⚠️

## Installation
Run `npm install` in the main folder and in the `server` folder. _There are two `package.json` as the server has its own dependencies.

### Setup
1. Add all of the required values to a `.env` file. (There is an example saved to the repo).
```bash
SMOOCH_ACCOUNT_KEY_ID=your_smooch_account_key_id
SMOOCH_ACCOUNT_SECRET=your_smooch_account_secret
SMOOCH_APP_ID=your_smooch_app_id
```

2. Third-party Survey
If you plan on using a third-party survey, you should add the link in `/server/messages.content.js`. It will be picked up by the conversation extension that uses it.
```js
const thirdPartySurvey = ''; // Paste third-party survey HREF here.
```

3. Setup webchat with your Smooch app.
In `webchat/index.html` enter your appId (The same one you added to `.env` file).
```js
    const appId = ''; // SET APPID
```

4.  Add your webhook(s) in your Smooch app. 

## Deployment
### Dev Environment
From the main folder, you run `npm run dev` to launch both the React frontend and the express backend.

The React app is visible on `localhost:3000`.
The server is on `localhost:8000`.

_You will need to use `ngrok` or some other tunneling service to get webhook events from the web to reach your locally hosted server._

Finally, from the `webchat` folder, launch a simple web server and host the `index.html` on any free port. I tend to use `4000`. This will give you a web messenger that is connected to your chosen Smooch app and allow you to interact with your express server. _You will probably also need an agent software. Any of the availabel integrations will do.

## Viewing CSAT examples in-chat
Currently, the server should be listening for webhooks from your Smooch app. It is listening for specific keywords/expressions from the `appMaker`. The triggers are located in `server/messages.content.js`. Feel free to change them, or even add some more. Each trigger array can have as many expressions as you need.