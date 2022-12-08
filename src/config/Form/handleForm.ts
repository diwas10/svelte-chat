import type * as Yup from 'yup';
import type * as Types from './form.schema';
import { isFunction } from './utils';
import { FormDispatchType, formReducer } from './form.reducer';

const initialErrors: Types.FormErrors<unknown> = {};
const initialTouched: Types.FormTouched<unknown> = {};

/**
 * @param args
 */
const handleForm = <Values extends Types.FormValues = Types.FormValues>(
	args: Types.FormProps<Values>,
): Types.FormReturns<Values> => {
	const {
		initialValues,
		validationSchema,
		onSubmit,
		validateOnChange = true,
		validateOnBlur = true,
	} = args;

	const { values, touched, errors, submitCount, dispatch } = formReducer<Values>({
		initialErrors,
		initialSubmitCount: 0,
		initialTouched,
		initialValues,
	});

	/**
	 * Runs the whole or field validation based on the field parameter
	 * @param field {string}
	 */
	const validateThroughSchema = async (field?: string) => {
		if (!validationSchema) return;
		let formValues;
		values.subscribe((value) => (formValues = value));

		const schema = isFunction(validationSchema) ? validationSchema(formValues) : validationSchema;

		try {
			await (field
				? schema.validateAt(field, formValues)
				: schema.validate(formValues, { abortEarly: false }));
			errors.update((error) => (field ? { ...error, [field]: '' } : {}));
			return true;
		} catch (err) {
			const validationErrors = err as Yup.ValidationError;
			const formattedError: any = {};

			if (field) formattedError[field] = validationErrors.errors[0];
			else
				validationErrors.inner.forEach(
					(validationError) =>
						(formattedError[validationError.path as string] = validationError.errors[0]),
				);

			errors.update((error) => ({ ...error, ...formattedError }));
			return false;
		}
	};

	/**
	 * Sets the value of the field. shouldValidate is true on default
	 * @param name
	 * @param value
	 * @param shouldValidate
	 */
	const setFieldValue: Types.SetFieldValue = (name, value, shouldValidate = true) => {
		dispatch({ type: FormDispatchType.SET_FIELD_VALUE, payload: { name, value } });
		if (shouldValidate === true) validateThroughSchema(name);
	};

	/**
	 * Set the touched state of the field. shouldValidate is true on default
	 * @param name
	 * @param touched
	 * @param shouldValidate
	 */
	const setFieldTouched: Types.SetFieldTouched = (name, touched = true, shouldValidate = true) => {
		dispatch({ type: FormDispatchType.SET_FIELD_TOUCHED, payload: { name, touched } });
		if (shouldValidate === true) validateThroughSchema(name);
	};

	/**
	 * Change event of input. Validation depends upon validateOnChange
	 * @param e {InputChangeEvent<HTMLInputElement>}
	 */
	const handleChange = (e: Types.InputChangeEvent<HTMLInputElement>) => {
		setFieldValue(e.currentTarget.name, e.currentTarget.value, validateOnChange);
	};

	/**
	 * Blur event of input. Validation depends upon validateOnBlur
	 * @param e {InputFocusEvent<HTMLInputElement>}
	 */
	const handleBlur = (e: Types.InputFocusEvent<HTMLInputElement>) => {
		setFieldTouched(e.currentTarget.name, true, validateOnBlur);
	};

	/**
	 * Set Errors of multiple field
	 * @param errors
	 */
	const setError: Types.SetError<Values> = (errors) => {
		dispatch({ type: FormDispatchType.SET_ERROR, errors });
	};

	/**
	 * Set Touched of multiple field
	 * @param touched
	 */
	const setTouched: Types.SetTouched<Values> = (touched) => {
		dispatch({ type: FormDispatchType.SET_TOUCHED, touched });
	};

	/**
	 * Set Values of multiple field
	 * @param values
	 */
	const setValues: Types.SetValues<Values> = (values: Values) => {
		dispatch({ type: FormDispatchType.SET_VALUES, values });
	};

	/**
	 * Form Submit Function
	 * @param event {SubmitEvent}
	 */
	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		dispatch({ type: FormDispatchType.SUBMIT_COUNT });

		Object.keys(initialValues).forEach((key) => {
			touched.update((state) => ({ ...state, [key]: true }));
		});

		let isSuccess = true;
		if (validationSchema) isSuccess = await validateThroughSchema();

		if (isSuccess) values.subscribe(onSubmit);
	};

	return {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		submitCount,
		setFieldValue,
		setFieldTouched,
		setError,
		setTouched,
		setValues,
	};
};

export default handleForm;
