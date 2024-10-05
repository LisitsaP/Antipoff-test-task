import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/storeHook";
import { logout } from "../../features/authSlice.ts";
import { useLocation } from "react-router-dom";


interface HeaderProps {
    children:  { content: React.ReactNode }; 
  }
  
  const Header: React.FC<HeaderProps> = ({ children}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
  
    return (
      <header className="bg-violet min-h-[265px] relative">
        <div className="grid grid-rows-2 grid-cols-12 mx-12">
          {location.pathname !== "/" ? (
            <button
              className="col-span-1 border border-white max-h-[38px] max-w-[82px] mt-12 rounded-lg font-roboto text-base text-white"
              type="button"
              aria-label={'Вернуться на главную страницу'}
              onClick={() => navigate('/team')}
            >
               Назад
            </button>
          ): <div className="col-span-1"></div>}
  
          <div className="col-span-10 row-span-2">{children.content}</div> 
  
          <button
            className="col-span-1 border border-white max-h-[38px] max-w-[82px] mt-12 rounded-lg font-roboto text-base text-white"
            type="button"
            aria-label={'Выход из личного кабинета'}
            onClick={() => dispatch(logout())}
          >
         Выход
          </button>
        </div>
      </header>
    );
  };

export default Header;