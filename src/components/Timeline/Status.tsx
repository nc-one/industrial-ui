import * as React from 'react';
import injectSheet, { StyleSheet, WithStyles } from 'react-jss';
import { compose, setDisplayName } from 'recompose';
import { TimelineArrangement, TimelineStatusType } from './Timeline';

type CompProps = Readonly<TimelineStatusType>;

type Props = WithStyles<ClassKey> & CompProps;

const lineWrapperStyles: Record<TimelineArrangement, React.CSSProperties> = {
  single: {
    height: 0
  },
  start: {
    paddingTop: 8
  },
  continue: {
    paddingTop: 0
  },
  end: {
    paddingTop: 0,
    height: 8
  }
};

const StatusComp = ({ classes, color, arrangement }: Props) => (
  <div className={classes.root}>
    <div className={classes.lineWrapper} style={lineWrapperStyles[arrangement]}>
      <div className={classes.line} style={{ backgroundColor: color }} />
    </div>
    <div className={classes.circleWrapper}>
      <div className={classes.circle} style={{ backgroundColor: color }} />
    </div>
  </div>
);

type ClassKey = 'root' | 'lineWrapper' | 'line' | 'circleWrapper' | 'circle';

const CIRCLE_SIZE = 16;

const styles: StyleSheet<ClassKey> = {
  root: {},
  lineWrapper: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  line: {
    width: 2,
    height: '100%'
  },
  circleWrapper: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 8
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2
  }
};

export const StatusComponent = compose<Props, CompProps>(
  setDisplayName('Status'),
  injectSheet(styles)
)(StatusComp);