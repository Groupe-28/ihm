import classNames from 'classnames';
import { ITextProps } from './types';

export const Text = ({
  width = 'regular',
  family = 'hind',
  variant = 'body',
  className,
  children,
}: ITextProps) => {
  const familyClass: Record<typeof family, string> = {
    foldit: 'font-foldit',
    hind: 'font-hind',
  };

  const widthClass: Record<typeof width, string> = {
    light: 'font-light',
    regular: 'font-normal',
    bold: 'font-bold',
    black: 'font-black',
  };

  const variantClass: Record<typeof variant, string> = {
    body: 'text-md',
    title: 'text-xl',
    subtitle: 'text-lg',
    caption: 'text-sm',
  };

  const classes = classNames(
    className,
    widthClass[width],
    familyClass[family],
    variantClass[variant],
  );

  return <p className={classes}>{children}</p>;
};
