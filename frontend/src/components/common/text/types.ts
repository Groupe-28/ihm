import { ReactNode } from 'react';

type TTextVariant = 'title' | 'subtitle' | 'body' | 'caption';
type TTextWidth = 'light' | 'regular' | 'bold' | 'black';

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  variant?: TTextVariant;
  width?: TTextWidth;
  family?: 'hind' | 'foldit';
}
