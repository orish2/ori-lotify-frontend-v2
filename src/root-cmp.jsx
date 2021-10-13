import React from 'react'
import { Switch, Route } from 'react-router'
import { MainNav } from './cmps/main-nav.jsx'
import routes from './routes.js'
import { AppFooter } from './cmps/app-footer.jsx'
import { CreateStation } from './cmps/create-playlist.jsx'
import { UserProfile } from './cmps/profile'
import { UserMsg } from './cmps/user-msg.jsx'
import { Signin } from './pages/signin.jsx'
import { Signup } from './pages/signup.jsx'

export class RootCmp extends React.Component {
    // componentDidMount() {

    //     return new Promise(resolve => {

    //         window.fbAsyncInit = function () {
    //             window.FB.init({
    //                 appId: '992060094973798',
    //                 cookie: true,
    //                 xfbml: true,
    //                 version: 'v12.0'
    //             });

    //             window.FB.AppEvents.logPageView();

    //         };

    //         (function (d, s, id) {
    //             var js, fjs = d.getElementsByTagName(s)[0];
    //             if (d.getElementById(id)) { return; }
    //             js = d.createElement(s); js.id = id;
    //             js.src = "https://connect.facebook.net/en_US/sdk.js";
    //             fjs.parentNode.insertBefore(js, fjs);
    //         }(document, 'script', 'facebook-jssdk'));

    //     })
    // }


    render() {
        return (
            <>
                {/*<Route exact component={Signin} path="/" />
                <Route exact component={Signup} path='/signup' />*/}
                <main className="main-app">
                    <CreateStation />
                    <MainNav />
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                    <UserMsg />
                    <AppFooter />
                </main>
            </>
        )
    }
}


