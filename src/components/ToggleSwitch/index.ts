import { ToggleSwitch as ToggleSwitchComponent } from './ToggleSwitch';
import { createHOC } from 'wix-ui-core/dist/src/createHOC';

export const ToggleSwitch = createHOC(ToggleSwitchComponent);
export {
  Skin as ToggleSwitchSkin,
  Size as ToggleSwitchSize,
  SKINS as TOGGLE_SWITCH_SKINS,
  SIZES as TOGGLE_SWITCH_SIZES,
} from './constants';
