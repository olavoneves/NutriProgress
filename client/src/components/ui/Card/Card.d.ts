import React from 'react';
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
export declare const Card: CardComponent;
export declare const CardHeaderComponent: React.FC<CardHeaderProps>;
export declare const CardBodyComponent: React.FC<CardBodyProps>;
export declare const CardFooterComponent: React.FC<CardFooterProps>;
export declare const CardTitleComponent: React.FC<CardTitleProps>;
export declare const CardDescriptionComponent: React.FC<CardDescriptionProps>;
export {};
//# sourceMappingURL=Card.d.ts.map