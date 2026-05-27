import type { InputVariant, InputSize } from './Input';
interface InputWrapperProps {
    fullWidth: boolean;
}
interface InputContainerProps {
    variant: InputVariant;
    size: InputSize;
    hasError: boolean;
    disabled?: boolean;
    hasLeftIcon: boolean;
    hasRightIcon: boolean;
}
interface LabelProps {
    disabled?: boolean;
}
export declare const InputWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, InputWrapperProps>> & string;
export declare const Label: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, LabelProps>> & string;
export declare const InputContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, InputContainerProps>> & string;
export declare const HelperText: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, never>> & string;
export declare const ErrorText: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, never>> & string;
export {};
//# sourceMappingURL=Input.styles.d.ts.map