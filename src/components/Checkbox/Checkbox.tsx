import * as React from 'react';
import {
  Checkbox as CoreCheckbox,
  CheckboxProps as CoreCheckboxProps
} from 'wix-ui-core/dist/standalone/src/components/checkbox';
import CheckboxChecked from 'wix-ui-icons-common/system/CheckboxChecked';
import CheckboxIndeterminate from 'wix-ui-icons-common/system/CheckboxIndeterminate';
import style from './Checkbox.st.css';
import { withStylable } from 'wix-ui-core/dist/standalone/src/utils/withStylable';

const defaultProps = {
  checkedIcon: <CheckboxChecked className={style.checkedIcon} />,
  indeterminateIcon: (
    <CheckboxIndeterminate className={style.indeterminateIcon} />
  )
};

export const Checkbox = withStylable<CoreCheckboxProps, {}>(
  CoreCheckbox,
  style,
  () => null,
  defaultProps
);

Checkbox.displayName = 'Checkbox';
