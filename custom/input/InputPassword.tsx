'use client';

import * as React from 'react';
import { useState } from 'react';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Input, InputProps } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow((value) => !value);
  };

  return (
    <div className='relative'>
      <Input ref={ref} type={show ? 'text' : 'password'} {...props} />
      <Button
        className='absolute top-[50%] translate-y-[-50%] right-0'
        type='button'
        variant='ghost'
        size='icon'
        onClick={onClick}
      >
        {show ? <EyeNoneIcon /> : <EyeOpenIcon />}
      </Button>
    </div>
  );
});
InputPassword.displayName = 'Password';

export default InputPassword;
