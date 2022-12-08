import React, { useEffect, useCallback, useState } from "react";
import {
  IResolveParams,
  LoginSocialGoogle,
  LoginSocialLinkedin,
  LoginSocialFacebook,
} from "reactjs-social-login";

import {
  GoogleLoginButton,
  LinkedInLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

const REDIRECT_URI = "http://localhost:3000/account/login";
const REDIRECT_URI2 = "http://localhost:3000/loginn2";

const Button = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();

  // console.log(profile.access_token)

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);

  return (
    <div className={`App ${provider && profile ? "hide" : ""}`}>
      <LoginSocialGoogle
        client_id="234081863384-2pe1e3kt9fena6plafkqeaumc9449tln.apps.googleusercontent.com"
        onLoginStart={onLoginStart}
        redirect_uri={REDIRECT_URI}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
          console.log(provider, data);
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>

      <LoginSocialLinkedin
        client_id={"78d8hriyw21ckg"}
        client_secret={"5IxoFanSYWtgycNl"}
        redirect_uri={REDIRECT_URI2}
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
          console.log(data,provider)
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <LinkedInLoginButton />
      </LoginSocialLinkedin>

      <LoginSocialFacebook
          appId={"524305576404113"}
          fieldsProfile={
            'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
          }
          onLoginStart={onLoginStart}
          
          redirect_uri={REDIRECT_URI}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={err => {
            console.log(err);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
    </div>
  );
};

export default Button;
