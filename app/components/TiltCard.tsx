'use client';

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { useTilt } from '../hooks/useTilt';

interface TiltProps<T extends ElementType = 'div'> {
  as?: T;
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export default function TiltCard<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  maxTilt = 6,
  scale = 1.015,
  ...props
}: TiltProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TiltProps<T>>) {
  const Component = as || 'div';
  const ref = useTilt<HTMLElement>({ maxTilt, scale });

  return (
    // @ts-expect-error polymorphic ref typing
    <Component ref={ref} className={`tilt-card ${className}`} {...props}>
      {children}
    </Component>
  );
}
