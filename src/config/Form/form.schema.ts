type WithTarget<Event, Target> = Event & { currentTarget: Target };

type InputChangeEvent<Target> = WithTarget<InputEvent, Target>;
type InputFocusEvent<Target> = WithTarget<FocusEvent, Target>;

export type { WithTarget, InputFocusEvent, InputChangeEvent };
