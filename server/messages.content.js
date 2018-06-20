const localHost = 'http://localhost:3000';
const thirdPartySurvey = ''; // Paste third-party survey HREF here.

const csatQuickMessage = {
    text: 'So how was your Smooch Chat experience?',
    actions: [
        {
            type: 'reply',
            text: '😎',
            payload: 'great',
            metadata: {
                npsScore: '10'
            }
        },
        {
            type: 'reply',
            text: '😐',
            payload: 'great',
            metadata: {
                npsScore: '5'
            }
        },
        {
            type: 'reply',
            text: '☹️',
            payload: 'great',
            metadata: {
                npsScore: '1'
            }
        },
    ]
}

const csatThirdPartyMessage = {
    text: 'So how was your Smooch Chat experience?',
    actions: [
        {
            type: 'webview',
            size: 'full',
            text: 'SurveyMonkey',
            uri: `${thirdPartySurvey}`,
            fallback: `${thirdPartySurvey}`
        }
    ]
}

const csatCustomMessage = {
    text: 'So how was your Smooch Chat experience?',
    actions: [
        {
            type: 'webview',
            size: 'tall',
            text: 'View NPS',
            uri: `${localHost}`,
            fallback: `${localHost}`
        }
    ]
}

const botTriggers = {
    triggerQuickReplyCsat: [ 'rate - quick' ],
    triggerThirdPartyCsat: [ 'rate - surveymonkey' ],
    triggerCustomCsat: [ 'rate - custom' ]
}

module.exports = { csatQuickMessage, csatThirdPartyMessage, csatCustomMessage, botTriggers };