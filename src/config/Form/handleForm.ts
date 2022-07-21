import type * as Yup from 'yup';
import { writable } from 'svelte/store';

interface HandleForm {
	initialValues: { [key: string]: any };

	onSubmit(values: { [key: string]: any }): void;

	validationSchema?: Yup.AnySchema;
}

const handleForm = ({ initialValues, validationSchema, onSubmit }: HandleForm) => {
	const values = writable(initialValues);
	const touched = writable({});
	const errors = writable({});

	const handleChange = (e: HTMLInputElement) => {
		values.update((value) => ({ ...value, [e.name]: e.value }));
	};

	const handleBlur = (e: HTMLInputElement) => {
		touched.update((state) => ({ ...state, [e.name]: true }));
	};

	const handleSubmit = (form: SubmitEvent) => {
		form.preventDefault();
		Object.keys(initialValues).forEach((key) => {
			touched.update((state) => ({ ...state, [key]: true }));
		});

		let isFormValid = false;

		if (validationSchema) {
			validationSchema
				.validate(values, { abortEarly: false })
				.then(() => (isFormValid = true))
				.catch((validationErrors: Yup.ValidationError) => {
					validationErrors.inner.forEach((validationError) => {
						errors.update((error) => ({
							...error,
							[validationError.name]: validationErrors.errors[0]
						}));
					});
				});
		} else isFormValid = true;

		if (isFormValid) values.subscribe((value) => onSubmit(value));
	};

	return { values, errors, touched, handleBlur, handleChange, handleSubmit };
};

export default handleForm;
