import { CounterBadge as CounterBadgeComponent } from './CounterBadge';
import { createHOC } from 'wix-ui-core/dist/src/createHOC';

export const CounterBadge = createHOC(CounterBadgeComponent);
export {
  Skin as CounterBadgeSkin,
  SKIN as COUNTER_BADGE_SKIN,
  maxContentLength as counterBadgeMaxContentLength,
} from './constants';
