import type {
	Metadata,
	Labels,
	Props as BaseProps,
	State,
	Value,
	DefaultInputComponentProps
} from '../index.d.js';

export type {
	Country,
	Value
} from '../index.d.js';

export {
	default as parsePhoneNumber,
	isValidPhoneNumber,
	isPossiblePhoneNumber,
	getCountryCallingCode,
	getCountries,
	isSupportedCountry,
	type PhoneNumber
} from 'libphonenumber-js/core';

type Props<InputComponentProps> = BaseProps<InputComponentProps> & {
  metadata: Metadata;
  labels: Labels;
}

type PhoneInputWithCountrySelectType<InputComponentProps = DefaultInputComponentProps> = React.ComponentClass<Props<InputComponentProps>, State<Props<InputComponentProps>>>;

declare const PhoneInputWithCountrySelect: PhoneInputWithCountrySelectType;

export default PhoneInputWithCountrySelect;

export function formatPhoneNumber(value: Value, metadata: Metadata): string;
export function formatPhoneNumberIntl(value: Value, metadata: Metadata): string;
