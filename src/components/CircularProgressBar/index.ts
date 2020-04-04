import {CircularProgressBar as CircularProgressBarComponent} from './CircularProgressBar';
import {createHOC} from 'wix-ui-core/dist/src/createHOC';

export const CircularProgressBar = createHOC(CircularProgressBarComponent);
export { Size as CircularProgressBarSize, sizesMap as CircularProgressBarSizesMap } from './constants';
