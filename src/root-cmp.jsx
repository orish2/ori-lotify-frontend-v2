import React from 'react'
import { Switch, Route } from 'react-router'
import { MainNav } from './cmps/main-nav.jsx'
import routes from './routes.js'
import { AppFooter } from './cmps/app-footer.jsx'
import { CreateStation } from './cmps/create-playlist.jsx'
// import { UserProfile } from './cmps/profile'
import { UserMsg } from './cmps/user-msg.jsx'
// import { Signin } from './pages/signin.jsx'
// import { Signup } from './pages/signup.jsx'

export class RootCmp extends React.Component {

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


