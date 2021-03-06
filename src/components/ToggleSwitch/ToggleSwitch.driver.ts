import {toggleSwitchDriverFactory as coreToggleSwitchDriverFactory} from 'wix-ui-core/drivers/vanilla';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './ToggleSwitch.st.css';

export const toggleSwitchDriverFactory = ({element, eventTrigger}) => {
  const coreToggleSwitchDriver = coreToggleSwitchDriverFactory({element, eventTrigger});
  const stylableDOMUtil = new StylableDOMUtil(style, element);

  return {
    ...coreToggleSwitchDriver,
    getSize: () => stylableDOMUtil.getStyleState(element, 'size'),
    getSkin: () => stylableDOMUtil.getStyleState(element, 'skin')
  };
};
