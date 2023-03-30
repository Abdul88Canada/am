import { useState } from "react"
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../layouts/Layout';


const LandingPage =  ({ currentUser }) => {   
    return (
        currentUser ? (
            <div>
              <Layout />  
            </div>
        ) 
            : <h1>You are signed out</h1>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
   if(!currentUser) {
    return {}
   } 
   else {
    return {};
   }
}

export default LandingPage;