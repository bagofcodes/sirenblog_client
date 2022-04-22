import TopBar from "./components/Topbar/TopBar";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage"
import WritePage from "./pages/writepage/WritePage";
import SinglePostPage from "./pages/SinglePostPage/SinglePostPage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import {AuthContext} from "./helpers/AuthContext";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
  const token = localStorage.getItem("accessToken");
  const [authstate, setAuthState] = useState({
    username: "" ,
    userid: 0,
    isLoggedIn: token? true :false
  });

  useEffect(()=>{
    const setstate = () =>{
      try{
        const res =async ()=> await axios.get("/api/auth/verify", {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        });
  
        setAuthState({
          username: res.data.username,
          userid: res.data.userid,
          isLoggedIn: true,
        });
      }catch(err){
        setAuthState({
          username:"",
          userid: 0,
          isLoggedIn:false
        });
      }
    }
    setstate();
  }, [])



  return (
    <AuthContext.Provider value={{authstate,setAuthState}}>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/singlePost/:postId" element={authstate.isLoggedIn?<SinglePostPage />: <Login />} />
          <Route path="/categoryPost/:catName" element={authstate.isLoggedIn?<CategoryPage />: <Login/>} />
          <Route path="/writePost" element={authstate.isLoggedIn?<WritePage />: <Login/>} />
          <Route path="/" element={authstate.isLoggedIn?<HomePage />: <Login />} />
        </Routes>
      </BrowserRouter>

    </AuthContext.Provider>
  );
}

export default App;
