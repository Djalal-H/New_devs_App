// React TypeScript Cheatsheet doesn't recommend using `React.FunctionalComponent`.
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components

import type * as React from 'react';

import type {
	Country,
	Value,
	// PhoneDigits,
	// ExternalPhoneDigits,
	DefaultInputComponentProps
} from '../index.d.js';

export {
	parsePhoneNumber,
	formatPhoneNumber,
	formatPhoneNumberIntl,
	isValidPhoneNumber,
	isPossiblePhoneNumber,
	getCountryCallingCode,
	getCountries,
	isSupportedCountry,
	type Country,
	type Value,
	type PhoneNumber
} from '../index.d.js';

type InputComponent<InputComponentProps> =
  | ((props: InputComponentProps) => React.JSX.Element | React.ComponentClass<InputComponentProps, any>)
  | React.ForwardRefExoticComponent<InputComponentProps & React.RefAttributes<HTMLInputElement>>;

type FeaturePropsWithoutSmartCaret<InputComponentProps> = Omit<InputComponentProps, 'value' | 'onChange'> & {
	country?: Country;
	defaultCountry?: Country;
	international?: boolean;
	withCountryCallingCode?: boolean;
	inputComponent?: InputComponent<InputComponentProps>;
	useNationalFormatForDefaultCountryValue?: boolean;
}

// `PropsWithoutSmartCaret` are imported in:
// * `/react-native/index.d.ts`.
export type PropsWithoutSmartCaret<InputComponentProps> = FeaturePropsWithoutSmartCaret<InputComponentProps> & {
	value?: Value;
	defaultValue?: Value;
	onChange?(value?: Value): void;
	// phoneDigits?: PhoneDigits | ExternalPhoneDigits;
	// defaultPhoneDigits?: PhoneDigits | ExternalPhoneDigits;
	// onPhoneDigitsChange?(phoneDigits?: PhoneDigits): void;
}

// `FeatureProps` are imported in:
// * `/react-hook-form-input/index.d.ts`.
export type FeatureProps<InputComponentProps> = FeaturePropsWithoutSmartCaret<InputComponentProps> & {
	smartCaret?: boolean;
}

// `Props` are imported in:
// * `/input-core/index.d.ts`
export type Props<InputComponentProps> = PropsWithoutSmartCaret<InputComponentProps> & {
	smartCaret?: boolean;
}

type PhoneInputComponentType<InputComponentProps = DefaultInputComponentProps> = React.ForwardRefExoticComponent<Props<InputComponentProps> & React.RefAttributes<unknown>>

declare const PhoneInput: PhoneInputComponentType;

export default PhoneInput;
