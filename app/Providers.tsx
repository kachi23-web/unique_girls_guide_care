'use client';
import React, { PropsWithChildren } from 'react';

import ProgressBarProvider from '@/libs/ProgressBarProvider';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ProgressBarProvider>{children}</ProgressBarProvider>
    </>
  );
};

export default Providers;
