import * as eyes from 'eyes.it';
import {getStoryUrl} from 'wix-ui-test-utils/protractor';
import {checkboxTestkitFactory} from 'wix-ui-core/dist/src/testkit/protractor';
import {browser} from 'protractor';

describe('Checkbox', () => {
  const storyUrl = getStoryUrl('Components', 'Checkbox');
  const dataHook = 'storybook-checkbox';

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should render', () => {
    const driver = checkboxTestkitFactory({dataHook});

    expect(driver.element()).toBeDefined();
  });

  xit('should be unchecked and not disabled by default', () => {
    const driver = checkboxTestkitFactory({dataHook});

    expect(driver.isChecked()).toBe(false);
    expect(driver.isDisabled()).toBe(false);
  });

  xit('should become checked', () => {
    const driver = checkboxTestkitFactory({dataHook});

    expect(driver.isChecked()).toBe(false);

    driver.click();

    expect(driver.isChecked()).toBe(true);
  });
});
