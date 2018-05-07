import * as React from 'react';
import { string } from 'prop-types';
import style from './HelperContent.st.css';
import { Text } from '../../../components/Text';
import { DataHooks } from './DataHooks';
import { Button, ButtonSkin, ButtonPriority, ButtonSize } from '../../Button';
export interface HelperContentProps {
  /** Adds text as the title */
  title?: string;
  /** Adds text as the body */
  body?: string;
  /** Sets the text of the action button. Needs to be a non-empty string in order for the action button to appear */
  actionText?: string
}

export const HelperContent: React.SFC<HelperContentProps> = (props: HelperContentProps) => {

  return (
    <div {...style('root', { hasBody: !!props.body }, props)}>
      {props.title &&
        <div className={style.title}>
          <Text data-hook={DataHooks.title} bold light>
            {props.title}
          </Text>
        </div>
      }
      {props.body &&
        <div className={style.body}>
          <Text data-hook={DataHooks.body} light>
            {props.body}
          </Text>
        </div>
      }
      {props.actionText && props.actionText.length > 0 &&
        <Button
          className={style.action}
          data-hook={DataHooks.actionButton}
          skin={ButtonSkin.white}
          priority={ButtonPriority.secondary}
          size={ButtonSize.small}
        >
          {props.actionText}
        </Button>
      }
    </div>
  );
};

HelperContent.propTypes = {
  title: string,
  body: string,
  actionText: string
}
