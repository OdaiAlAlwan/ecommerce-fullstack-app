import {  Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./components/home/Cart";
import ProductId from "./components/home/products/ProductId";
import NotFindPage from "./utils/NotFindPage";




function App() {



  return (
    <>
    <Routes>
      <Route index element={<Home/>} />
      <Route path="SignIn" element={<Login/>}/>
      <Route path="SignUp" element={<Register/>}/>
      <Route path="Cart" element={<Cart/>}/>
      <Route path="/:id" element={<ProductId/>}/>
      <Route path="/*" element={<NotFindPage/>}/>

      {/* User Dashboard */}

        {/* <Route element={<RequireAuth allowedRoles={['admin','user']}/>}> 
          <Route path="Dashbord" element={<Dashbord/>} >
              <Route element={<RequireAuth allowedRoles={['user']}/>}>          
                  <Route path="user/Profile" element ={<Profile/>}/>
             </Route>  
          </Route>
        </Route>  */}
        
    </Routes>
    </>

  );
}

export default App;
