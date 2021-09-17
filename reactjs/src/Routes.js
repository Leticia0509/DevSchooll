import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from  './pages/home/index.js'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true} component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}