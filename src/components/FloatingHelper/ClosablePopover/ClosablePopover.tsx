import * as React from 'react';
import { Requireable, bool, func, node } from 'prop-types';
import isBoolean = require('lodash/isBoolean');
import pick = require('lodash/pick');
import { Popover, PopoverProps } from 'wix-ui-core/Popover';

export interface ClosablePopoverActions {
  /** Closes the popover content*/
  close: () => void;
}

export interface ClosablePopoverOwnProps {
  /** Controls wether the popover's content is shown or not. 
   * When undefined, then the component is Uncontrolled,
   * It is initially open, and it can be closed by close-action */
  opened?: boolean;
  /** The popover's content, given as a function that receives control-actions and renders the contet.
   * In Uncontrolled mode, this function is still called only once.
  */
  content: (closable: ClosablePopoverActions) => React.ReactNode;
  /** The popover's target element*/
  target: React.ReactNode;
  /** callback to call when the tooltip is shown */
  onShow?: Function;
  /** callback to call when the tooltip is being hidden */
  onHide?: Function;
  
}

export interface ClosablePopoverState {
  opened?: boolean;
}

const pickedPopoverPropTypes = pick(Popover.propTypes, ['className', 'placement', 'showArrow', 'moveBy', 'hideDelay', 'showDelay', 'moveArrowTo', 'appendTo', 'timeout']);
export type PickedPopoverProps = Pick<PopoverProps, 'className' | 'placement' | 'showArrow' | 'moveBy' | 'hideDelay' | 'showDelay' | 'moveArrowTo' | 'appendTo' | 'timeout'>;

export type ClosablePopoverProps = PickedPopoverProps & ClosablePopoverOwnProps;

/**
 * Closable Popover
 * Either a normal Controlled Popover, or a Popover that is inittialy opened and can be the closed by
 * calling a closeAction.
 */
export class ClosablePopover extends React.PureComponent<ClosablePopoverProps, ClosablePopoverState> {
  state: ClosablePopoverState;

  static propTypes: React.ValidationMap<ClosablePopoverProps> = {
    ...pickedPopoverPropTypes,
    opened: bool,
    content: func,
    target: node,
    onShow: func,
    onHide: func,
  };


  constructor(props: ClosablePopoverProps) {
    super(props);

    this.state = { opened: true};
  }

  isControlled() {
    return isBoolean(this.props.opened);
  }

  open = () => {
    if (!this.state.opened) {
      this.setState({opened: true},  ()=>{this.props.onShow && this.props.onShow()});
    }
  }

  close = () => {
    if (this.isControlled()) {
      throw new Error('ClosablePopover.close() can not be called when component is Controlled. (opened prop should be undefined)');
    }
    this.state.opened && this.setState({ opened: false }, ()=>{this.props.onHide && this.props.onHide()});
  }

  render() {
    // NOTE: we can not use pick, since there are unknown 'data-*' props coming from 
    // Stylabel (and the data-hook also). Also some variable constants are destructed from props
    // only to be 'omit' and are not in use. (Using lodash.omit is not type safe)
    const { opened, content, target, children, onHide, onShow, ...rest } = this.props;
    const open = this.isControlled() ? this.props.opened : this.state.opened;
    const popoverProps: PopoverProps = {...rest, shown: open, onMouseEnter: this.open, onMouseLeave: this.close};

    // Using createElement() in order to get ts props validation.
    return React.createElement(Popover, popoverProps, (
      <Popover.Element>
        {target}
      </Popover.Element>
    ), (
        <Popover.Content>
          {content(this.actions)}
        </Popover.Content>
      )
    );
  }

  actions: ClosablePopoverActions = {
    close: this.close,
  };
};

