import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/storeHook";
import { logout } from "../../features/authSlice.ts";
import { useLocation } from "react-router-dom";
import Button from "../Buttons/Button.tsx";
import { useEffect, useState } from "react";


interface HeaderProps {
    children:  { content: React.ReactNode }; 
  }
  
  const Header: React.FC<HeaderProps> = ({ children}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 850);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 850);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <header className="bg-violet min-h-[265px] flex ">
        <div className="w-full flex relative justify-center sm:px-[16px] px-20 max-w-[1400px] m-auto">
          {location.pathname !== "/" ? (
            <Button
            aria-label={'Вернуться на главную страницу'}
            onClick={() => navigate('/')}
            className="order-1 md:left-[80px] left-8 mt-8 absolute z-4 "
            >
                 {isMobile ? (<svg className="absolute bg-no-repeat transition-transform duration-300 hover:scale-105" width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.83749 14.0013C5.68809 14.0018 5.54048 13.9688 5.4055 13.9048C5.27052 13.8407 5.15161 13.7473 5.05749 13.6313L0.227488 7.63125C0.0804062 7.45232 0 7.22788 0 6.99625C0 6.76463 0.0804062 6.54018 0.227488 6.36125L5.22749 0.361252C5.39723 0.157036 5.64114 0.0286112 5.90556 0.0042315C6.16999 -0.0201482 6.43327 0.0615137 6.63749 0.231252C6.8417 0.400991 6.97013 0.644902 6.99451 0.909329C7.01889 1.17375 6.93723 1.43704 6.76749 1.64125L2.29749 7.00125L6.61749 12.3613C6.73977 12.508 6.81745 12.6868 6.84133 12.8763C6.86521 13.0659 6.83429 13.2583 6.75223 13.4308C6.67018 13.6034 6.54042 13.7488 6.37831 13.8499C6.2162 13.9509 6.02852 14.0035 5.83749 14.0013Z" fill="#F8F8F8"/>
</svg>): "Назад"}
            </Button>
          ): <div className=""></div>}
  
          <div className=" order-2 max-w-[1200px] px-5 md:px-20 md:gap-x-16 w-full m-auto flex relative md:justify-center">{children.content}</div> 
  
          <Button
            aria-label={'Выход из личного кабинета'}
            onClick={() => dispatch(logout())}
            className="order-3 md:right-[80px] mt-8 right-8 absolute z-4"
          >
         {isMobile ? (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.79 13.29C8.18 13.68 8.81 13.68 9.2 13.29L12.79 9.7C12.8827 9.60749 12.9563 9.4976 13.0064 9.37662C13.0566 9.25565 13.0824 9.12597 13.0824 8.995C13.0824 8.86403 13.0566 8.73435 13.0064 8.61338C12.9563 8.4924 12.8827 8.38251 12.79 8.29L9.2 4.7C9.01302 4.51302 8.75943 4.40798 8.495 4.40798C8.23057 4.40798 7.97698 4.51302 7.79 4.7C7.60302 4.88698 7.49798 5.14057 7.49798 5.405C7.49798 5.66943 7.60302 5.92302 7.79 6.11L9.67 8H1C0.45 8 0 8.45 0 9C0 9.55 0.45 10 1 10H9.67L7.79 11.88C7.4 12.27 7.41 12.91 7.79 13.29ZM16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V5C0 5.55 0.45 6 1 6C1.55 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2H15C15.55 2 16 2.45 16 3V15C16 15.55 15.55 16 15 16H3C2.45 16 2 15.55 2 15V13C2 12.45 1.55 12 1 12C0.45 12 0 12.45 0 13V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z" fill="#F8F8F8"/>
</svg>): "Выход"}
          </Button>
        </div>
      </header>
    );
  };

export default Header;


