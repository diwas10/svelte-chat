import type * as Yup from 'yup';
import { writable } from 'svelte/store';
import type { InputChangeEvent, InputFocusEvent } from './form.schema';

interface HandleForm {
	initialValues: { [key: string]: any };

	onSubmit(values: { [key: string]: any }): void;

	validationSchema?: Yup.AnySchema;
}

const handleForm = ({ initialValues, validationSchema, onSubmit }: HandleForm) => {
	const values = writable(initialValues);
	const touched = writable({});
	const errors = writable({});

	const handleChange = (e: InputChangeEvent<HTMLInputElement>) => {
		values.update((value) => ({ ...value, [e.currentTarget?.name]: e.currentTarget?.value }));
	};

	const handleBlur = (e: InputFocusEvent<HTMLInputElement>) => {
		touched.update((state) => ({ ...state, [e.currentTarget?.name]: true }));
	};

	const handleSubmit = async (form: SubmitEvent) => {
		form.preventDefault();
		Object.keys(initialValues).forEach((key) => {
			touched.update((state) => ({ ...state, [key]: true }));
		});

		let formValues;
		values.subscribe((value) => (formValues = value));

		if (validationSchema) {
			try {
				const value = await validationSchema.validate(formValues, { abortEarly: false });
				onSubmit(value);
			} catch (err) {
				const validationErrors = err as Yup.ValidationError;

				validationErrors.inner.forEach((validationError) => {
					errors.update((error) => ({
						...error,
						[validationError.path as string]: validationErrors.errors[0],
					}));
				});
			}
		} else values.subscribe(onSubmit);
	};

	return { values, errors, touched, handleBlur, handleChange, handleSubmit };
};

export default handleForm;
