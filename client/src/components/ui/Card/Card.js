import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { CardContainer, CardHeader, CardBody, CardFooter, CardTitle, CardDescription } from './Card.styles';
export const Card = ({ variant = 'default', padding = 'medium', clickable = false, fullWidth = true, children, onClick, className, ...rest }) => {
    const handleClick = () => {
        if (clickable && onClick) {
            onClick();
        }
    };
    const handleKeyDown = (event) => {
        if (clickable && onClick && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onClick();
        }
    };
    return (_jsx(CardContainer, { variant: variant, padding: padding, clickable: clickable, fullWidth: fullWidth, onClick: handleClick, onKeyDown: handleKeyDown, tabIndex: clickable ? 0 : undefined, role: clickable ? 'button' : undefined, className: className, ...rest, children: children }));
};
Card.displayName = 'Card';
export const CardHeaderComponent = ({ children, className, ...rest }) => {
    return (_jsx(CardHeader, { className: className, ...rest, children: children }));
};
CardHeaderComponent.displayName = 'Card.Header';
export const CardBodyComponent = ({ children, className, ...rest }) => {
    return (_jsx(CardBody, { className: className, ...rest, children: children }));
};
CardBodyComponent.displayName = 'Card.Body';
export const CardFooterComponent = ({ children, className, ...rest }) => {
    return (_jsx(CardFooter, { className: className, ...rest, children: children }));
};
CardFooterComponent.displayName = 'Card.Footer';
export const CardTitleComponent = ({ as = 'h3', children, className, ...rest }) => {
    return (_jsx(CardTitle, { as: as, className: className, ...rest, children: children }));
};
CardTitleComponent.displayName = 'Card.Title';
export const CardDescriptionComponent = ({ children, className, ...rest }) => {
    return (_jsx(CardDescription, { className: className, ...rest, children: children }));
};
CardDescriptionComponent.displayName = 'Card.Description';
Card.Header = CardHeaderComponent;
Card.Body = CardBodyComponent;
Card.Footer = CardFooterComponent;
Card.Title = CardTitleComponent;
Card.Description = CardDescriptionComponent;
