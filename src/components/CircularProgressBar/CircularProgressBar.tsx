import * as React from 'react';
import {
  CircularProgressBar as CoreCircularProgressBar,
  CircularProgressBarProps as CoreCircularProgressBarProps
} from 'wix-ui-core/dist/src/components/circular-progress-bar';
import CircleLoaderCheck from 'wix-ui-icons-common/system/CircleLoaderCheck';
import CircleLoaderCheckSmall from 'wix-ui-icons-common/system/CircleLoaderCheckSmall';
import FormFieldError from 'wix-ui-icons-common/system/FormFieldError';
import FormFieldErrorSmall from 'wix-ui-icons-common/system/FormFieldErrorSmall';
import style from './CircularProgressBar.st.css';
import { Tooltip } from '../Tooltip';
import { Size, sizesMap } from './constants';
import { enumValues } from '../../utils';
import { Omit } from '../../types/common';

export interface CircularProgressBarProps
  extends Omit<CoreCircularProgressBarProps, 'successIcon' | 'errorIcon'> {
  /** message to display when an error happens */
  errorMessage?: string;
  /** use light theme instead of dark theme */
  light?: boolean;
  /** size of the bar */
  size?: Size;
}

const sizeToSuccessIcon = {
  [Size.small]: <CircleLoaderCheckSmall />,
  [Size.medium]: <CircleLoaderCheck />,
  [Size.large]: <CircleLoaderCheck />
};

const sizeToErrorIcon = {
  [Size.small]: <FormFieldErrorSmall />,
  [Size.medium]: <FormFieldError />,
  [Size.large]: <FormFieldError />
};

export const CircularProgressBar: React.SFC<CircularProgressBarProps> = (
  props: CircularProgressBarProps
) => {
  const { errorMessage, light, size, ...otherProps } = props;

  const ProgressBar = (
    <CoreCircularProgressBar
      {...style('progressBar', { light, size }, props)}
      {...otherProps}
      data-hook="circular-progress-bar"
      size={sizesMap[size]}
      successIcon={sizeToSuccessIcon[size]}
      errorIcon={sizeToErrorIcon[size]}
    />
  );

  return (
    <div {...style('root', {}, props)}>
      {props.error && errorMessage ? (
        <Tooltip
          data-hook="circular-progressbar-tooltip"
          placement="top"
          content={errorMessage}
        >
          {ProgressBar}
        </Tooltip>
      ) : (
        ProgressBar
      )}
    </div>
  );
};

CircularProgressBar.displayName = 'CircularProgressBar';

CircularProgressBar.defaultProps = {
  size: Size.medium
};
