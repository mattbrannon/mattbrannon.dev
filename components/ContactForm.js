import axios from 'axios';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { NormalButton as Button } from './Button';
import { MaxWidthWrapper } from './MaxWidthWrapper';
import { AnimatePresence, m as motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { breakpoints } from '@constants/breakpoints';

const fadeInOut = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 4 },
};

const SET_EMAIL = 'SET_EMAIL';
const SET_NAME = 'SET_NAME';
const SET_MESSAGE = 'SET_MESSAGE';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const SUBMIT = 'SUBMIT';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAME: {
      return { ...state, name: action.value };
    }
    case SET_EMAIL: {
      return { ...state, email: action.value };
    }
    case SET_MESSAGE: {
      return { ...state, message: action.value };
    }
    case SUBMIT: {
      return { ...state, submit: action.value };
    }
    case ERROR: {
      return { ...state, error: action.value };
    }
    case SUCCESS: {
      return { ...state, success: true };
    }
    default:
      break;
  }
};

export default function ContactForm() {
  const [state, dispatch] = useReducer(reducer, {});

  const Component = state.submit ? Popup : Contact;

  return (
    <div style={{ overflow: 'hidden', minHeight: '50vh' }}>
      <AnimatePresence exitBeforeEnter>
        <Component dispatch={dispatch} state={state} />
      </AnimatePresence>
    </div>
  );
}

const Popup = ({ state, dispatch }) => {
  const router = useRouter();
  return (
    <div style={{ position: 'relative' }}>
      <MaxWidthWrapper>
        <div
          style={{
            background: 'var(--form-background)',
            padding: '24px',
            borderRadius: '8px',
            // height: 'max-content',
          }}
        >
          <strong>Thank you!</strong>
          <p style={{ fontWeight: 700, fontFamily: 'Inter' }}>Your message has been sent.</p>
          <ButtonWrapper>
            <Button onClick={() => router.replace('/')}>Ok</Button>
          </ButtonWrapper>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

const Contact = ({ state, dispatch }) => {
  const handleSubmit = async (e) => {
    await e.preventDefault();
    try {
      // await axios.post('/api/contact', state);
      dispatch({ type: SUBMIT, value: true });
    }
    catch (error) {
      dispatch({ type: ERROR, value: error.message });
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Form
        variants={fadeInOut}
        initial="hidden"
        animate="show"
        exit="exit"
        key={state.submit}
        onSubmit={handleSubmit}
      >
        <FlexGroup>
          <InputGroup>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              name="name"
              onChange={(e) => dispatch({ type: SET_NAME, value: e.target.value })}
              placeholder="What's your name?"
              required={true}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              onChange={(e) => dispatch({ type: SET_EMAIL, value: e.target.value })}
              placeholder="What's your email?"
              required={true}
            />
          </InputGroup>
        </FlexGroup>

        <InputGroup>
          <Label htmlFor="message">Message:</Label>
          <MessageInput
            type="text"
            name="message"
            onChange={(e) => dispatch({ type: SET_MESSAGE, value: e.target.value })}
            placeholder="What would you like to say?"
            required={true}
          />
        </InputGroup>
        <ButtonWrapper>
          <Button value="Send Message">Send Message</Button>
        </ButtonWrapper>
        {/* </Fieldset> */}
      </Form>
    </AnimatePresence>
  );
};

const FlexGroup = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 16px;
  @media (max-width: ${breakpoints.mobile}px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Form = styled(motion.form)`
  padding: 32px;
  background: var(--form-background);
  /* box-shadow: 0 0 0 1px black; */
  border-radius: 6px;
  /* margin: 32px 0; */
  ${'' /* color: #000; */}

  font-family: Inter;
  font-variation-settings: 'wght' 600, 'slnt' 10;
  border: 1px solid black;

  --color-outline: var(--azure-light);
`;

const Fieldset = styled.fieldset`
  border: none;
  border-top: 2px solid black;
  margin: 0 auto;
`;

const Legend = styled.legend`
  margin: auto;
  /* padding: 0px 44px; */
  font-weight: 700;
`;

export const InputGroup = styled.div`
  flex: 1;
  /* margin-top: 16px;
  &:nth-of-type(1) {
    margin-top: 0;
  } */
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  margin: 16px auto 0 auto;
  color: white;
`;

const Label = styled.label`
  display: block;
  font-size: var(--size14);
  margin-bottom: 4px;
`;

const Input = styled.input`
  border-radius: 4px;
  padding: 8px;
  border: none;
  border: 1px solid black;
  min-width: 0;
  width: 100%;
  font-size: var(--size16);
  font-family: Inter, 'OpenSans', system-ui, sans-serif;
  flex-basis: 80%;
  background: white;
  color: black;

  transition: box-shadow 0.2s ease-in-out;

  &:focus-visible {
    outline-offset: unset;
    outline: 2px solid var(--color-outline);
    outline: 2px solid var(--color-outline-form);
  }
`;

const MessageInput = styled(Input).attrs({
  as: 'textarea',
})`
  min-height: 140px;
  font-family: inherit;
  resize: none;
`;

const SubmitButton = styled(Button)`
  grid-column: 1 / -1;
  margin: auto;
`;
