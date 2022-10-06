import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "./marginer";
import { AccountContext } from "./accountContext";

const  doLogin = (e) => {
  console.log(e.target[0].value)
}

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  return (
    
    <BoxContainer>
      
      <FormContainer>
      <form onSubmit={doLogin}>
        <Input  type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        </form>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Signin</SubmitButton>
    
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
     
    </BoxContainer>
    
  );
}
