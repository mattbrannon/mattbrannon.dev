import { CopyButton } from './styles';
import { forwardRef, useState } from 'react';

async function copyText(selectedText) {
  try {
    await navigator.clipboard.writeText(selectedText);
  }
  catch (err) {
    //
  }
}

export const Button = ({ ...props }) => {
  return <CopyButton {...props}>{props.children}</CopyButton>;
};

// export const Button = forwardRef(ForwardButton);

// const Button = ({ children, ...props }) => {
//   return (
//     <CopyButton onClick={() => props.handleButtonClick()} {...props}>
//       {children}
//     </CopyButton>
//   );
// };
