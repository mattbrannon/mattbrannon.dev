import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

export default function ContactForm() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ isSubmitted, setIsSubmitted ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    axios
      .post('/api/contact', {
        name,
        email,
        message,
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (isSubmitted) {
      alert('Message sent');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(false);
    }
  }, [ isSubmitted ]);

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Legend>Contact Form</Legend>
        <InputGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="What's your name?"
            required={true}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="What's your email?"
            required={true}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="message">Message:</Label>
          <MessageInput
            type="text"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="What would you like to say?"
            required={true}
          />
        </InputGroup>
        <ButtonWrapper>
          <SubmitButton value="Send Message">Send Message</SubmitButton>
        </ButtonWrapper>
      </Fieldset>
    </Form>
  );
}

const Form = styled.form`
  padding: 32px;
  background: var(--form-background);
  box-shadow: 0 0 0 1px black;
  border-radius: 4px;
  margin: 32px 0;
  ${'' /* color: #000; */}

  --color-outline: var(--azure-light);
`;

const Fieldset = styled.fieldset`
  border: none;
  border-top: 2px solid black;
  margin: 0 auto;
`;

const Legend = styled.legend`
  margin: auto;
  padding: 0px 44px;
  font-weight: 700;
`;

export const InputGroup = styled.div`
  margin-top: 16px;
  &:nth-of-type(1) {
    margin-top: 0;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  margin: 16px auto 0 auto;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
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
  font-family: 'OpenSans', system-ui, sans-serif;
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
