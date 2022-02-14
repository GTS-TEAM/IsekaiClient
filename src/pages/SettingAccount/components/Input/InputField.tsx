import React, { FocusEvent, FormEvent, HTMLInputTypeAttribute, useState } from 'react';
import { Control, ErrorMessage, Input, InputFieldWrap, Label, StyledInputFiled } from './Styles';

interface Props {
  onChange?: (e: FormEvent<HTMLInputElement>) => any;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => any;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => any;
  id?: string;
  name?: string;
  value?: string;
  label: string;
  icon: any;
  placeholder?: string;
  error?: any;
  errorText?: string | undefined;
  type?: HTMLInputTypeAttribute;
}

const InputField: React.FC<Props> = ({
  onChange,
  onBlur,
  value,
  label,
  icon,
  id,
  name,
  placeholder,
  error,
  errorText,
  type = 'text',
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
    setIsFocus(false);
  };

  return (
    <StyledInputFiled>
      <InputFieldWrap isFocus={isFocus} isError={error}>
        <Label>{label}</Label>
        <Control>
          {icon}
          <Input
            value={value}
            id={id}
            name={name}
            onChange={onChange}
            onBlur={blurHandler}
            placeholder={placeholder}
            onFocus={focusHandler}
            type={type}
          />
        </Control>
      </InputFieldWrap>
      {error && <ErrorMessage>{errorText}</ErrorMessage>}
    </StyledInputFiled>
  );
};

export default InputField;
