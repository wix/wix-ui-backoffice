import * as React from 'react';
import style from './VBox.st.css';
import {addSpacing} from './utils';

export interface VBoxProps {
  children?: React.ReactNode;
  horizontalAlignment?: Alignment;
  spacing?: number;
}

export type Alignment = 'left' | 'center' | 'right';

const defaultProps: VBoxProps = {
  children: null,
  horizontalAlignment: 'left',
  spacing: 0
};

/**
 * VBox
 */
export const VBox: React.SFC<VBoxProps> = props => {
  const {children, horizontalAlignment, spacing} = props;
  return <div {...style('root', {horizontalAlignment}, props)}>{addSpacing(children, spacing)}</div>;
};

VBox.displayName = 'VBox';
VBox.defaultProps = defaultProps;
