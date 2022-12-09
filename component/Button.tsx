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

import * as queryString from "query-string";

const urlParams = queryString.parse(window.location.search);

const REDIRECT_URI = "http://localhost:3000/account/login";

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

  // const stringifiedParams = queryString.stringify({
  //   client_id: "524305576404113",
  //   redirect_uri: 'https://cheerful-dodol-9da0e8.netlify.app/fb',
  //   scope: ['email', 'public_profile'].join(','), // comma seperated string
  //   response_type: 'code',
  //   auth_type: 'rerequest',
  //   display: 'popup',
  // });

  const LinkendinParams = queryString.stringify({
    client_id: "78uizzc35dmas4",
    redirect_uri: "http://localhost:3000/loginn2",
    scope: ["r_emailaddress", "r_liteprofile", "w_member_social"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  const FacebookParams = queryString.stringify({
    client_id: "524305576404113",
    redirect_uri: "http://localhost:3000/loginn2",
  });
  
  const FacebookUri = `https://www.facebook.com/v15.0/dialog/oauth?${FacebookParams}`;
  const LinkendinUri = `https://www.linkedin.com/oauth/v2/authorization?${LinkendinParams}`;

  console.log(`The code is: ${urlParams.code}`);

  let codes = urlParams.code;

  // async function getAccessTokenFromCode() {
  //   const { data } = await axios({
  //     url: `https://www.linkedin.com/oauth/v2/accessToken`,
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     data: {
  //       grant_type: "authorization_code",
  //       client_id: "78uizzc35dmas4",
  //       client_secret: "95j2Ok6MQD1HQEFL",
  //       redirect_uri: "http://localhost:3000/loginn2",
  //       code: urlParams.code,
  //     },
  //   });
  //   console.log(data); // { access_token, token_type, expires_in }
  //   return data.access_token;
  // }

  // const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

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
        client_id={"78uizzc35dmas4"}
        client_secret={"95j2Ok6MQD1HQEFL"}
        redirect_uri="http://localhost:3000/loginn2"
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
          console.log(data, provider);
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
          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        }
        onLoginStart={onLoginStart}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>

      <a href={LinkendinUri}>Login with Linkendin</a>
      <br></br>
      <a href={FacebookUri}>Login with Facebook</a>
    </div>
  );
};

export default Button;
