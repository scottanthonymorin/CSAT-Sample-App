const Smooch = require('smooch-core');

require('dotenv').config();
const {
    SMOOCH_APP_ID: appId,
    SMOOCH_ACCOUNT_KEY_ID: keyId,
    SMOOCH_ACCOUNT_SECRET: secret,
    SMOOCH_APP_KEY_ID: appKeyId
} = process.env;

const smooch = new Smooch({
    keyId,
    secret,
    scope: 'account'
});

async function getUserProps(userId) {
    const data = await smooch.appUsers.get({ appId, userId });
    return data.appUser.properties;
}

async function updateUserProps(userId, properties) {
    const userProps = await getUserProps(userId);
    const updatedProperties = { ...userProps, properties };

    await smooch.appUsers.update(appId, userId, updatedProperties);
}

module.exports = { getUserProps, updateUserProps };