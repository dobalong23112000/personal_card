import Register from "pages/Auth/Register/Register.js"
import Login from "pages/Auth/Login/Login.js"
import Home from "pages/Home/Home"
import Display from "pages/Display/Display"
// import Profile from "pages/Profile/Profile"
// import About from "pages/About/About"
import NewBio from "pages/Bio/NewBio"
import Error404 from "pages/errors/Error404"

const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/:uuid', component: Home, layout: null },
    { path: `/profile/:nickName`, component: NewBio, layout: null },
    { path: `/error`, component: Error404, layout: null },
    { path: `/*`, component: Error404, layout: null },
]
const privateRoutes = [

    { path: '/', component: Display },
    { path: '/newbio', component: NewBio, layout: null },

]

export { privateRoutes,publicRoutes }