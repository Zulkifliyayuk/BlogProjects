import React from 'react';

type InputGroupProps = {
  children: React.ReactNode;
  errorMessage?: string;
};

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  errorMessage,
}) => {
  return (
    <div className='w-full'>
      <div>{children}</div>
      {errorMessage && (
        <p className='font-regular mt-1 text-xs leading-6 text-[#EE1D52]'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
