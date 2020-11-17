import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import MainOLX from '../views/mainOlx/MainOLX'
import { Selling, SellingAdd } from '../views/sell/Sell'
import DetailPage from '../views/detailPage/DetailedPage'
import Email from '../views/login/EmailLogin'
import { EmailSignUp } from '../views/signup/EmailSignUp'
import Chat from '../views/chat/Chat'
import Chatroom from '../views/chat/Chatroom'

export default function MainRouter({ isLoggedIn, isLoading }) {
    if (isLoading) return <img width="150" style={{ marginLeft: '45%', marginTop: '15%' }} src='https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif' />
    console.log('window.location.pathname***', window.location.pathname)
    const currentPath = window.location.pathname.length === 1 ? '/' : window.location.pathname

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to={currentPath} /> <MainOLX />
                    </Route>

                    <Route path="/sell">
                        {isLoggedIn ? <Redirect to={currentPath} /> && <Selling /> : <MainOLX />}
                    </Route>
                    <Route path="/mainOLX">
                        <MainOLX />
                    </Route>

                    <Route path="/sellingadd">
                        {AuthChecker(isLoggedIn, <SellingAdd />)}
                    </Route>

                    <Route path="/detail/:adsID">
                        <DetailPage />
                    </Route>

                    <Route path="/emailLogin">
                        <Email />
                    </Route>

                    <Route path="/emailSignUp">
                        <EmailSignUp />
                    </Route>

                    <Route path="/chats" >
                        {/* {AuthChecker(isLoggedIn, <Chat />)} */}
                        <Chat />
                    </Route>

                    <Route path="/chatroom/:chatId">
                        <Chatroom />
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}
function AuthChecker(isLoggedIn, component) {
    return isLoggedIn ? component : <Redirect to='/' />
}