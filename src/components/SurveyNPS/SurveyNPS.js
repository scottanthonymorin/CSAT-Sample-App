import React, { Component } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import Button from '../common/Button';

const StyledSurveyNPS = styled.div`
    background: #8A2BE2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
`;
const StyledText = styled.p`
    color: #fff;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 100;
    margin-top: 32px;
    padding: 0 36px;
    text-align: center;
`;
const StyledList = styled.ol`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 24px;
    width: 80vw;
`
const StyledItem = styled.li`
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 100;
    height: 30px;
    margin: 10px;
    width: 30px;

    &.active {
        background: #fff;
        color: #8A2BE2;
        font-weight: 400;
    }
`;
const StyledScale = styled.div`
    border-top: 1px solid #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    width: 80vw;

    p {
        color: #fff;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 12px;
        font-weight: 100;
    }
`
class SurveyNPS extends Component {
    constructor() {
        super();
        const receivedParameters = queryString.parse(window.location.search);
        this.state = {
            npsValue: '0',
            userId: receivedParameters.userId
        }
    }
    componentDidMount() {
        // webviewSdk script is added in index.html and initialized here.
        window.webviewSdkInit;
    }
    handleChange = (value) => {
        this.setState({
            npsValue: value
        });
    }
    submitValue = () => {
        const { npsValue, userId } = this.state;

        fetch('http://gnomecircle.ngrok.io/api/survey', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response, `NPS Survey response submitted [${npsValue}] for user(${userId})`);
            window.WebviewSdk.close();
        }).catch(err => console.log(err));
    }
    render() {
        const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        const { npsValue, userId } = this.state;
        console.log(userId);
        return (
            <StyledSurveyNPS>
                <StyledText>How likely are you to recommend us to your friends?</StyledText>
                <StyledList>
                    {
                        values.map((value) => (
                            <StyledItem
                                key={value}
                                onClick={() => this.handleChange(value)}
                                className={(npsValue === value) ? 'active' : '' }
                            >
                                {value}
                            </StyledItem>
                        ))
                    }
                </StyledList>
                {(npsValue !== '0') ? 
                    <Button
                        buttonLabel={'Confirm'}
                        onClickFunction={this.submitValue}
                    />
                    :
                    <StyledScale>
                        <p>0: Not Likely</p>
                        <p>10: Very Likely</p>
                    </StyledScale>
                }
                
            </StyledSurveyNPS>
        );
    }
}

export default SurveyNPS;