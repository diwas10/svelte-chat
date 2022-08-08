import type { FormErrors, FormInitialState, FormTouched, FormValues } from './form.schema';
import { writable } from 'svelte/store';

enum FormDispatchType {
	SET_FIELD_VALUE,
	SET_FIELD_TOUCHED,
	SET_FIELD_ERROR,
	SUBMIT_COUNT,
	SET_VALUES,
	SET_ERROR,
	SET_TOUCHED,
}

type FormDispatch<Values> =
	{ type: FormDispatchType.SET_FIELD_VALUE, payload: { name: string, value: string } } |
	{ type: FormDispatchType.SET_FIELD_TOUCHED, payload: { name: string, touched: boolean } } |
	{ type: FormDispatchType.SET_FIELD_ERROR, payload: { name: string, error: string } } |
	{ type: FormDispatchType.SUBMIT_COUNT, } |
	{ type: FormDispatchType.SET_VALUES, values: Values } |
	{ type: FormDispatchType.SET_ERROR, errors: FormErrors<Values> } |
	{ type: FormDispatchType.SET_TOUCHED, touched: FormTouched<Values> }

/**
 * @param state
 */
const formReducer = <Values extends FormValues>(state: FormInitialState<Values>) => {
	const values = writable(state.initialValues);
	const touched = writable(state.initialTouched);
	const errors = writable(state.initialErrors);
	const submitCount = writable(state.initialSubmitCount);

	const dispatch = (action: FormDispatch<Values>) => {
		switch (action.type) {
			case FormDispatchType.SET_FIELD_VALUE:
				values.update(value => ({ ...value, [action.payload.name]: action.payload.value }));
				break;
			case FormDispatchType.SET_FIELD_TOUCHED:
				touched.update(touch => ({ ...touch, [action.payload.name]: action.payload.touched }));
				break;
			case FormDispatchType.SET_FIELD_ERROR:
				errors.update(error => ({ ...error, [action.payload.name]: action.payload.error }));
				break;
			case FormDispatchType.SUBMIT_COUNT:
				submitCount.update(count => count + 1);
				break;
			case FormDispatchType.SET_ERROR:
				errors.update(error => ({ ...error, ...action.errors }));
				break;
			case FormDispatchType.SET_TOUCHED:
				touched.update(touch => ({ ...touch, ...action.touched }));
				break;
			case FormDispatchType.SET_VALUES:
				touched.update(touch => ({ ...touch, ...action.values }));
				break;
		}
	};

	return { values, touched, errors, submitCount, dispatch };
};

export { FormDispatchType, formReducer };