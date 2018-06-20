import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background: ${props => props.bg ? props.bg : '#fff'};
    border: 1px solid #d8d8d8;
    border-color: ${props => props.bg && props.bg};
    border-radius: 3px;
    color: ${props => props.color ? props.color : '#707070'};
    cursor: pointer;
    height: 40px;
    font-size: 14px;
    font-weight: ${props => props.bold && '700'};
    text-transform: ${props => props.uppercase && 'uppercase'};
    flex: ${props => props.fullWidth && '1'};
    min-width: 100px;
    margin: 4px;
`;
const Button = ({ bg, buttonLabel, color, fullWidth, onClickFunction }) => {

    return (
        <StyledButton
            fullWidth={fullWidth}
            bg={bg}
            color={color}
            onClick={() => onClickFunction()}
        >
            {buttonLabel}
        </StyledButton>
    )
}

export default Button;