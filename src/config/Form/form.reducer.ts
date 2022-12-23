import type { FormErrors, FormInitialState, FormTouched, FormValues } from './form.schema';
import { writable } from 'svelte/store';
import { setNestedObjectValues } from './utils';

enum FormDispatchType {
	SET_FIELD_VALUE,
	SET_FIELD_TOUCHED,
	SET_FIELD_ERROR,
	SUBMIT_ATTEMPT,
	SET_VALUES,
	SET_ERROR,
	SET_TOUCHED,
}

type FormDispatch<Values> =
	| { type: FormDispatchType.SET_FIELD_VALUE; payload: { name: string; value: string } }
	| { type: FormDispatchType.SET_FIELD_TOUCHED; payload: { name: string; touched: boolean } }
	| { type: FormDispatchType.SET_FIELD_ERROR; payload: { name: string; error: string } }
	| { type: FormDispatchType.SUBMIT_ATTEMPT }
	| { type: FormDispatchType.SET_VALUES; values: Values }
	| { type: FormDispatchType.SET_ERROR; errors: FormErrors<Values> }
	| { type: FormDispatchType.SET_TOUCHED; touched: FormTouched<Values> };

/**
 * @param state
 */
const formReducer = <Values extends FormValues>(state: FormInitialState<Values>) => {
	const writableValues = writable(state.initialValues);
	const writableTouched = writable(state.initialTouched);
	const writableErrors = writable(state.initialErrors);
	const writableSubmitCount = writable(state.initialSubmitCount);

	const dispatch = (action: FormDispatch<Values>) => {
		switch (action.type) {
			case FormDispatchType.SET_FIELD_VALUE:
				writableValues.update((value) => ({
					...value,
					[action.payload.name]: action.payload.value,
				}));
				break;
			case FormDispatchType.SET_FIELD_TOUCHED:
				writableTouched.update((touch) => ({
					...touch,
					[action.payload.name]: action.payload.touched,
				}));
				break;
			case FormDispatchType.SET_FIELD_ERROR:
				writableErrors.update((error) => ({
					...error,
					[action.payload.name]: action.payload.error,
				}));
				break;
			case FormDispatchType.SUBMIT_ATTEMPT:
				writableSubmitCount.update((count) => count + 1);
				writableTouched.update(() => setNestedObjectValues(state.initialValues, true));
				break;
			case FormDispatchType.SET_ERROR:
				writableErrors.update((error) => ({ ...error, ...action.errors }));
				break;
			case FormDispatchType.SET_TOUCHED:
				writableTouched.update((touch) => ({ ...touch, ...action.touched }));
				break;
			case FormDispatchType.SET_VALUES:
				writableTouched.update((touch) => ({ ...touch, ...action.values }));
				break;
		}
	};

	return { writableValues, writableErrors, writableTouched, writableSubmitCount, dispatch };
};

export { FormDispatchType, formReducer };
