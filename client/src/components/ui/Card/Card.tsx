import React from 'react';
import { CardContainer, CardHeader, CardBody, CardFooter, CardTitle, CardDescription } from './Card.styles';

export type CardVariant = 'default' | 'outlined' | 'elevated';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  clickable?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

interface CardComponent extends React.FC<CardProps> {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
  Title: React.FC<CardTitleProps>;
  Description: React.FC<CardDescriptionProps>;
}

export const Card: CardComponent = ({
  variant = 'default',
  padding = 'medium',
  clickable = false,
  fullWidth = true,
  children,
  onClick,
  className,
  ...rest
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (clickable && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <CardContainer
      variant={variant}
      padding={padding}
      clickable={clickable}
      fullWidth={fullWidth}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      className={className}
      {...rest}
    >
      {children}
    </CardContainer>
  );
};

Card.displayName = 'Card';

export const CardHeaderComponent: React.FC<CardHeaderProps> = ({ children, className, ...rest }) => {
  return (
    <CardHeader className={className} {...rest}>
      {children}
    </CardHeader>
  );
};

CardHeaderComponent.displayName = 'Card.Header';

export const CardBodyComponent: React.FC<CardBodyProps> = ({ children, className, ...rest }) => {
  return (
    <CardBody className={className} {...rest}>
      {children}
    </CardBody>
  );
};

CardBodyComponent.displayName = 'Card.Body';

export const CardFooterComponent: React.FC<CardFooterProps> = ({ children, className, ...rest }) => {
  return (
    <CardFooter className={className} {...rest}>
      {children}
    </CardFooter>
  );
};

CardFooterComponent.displayName = 'Card.Footer';

export const CardTitleComponent: React.FC<CardTitleProps> = ({ as = 'h3', children, className, ...rest }) => {
  return (
    <CardTitle as={as} className={className} {...rest}>
      {children}
    </CardTitle>
  );
};

CardTitleComponent.displayName = 'Card.Title';

export const CardDescriptionComponent: React.FC<CardDescriptionProps> = ({ children, className, ...rest }) => {
  return (
    <CardDescription className={className} {...rest}>
      {children}
    </CardDescription>
  );
};

CardDescriptionComponent.displayName = 'Card.Description';

Card.Header = CardHeaderComponent;
Card.Body = CardBodyComponent;
Card.Footer = CardFooterComponent;
Card.Title = CardTitleComponent;
Card.Description = CardDescriptionComponent;