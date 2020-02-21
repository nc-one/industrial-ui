import * as classNames from 'classnames';
import * as React from 'react';
import injectSheet, { StyleSheet, WithStyles } from 'react-jss';
import SwipeableViews from 'react-swipeable-views';
import { compose, setDisplayName } from 'recompose';
import { PaginationDots } from '../PaginationDots';

type CompProps = Readonly<{
  className?: string;
  children: React.ReactNode;
  defaultActiveViewIndex?: number;
}>;

type Props = WithStyles<ClassKey> & CompProps;

type State = Readonly<{
  activeViewIndex: number;
}>;

class SwipeableCardsComp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeViewIndex:
        props.defaultActiveViewIndex === undefined ||
        props.defaultActiveViewIndex < 0 ||
        props.defaultActiveViewIndex >= React.Children.count(props.children)
          ? 0
          : props.defaultActiveViewIndex
    };
  }

  static getDerivedStateFromProps(props: Props, state: State): State | null {
    const childrenCount = React.Children.count(props.children);
    return childrenCount <= state.activeViewIndex
      ? {
          activeViewIndex: 0
        }
      : null;
  }

  handleOnViewIndexChange = (index: number) => {
    this.setState({ activeViewIndex: index });
  };

  render(): React.ReactNode {
    const { classes, children, className } = this.props;
    const { activeViewIndex } = this.state;

    return (
      <div className={classNames(classes.root, className)}>
        <SwipeableViews
          enableMouseEvents
          index={activeViewIndex}
          onChangeIndex={this.handleOnViewIndexChange}
        >
          {children}
        </SwipeableViews>
        <PaginationDots
          onChangeIndex={this.handleOnViewIndexChange}
          dots={React.Children.count(children)}
          index={activeViewIndex}
        />
      </div>
    );
  }
}

type ClassKey = 'root';

const styles: StyleSheet<ClassKey> = {
  root: {
    position: 'relative'
  }
};

export const SwipeableCards = compose<Props, CompProps>(
  setDisplayName('SwipeableCards'),
  injectSheet(styles)
)(SwipeableCardsComp);