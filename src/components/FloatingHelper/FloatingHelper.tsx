import * as React from 'react';
import { ClosablePopover, ClosablePopoverProps, ClosablePopoverActions, Placement, AppendTo } from './ClosablePopover';
import style from './FloatingHelper.st.css';
import { DataHooks } from './DataHooks';
import { CloseButton, CloseButtonSkin, CloseButtonSize } from '../CloseButton';
import { FloatingHelperContent } from './FloatingHelperContent';
import { Appearance } from './constants';
export {Placement, AppendTo};

export interface FloatingHelperOwnProps {
  /** Width HTML attribute of the content. If a number is passed then it defaults to px. e.g width={400} => width="400px" */
  width?: string | number;
  /** The target of the popover */ 
  target: React.ReactNode
  /** A `<FloatingHelper.Content>` component */
  content: React.ReactNode
  /** In Controlled mode - called when the close button is clicked. In Uncontrolled mode - called when the popover is closed */
  onClose?: Function;
  /** Appearance : `dark` or `light` */
  appearance?: Appearance;
}

// This HACK is only for AutoDocs to work - see issue - https://github.com/wix/wix-ui/issues/550
export interface PickedClosablePopoverPropsHack {
  /** Controls wether the popover's content is initially opened (In Uncontrolled mode only) */
  initiallyOpened?: boolean;
  /** Controls wether the popover's content is shown or not (aka Controlled mode). 
   * When undefined, then the component is Uncontrolled. See open/close behaviour section in docs. */
  opened?: boolean;
  /** The location to display the content. possible values: 'auto-start',
  'auto',
  'auto-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-end',
  'bottom',
  'bottom-start',
  'left-end',
  'left',
  'left-start' */
  placement: Placement;
  /** Enables calculations in relation to a dom element. possible values: 'scrollParent', 'viewport', 'window' or an Element. See PopperJs docs: https://popper.js.org/popper-documentation.html#modifiers..preventOverflow.boundariesElement */
  appendTo?: AppendTo;
  /** Callback to call when the popover content is requested to be opened (Uncontrolled mode only)*/
  onOpen?: Function;
}

export type PickedClosablePopoverProps = Pick<ClosablePopoverProps,
   'initiallyOpened'| 'opened' | 'target'| 'onClose'| 'onOpen'| 'placement'| 'appendTo'>;
const pickedPropNames: Array<keyof PickedClosablePopoverProps> =
  ['initiallyOpened', 'opened' , 'target', 'onClose', 'onOpen', 'placement', 'appendTo'];

export type FloatingHelperProps = PickedClosablePopoverProps & FloatingHelperOwnProps & PickedClosablePopoverPropsHack;

export class FloatingHelper extends React.Component<FloatingHelperProps> {
  static displayName = 'FloatingHelper';
  closablePopoverRef: ClosablePopover;

  static Content = FloatingHelperContent;

  static defaultProps: Partial<FloatingHelperProps> = {
    appendTo: 'window',
    width: '444px',
    initiallyOpened: true,
    appearance: Appearance.dark
  };


  open = () => { this.closablePopoverRef.open() };

  close = () => { this.closablePopoverRef.close() };

  isControlled() {
    return this.props.opened !== undefined;
  }

  getCloseButtonHandler(closableActions: ClosablePopoverActions) {
    return this.isControlled()?
      (this.props.onClose ? this.props.onClose : ()=>null) :
      closableActions.close
  }

  renderContent(closableActions: ClosablePopoverActions, {width, content, appearance}: Partial<FloatingHelperProps>) {
    return (
      <div data-hook={DataHooks.contentWrapper} style={{ width }}>
        <CloseButton
          className={style.closeButton}
          data-hook={DataHooks.closeButton}
          onClick={()=>this.getCloseButtonHandler(closableActions)()}
          skin={appearance === Appearance.dark ? CloseButtonSkin.white: CloseButtonSkin.dark}
          size={CloseButtonSize.large}
        />
        <div data-hook={DataHooks.innerContent} className={style.innerContent}>
          {React.cloneElement(content as React.ReactElement<any>, {appearance})}
        </div>
      </div>
    )
  }

  render() {
    const { children, width, content, appearance, ...rest } = this.props;

    const renderContent = (closableActions: ClosablePopoverActions)=>this.renderContent(closableActions,{width, content, appearance});

    const closablePopoverProps: ClosablePopoverProps = {
      ...rest,
      content: renderContent,
      showArrow: true,
      closeOnMouseLeave: false // TODO: We pass this as a workaround because with React-15 the mouse-enter does not propagate from the Portal to the React-Popper's Manager
    };

    return (
      <ClosablePopover
        {...closablePopoverProps}
        ref={ref => this.closablePopoverRef = ref}
        {...style('root', {appearance}, this.props)}
      />
    );
  };
}
