
import { buttonDriverFactory as coreButtonDriverFactory, ButtonDriver as CoreButtonDriver } from 'wix-ui-core/drivers-standalone/vanilla';
import { StylableDOMUtilCompat } from '@stylable/dom-test-kit';
import { DriverFactory, BaseDriver, ComponentFactory } from 'wix-ui-test-utils/driver-factory';
import style from './Button.st.css';
import { Skin, Priority, Size } from './constants';

export interface ButtonDriver extends CoreButtonDriver {
  getSkin: () => Skin;
  getPriority: () => Priority;
  getSize: () => Size;
}

export const buttonDriverFactory: DriverFactory<ButtonDriver> = (factoryParams: ComponentFactory): ButtonDriver => {
  const { element } = factoryParams;
  const stylableDOMUtil = new StylableDOMUtilCompat(style, element);
  const getStyleState = <T>(stateName: string) => stylableDOMUtil.getStyleState(element, stateName) as any as T | null;

  return {
    ...coreButtonDriverFactory(factoryParams),
    getSkin: () => getStyleState<Skin>('skin'),
    getPriority: () => getStyleState<Priority>('priority'),
    getSize: () => getStyleState<Size>('size'),
  };
};
