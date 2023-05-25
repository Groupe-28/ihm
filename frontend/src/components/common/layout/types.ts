import { ReactNode } from 'react';

export interface IFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fullSize?: boolean;
  orientation?: 'col' | 'row';
  xAlign?: 'start' | 'center' | 'end' | 'stretch';
  yAlign?: 'start' | 'center' | 'end' | 'stretch';
}
