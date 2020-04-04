import { Label as LabelComponent } from './Label';
import { createHOC } from 'wix-ui-core/dist/src/createHOC';

export const Label = createHOC(LabelComponent);
export { Size as LabelSize, SIZES as LABEL_SIZES } from './constants';
