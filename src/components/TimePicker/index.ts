import { TimePicker as TimePickerComponent } from './TimePicker';
import { createHOC } from 'wix-ui-core/dist/src/createHOC';

export const TimePicker = createHOC(TimePickerComponent);
export { Size as TimePickerSize } from './constants';