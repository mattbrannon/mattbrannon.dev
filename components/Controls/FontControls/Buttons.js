import styled from 'styled-components';
import { NormalButton, FancyButton } from '@components/Button';

export const Buttons = ({ state, ...props }) => {
  const showCodeText = props.show.code ? 'Back to Editor' : 'Get Css';
  const showHelpText = props.show.help ? 'Back to Editor' : 'Help';

  return (
    <ButtonGroup>
      <NormalButton name="help" {...props}>
        {showHelpText}
      </NormalButton>
      <NormalButton name="code" {...props}>
        {showCodeText}
      </NormalButton>
      <FancyButton name="reset" {...props}>
        Reset
      </FancyButton>
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: 32px 0 0px 0;
`;

// import styled from 'styled-components';
// import { NormalButton, FancyButton } from '@components/Button';

// export const Buttons = ({ state, dispatch, ...props }) => {
//   // const showCodeText = props.show.code ? 'Back to Editor' : 'Get Css';
//   // const showHelpText = props.show.help ? 'Back to Editor' : 'Help';
//   // console.log(props);

//   const handleHelp = () => {
//     dispatch({ type: 'HELP', value: !state.help });
//     dispatch({ type: 'CODE', value: false });
//   };
//   const handleCode = () => {
//     dispatch({ type: 'CODE', value: !state.code });
//     dispatch({ type: 'HELP', value: false });
//   };
//   const handleReset = () => {
//     dispatch({ type: 'CODE', value: false });
//     dispatch({ type: 'HELP', value: false });
//     dispatch({ type: 'RESET', value: true });
//   };

//   return (
//     <ButtonGroup>
//       <NormalButton onClick={handleHelp} name="help" {...props}>
//         {state.help ? 'Back to editor' : 'Help'}
//       </NormalButton>
//       <NormalButton onClick={handleCode} name="code" {...props}>
//         {state.code ? 'Back to editor' : 'Get CSS'}
//       </NormalButton>
//       <FancyButton onClick={handleReset} name="reset" {...props}>
//         Reset
//       </FancyButton>
//     </ButtonGroup>
//   );
// };

// const ButtonGroup = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   gap: 8px;
//   width: 100%;
//   margin: 32px 0 0px 0;
// `;
