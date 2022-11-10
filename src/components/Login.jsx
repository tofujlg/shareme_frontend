import React from "react";
//import GoogleLogin from "react-google-login";
import jwt_Decode from "jwt-decode";
import {GoogleLogin} from '@react-oauth/google'
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from '../client'

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) =>{
    const decoded = jwt_Decode(response.credential);
    const {name,picture,sub}= decoded;

    //TODO:decodedの情報をそのままローカルストレージに上げないといけない
    //Original :localStorage.setItem('user',JSON.stringify(response))
    //const {credential, clientId,imageUrl} = response;
    localStorage.setItem('user',sub)

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture 
    }

    client.createIfNotExists(doc).then(()=>{
      navigate('/',{replace:true})
    })
 
  }
//  console.log(process.env.REACT_APP_GOOGLE_API_TOKEN);
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
        </div>
        <div className="shadow-2xl">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <button
                type="button"
                className=" bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" /> Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onError={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
      Login
    </div>
  );
};

export default Login;
