import type { LoadingSize, LoadingVariant } from './Loading';
interface LoadingContainerProps {
    fullScreen: boolean;
}
interface LoadingSpinnerProps {
    size: LoadingSize;
    variant: LoadingVariant;
    color: string;
}
export declare const LoadingContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, LoadingContainerProps>> & string;
export declare const LoadingSpinner: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, LoadingSpinnerProps>> & string;
export declare const LoadingText: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, never>> & string;
export declare const LoadingOverlay: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export {};
//# sourceMappingURL=Loading.styles.d.ts.map