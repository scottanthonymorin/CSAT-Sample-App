const Smooch = require('smooch-core');

require('dotenv').config();
const {
    SMOOCH_APP_ID: appId,
    SMOOCH_ACCOUNT_KEY_ID: keyId,
    SMOOCH_ACCOUNT_SECRET: secret
} = process.env;

const smooch = new Smooch({
    keyId,
    secret,
    scope: 'account'
});

async function sendBotMessage(userId, message) {
    const { text, actions, typingDuration, type, mediaUrl } = message;

    if (typingDuration) {
        await mockTypingActivity(userId, typingDuration);
    }

    await smooch.appUsers.sendMessage({
        appId,
        userId,
        message: {
            role: 'appMaker',
            type,
            mediaUrl,
            text,
            actions
        }
    });
}

async function mockTypingActivity(userId, duration) {
    await smooch.appUsers.conversationActivity({
        appId,
        userId,
        activityProps: {
            role: 'appMaker',
            type: 'typing:start'
        }
    });
    await new Promise((res) => setTimeout(res, duration));
}

module.exports = { sendBotMessage };