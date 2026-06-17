import {lazy , Suspense , StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux'
import { Toaster  } from 'react-hot-toast'
import store from './rtk/Store.js'

import './index.css'

import Header from './components/home/Header.jsx'
import Footer from './components/home/Footer.jsx'
import Lodaing from './ui/Lodaing.jsx'
import UserProvider from './components/auth/ContextUser.jsx'




// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import('./App.jsx'))

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(


      <StrictMode>

      <Provider store={store} >  
        <UserProvider>

        <BrowserRouter>
       
        <Header/>

        <Suspense fallback={<Lodaing/>} >
        <App />

        <Toaster position="top-right"
        reverseOrder={false}
        containerStyle={{ margin : '10px' }}
        toastOptions={{
          style: {
            fontSize : "16px",
            maxWidth : "500px",
            padding : "16px 24px",
            backgroundColor:"#020616dd",
            color : "white",
            
          },
          }}/>
        </Suspense>
       



        <Footer/>



        
        </BrowserRouter>

        </UserProvider>

      </Provider>
      </StrictMode>

)
