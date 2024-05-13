import * as React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Input, InputProps } from '@/components/ui/input';

const InputWithButton = React.forwardRef<
  HTMLInputElement,
  { input?: InputProps; button?: ButtonProps; buttonChild: React.ReactNode }
>(({ input = {}, button = {}, buttonChild }, ref) => {
  const { type, ...buttonProps } = button;
  return (
    <div className='flex w-full max-w-sm items-center space-x-2'>
      <Input ref={ref} {...input} />
      <Button type={type ?? 'button'} {...buttonProps}>
        {buttonChild}
      </Button>
    </div>
  );
});
InputWithButton.displayName = 'InputWithButton';

export default InputWithButton;
