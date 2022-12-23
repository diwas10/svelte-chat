import type * as Yup from 'yup';
import type { Readable } from 'svelte/types/runtime/store';

interface FormValues {
	[key: string]: any;
}

type FormErrors<Values> = {
	[K in keyof Values]?: Values[K] extends any[]
		? Values[K][number] extends object
			? FormErrors<Values[K][number]>[] | string | string[]
			: string | string[]
		: Values[K] extends object
		? FormErrors<Values[K]>
		: string;
};

type FormTouched<Values> = {
	[K in keyof Values]?: Values[K] extends any[]
		? Values[K][number] extends object
			? FormTouched<Values[K][number]>[]
			: boolean
		: Values[K] extends object
		? FormTouched<Values[K]>
		: boolean;
};

interface FormInitialState<Values> {
	initialErrors: FormErrors<Values>;
	initialTouched: FormTouched<Values>;
	initialValues: Values;
	initialSubmitCount: number;
}

interface FormState<Values> {
	errors: Readable<FormErrors<Values>>;
	touched: Readable<FormTouched<Values>>;
	values: Readable<Values>;
	submitCount: Readable<number>;
}

type SetFieldValue = (name: string, value: any, shouldValidate?: boolean) => void;
type SetFieldTouched = (name: string, touched: boolean, shouldValidate?: boolean) => void;
type SetError<Values> = (errors: FormErrors<Values>) => void;
type SetTouched<Values> = (touched: FormTouched<Values>) => void;
type SetValues<Values> = (values: Values) => void;

interface FormReturns<Values> extends FormState<Values> {
	handleChange(e: InputChangeEvent<HTMLInputElement>): void;

	handleBlur(e: InputFocusEvent<HTMLInputElement>): void;

	handleSubmit(form: SubmitEvent): void;

	setFieldValue: SetFieldValue;
	setFieldTouched: SetFieldTouched;
	setError: SetError<Values>;
	setTouched: SetTouched<Values>;
	setValues: SetValues<Values>;
}

interface FormProps<Values> {
	initialValues: Values;

	onSubmit(values: Values): void;

	validationSchema?: ((values: Values) => Yup.AnySchema) | Yup.AnySchema;
	validateOnBlur?: boolean;
	validateOnChange?: boolean;
}

type WithTarget<Event, Target> = Event & { currentTarget: Target };

type InputChangeEvent<Target> = WithTarget<InputEvent, Target>;
type InputFocusEvent<Target> = WithTarget<FocusEvent, Target>;

export type {
	WithTarget,
	InputFocusEvent,
	InputChangeEvent,
	FormValues,
	FormProps,
	FormReturns,
	FormState,
	FormErrors,
	FormTouched,
	FormInitialState,
	SetFieldTouched,
	SetFieldValue,
	SetError,
	SetValues,
	SetTouched,
};
