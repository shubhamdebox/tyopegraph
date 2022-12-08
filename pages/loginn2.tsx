import React, { useEffect, useCallback, useState } from "react";
import dynamic from "next/dynamic";


const REDIRECT_URI = "http://localhost:3000/account/login";

const BgVid = dynamic(() => import("../component/Button"), {
  ssr: false,
});

const loginn2 = () => {
 


  return (
    <>
    <div className="">


       <BgVid />
    </div>
    </>
  );
};

export default loginn2;
