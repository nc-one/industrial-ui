/*
 * Copyright 2020 Actyx AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TouchRipple } from '../TouchRipple';
import { Typography } from '../Typography';
import { theme } from '../../theme';
import * as React from 'react';
import injectSheet, { StyleSheet, WithStyles } from 'react-jss';
import { compose, setDisplayName } from 'recompose';

export type HorizontallyScrollableListItem = Readonly<{
  id: string;
  name: string;
}>;

type CompProps = Readonly<{
  items: ReadonlyArray<HorizontallyScrollableListItem>;
  rows: number;
  onItemSelect: (item: HorizontallyScrollableListItem) => void;
}>;

type Props = WithStyles<ClassKey> & CompProps;

const HorizontallyScrollableListComp = ({ classes, items, onItemSelect, rows }: Props) => {
  const cols = Math.ceil(items.length / rows);
  const matrix: (HorizontallyScrollableListItem | undefined)[][] = Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(undefined));

  for (let col = 0, idx = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      matrix[row][col] = items[idx++];
    }
  }

  return (
    <div className={classes.root}>
      <table>
        <tbody>
          {matrix.map((x, idxx) => {
            const rowKey = x.map((y, z) => (y ? y.name : z)).join('-') + idxx;
            return (
              <tr key={rowKey}>
                {x.map((item, idx) => {
                  const backgroundColor =
                    idx % 2 === 0 ? theme.palette.grey[50] : theme.palette.common.white;
                  return item ? (
                    <td
                      key={rowKey + item.name}
                      style={{ backgroundColor }}
                      onClick={() => onItemSelect(item)}
                    >
                      <TouchRipple className={classes.itemContainer}>
                        <div className={classes.item}>
                          <Typography variant="standard" textTransform="uppercase">
                            {item.name}
                          </Typography>
                        </div>
                      </TouchRipple>
                    </td>
                  ) : (
                    <td key={rowKey + idx} style={{ backgroundColor }} />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

type ClassKey = 'root' | 'itemContainer' | 'item';

const borderWidth = 1;

const styles: StyleSheet<ClassKey> = {
  root: {
    overflowY: 'hidden',
    overflowX: 'auto',
    '& table': {
      borderCollapse: 'collapse',
      border: 'none'
    },
    '& td': {
      border: `${borderWidth}px solid ${theme.palette.grey[300]}`,
      padding: 0
    }
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    width: 360 - borderWidth,
    height: 80 - borderWidth
  },
  item: {
    width: '100%',
    height: '100%'
  }
};

export const HorizontallyScrollableList = compose<Props, CompProps>(
  setDisplayName('HorizontallyScrollableList'),
  injectSheet(styles)
)(HorizontallyScrollableListComp);
