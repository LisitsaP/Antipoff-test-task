import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header"
import { useAppSelector } from "../hooks/storeHook";
import { useEffect } from "react";
// import { headerClasses } from "../components/Header/headerClasses";
// const {
//     header,
//     // navContainer,
//     // navContent,
//     // linkHome,
//     // linkProfile,
//     // linkSignIn,
//   } = headerClasses;


const Home = () => {
const {user} =useAppSelector((state) => state.auth);
const navigate = useNavigate();

useEffect(() => {
    if (!user){
        navigate("/sign-in");
    }
}, [user, navigate])
  return (
    <>
     <Header>
      {{
        content: (
          <div className="w-full flex justify-center items-center relative m-auto">
            <div className="my-10">
              <div className="max-w-[846px] flex-col gap-[16px] items-center text-center mt-8 justify-center">
                <h1 className="text-xxl text-white font-roboto mb-4">Наша команда</h1>
                <p className="text-lg text-white font-roboto">
                  Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
                </p>
              </div>
            </div>
          </div>
        ),
      }}
    </Header>
    <div>Home</div>
    </>
  )
}

export default Home