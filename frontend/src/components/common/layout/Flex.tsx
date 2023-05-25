import classNames from 'classnames';
import { IFlexProps } from './types';

export const Flex = ({
  orientation = 'col',
  fullSize = true,
  xAlign = 'center',
  yAlign = 'center',
  className,
  children,
}: IFlexProps) => {
  const orientationClass: Record<typeof orientation, string> = {
    col: 'flex-col',
    row: 'flex-row',
  };

  const xAlignClass: Record<typeof xAlign, string> = {
    start: orientation === 'col' ? 'items-start' : 'justify-start',
    center: orientation === 'col' ? 'items-center' : 'justify-center',
    end: orientation === 'col' ? 'items-end' : 'justify-end',
    stretch: orientation === 'col' ? 'items-stretch' : 'justify-stretch',
  };

  const yAlignClass: Record<typeof yAlign, string> = {
    start: orientation === 'col' ? 'justify-start' : 'items-start',
    center: orientation === 'col' ? 'justify-center' : 'items-center',
    end: orientation === 'col' ? 'justify-end' : 'items-end',
    stretch: orientation === 'col' ? 'justify-stretch' : 'items-stretch',
  };

  const classes = classNames(
    className,
    fullSize && 'w-full h-full',
    orientationClass[orientation],
    xAlignClass[xAlign],
    yAlignClass[yAlign],
  );

  return <div className={classes}>{children}</div>;
};
