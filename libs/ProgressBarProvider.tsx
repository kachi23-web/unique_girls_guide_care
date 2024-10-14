'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#FF00FF"
        options={{ showSpinner: false }}
        shallowRouting={true}
        disableSameURL={true}
      />
    </>
  );
};

export default ProgressBarProvider;
