const Smooch = require('smooch-core');
const { csatQuickMessage, csatThirdPartyMessage, csatCustomMessage, botTriggers } = require('../messages.content');
const { sendBotMessage } = require('./botMessages');

require('dotenv').config();
const {
    SMOOCH_APP_ID: appId,
    SMOOCH_ACCOUNT_KEY_ID: keyId,
    SMOOCH_ACCOUNT_SECRET: secret,
    SERVER_HREF: serverHref
} = process.env;

const smooch = new Smooch({
    keyId,
    secret,
    scope: 'account'
});

function processor(req, res) {
    const { triggerQuickReplyCsat, triggerThirdPartyCsat, triggerCustomCsat } = botTriggers;
    const { messages, appUser: { _id: userId } } = req.body;

    messages.map((message) => {
        const text = message.text.toLowerCase();

        triggerQuickReplyCsat.forEach(trigger => {
            if (text.includes(trigger)) { sendBotMessage(userId, csatQuickMessage) };
        });

        triggerThirdPartyCsat.forEach(trigger => {
            if (text.includes(trigger)) { sendBotMessage(userId, csatThirdPartyMessage) };
        });

        triggerCustomCsat.forEach(trigger => {
            if (text.includes(trigger)) { sendBotMessage(userId, csatCustomMessage) };
        });
    })
    res.end();
}

module.exports = { processor };