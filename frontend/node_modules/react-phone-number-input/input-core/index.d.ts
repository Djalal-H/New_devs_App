// React TypeScript Cheatsheet doesn't recommend using `React.FunctionalComponent`.
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components

import type * as React from 'react';

import type {
	Metadata,
	DefaultInputComponentProps
} from '../index.d.js';

import type {
	Props as BaseProps
} from '../input/index.d.js';

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
} from '../core/index.d.js';

type Props<InputComponentProps> = BaseProps<InputComponentProps> & {
	metadata: Metadata;
}

type PhoneInputComponentType<InputComponentProps = DefaultInputComponentProps> = React.ForwardRefExoticComponent<Props<InputComponentProps> & React.RefAttributes<unknown>>

declare const PhoneInput: PhoneInputComponentType;

export default PhoneInput;
