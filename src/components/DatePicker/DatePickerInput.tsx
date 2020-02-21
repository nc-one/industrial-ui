import { theme } from '../../theme';
import * as React from 'react';
import injectSheet, { StyleSheet, WithStyles } from 'react-jss';
import { compose, setDisplayName } from 'recompose';
import { Input } from '../Input';

type CompProps = {
  value?: string;
  onClick?: () => void;
};

type Props = WithStyles<ClassKey> & CompProps;

const DatePickerInputComp = (props: Props) => {
  return <Input {...props} className={props.classes.input} type="text" readOnly />;
};

type ClassKey = 'input';

const styles: StyleSheet<ClassKey> = {
  input: {
    backgroundColor: theme.palette.common.white,
    fontSize: 28
  }
};

export const DatePickerInput = compose<Props, CompProps>(
  setDisplayName('DatePickerInput'),
  injectSheet(styles)
)(DatePickerInputComp);