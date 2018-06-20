import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import SurveyNPS from './components/SurveyNPS/SurveyNPS';
import './index-reset.css';
import registerServiceWorker from './registerServiceWorker';

// Single route to not confuse Heroku routing :/

const Root = () => {
    return <Router>
        <div>
            <Route path="/" component={SurveyNPS} />
        </div>
    </Router>
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
