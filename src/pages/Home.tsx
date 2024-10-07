import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useAppSelector } from "../hooks/storeHook";
import { useEffect } from "react";
import UserList from "../components/Users/UserList";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return (
    <div>
      <Header>
        {{
          content: (
            <div className="w-full flex relative flex justify-center items-center m-auto min-h-[265px]">
              <div className="">
                <div className="max-w-[846px] flex-col gap-[16px] text-center">
                  <h1 className="text-xl md:text-xxl text-white font-roboto mb-4">Наша команда</h1>
                  <p className="text-base md:text-lg text-white font-roboto">
                    Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
                  </p>
                </div>
              </div>
            </div>
          ),
        }}
      </Header>
      <div className="container mx-auto">
        <UserList />
      </div>
    </div>
  );
};

export default Home;
