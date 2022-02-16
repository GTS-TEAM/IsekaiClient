import { FormikErrors } from 'formik';
import React, { FocusEvent, HTMLInputTypeAttribute, useState } from 'react';
import { Control, ErrorMessage, Input, InputFieldWrap, Label, StyledInputFiled } from './Styles';

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => any;
  id?: string;
  name?: string;
  value?: any;
  label: string;
  icon: any;
  placeholder?: string;
  error?: any;
  errorText?: string | undefined | FormikErrors<Date>;
  type?: HTMLInputTypeAttribute;
  props?: any;
  ref?: any;
  inputProps?: any;
}

const InputField: React.FC<Props> = React.forwardRef(
  (
    { onChange, onBlur, value, label, icon, id, name, placeholder, error, errorText, type = 'text', props, inputProps },
    ref,
  ) => {
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
              placeholder={placeholder}
              type={type}
              ref={ref}
              {...inputProps}
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </Control>
        </InputFieldWrap>
        {error && <ErrorMessage>{errorText}</ErrorMessage>}
      </StyledInputFiled>
    );
  },
);

export default InputField;
