import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import Header from '../../components/Header/Header';
import { loadUsers } from '../../features/usersSlice';
import { Loader } from '../../components/Loader';

const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  const userId = users.find((user) => user.id === id);

  useEffect(() => {
    console.log("User ID from URL:", id);
  }, [id]);

  useEffect(() => {
    if (!users.length) {
      dispatch(loadUsers());
    }
  }, [dispatch, users.length]);

  if (loading) {
    return <Loader/>;
  }

  if (!userId) {
    return <p>User not found</p>;
  }

  return (
    <>
      <Header>
        {{
          content: (
            <div className="max-w-[1200px] flex w-full flex-col-reverse md:flex-row items-center justify-center gap-y-4 md:gap-0 md:justify-start min-h-[265px] container flex-wrap-reverse z-0">
              <img className="" src={userId.imageUrl} alt={userId.name} />
              <div className="md:ml-10 flex flex-col items-center md:items-start">
                <h1 className="text-xl md:text-xxl text-white text-roboto">{userId.name}</h1>
                <h2 className="text-white text-roboto text-lg md:text-xl">{userId.role}</h2>
              </div>
            </div>
          ),
        }}
      </Header>
      <div className="max-w-[1200px] px-5 md:px-20 md:gap-x-16 w-full m-auto flex relative md:justify-center mx-auto flex-wrap-reverse md:flex-nowrap">
        <div className="user-details md:mt-7">
          {userId.content.split('\n').map((line, index) => (
            <div key={index} className="text-black text-roboto text-base my-7">
              {line}
              <br />
            </div>
          ))}
        </div>
        <div className="mt-14 justify-start">
          <div className="flex min-w-[160px] min-h-8">
            <svg
              className="mr-2"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.55399 5.24003L6.17099 1.33503C5.78099 0.88503 5.06599 0.88703 4.61299 1.34103L1.83099 4.12803C1.00299 4.95703 0.765988 6.18803 1.24499 7.17503C4.10661 13.1 8.88503 17.8851 14.806 20.755C15.792 21.234 17.022 20.997 17.85 20.168L20.658 17.355C21.113 16.9 21.114 16.181 20.66 15.791L16.74 12.426C16.33 12.074 15.693 12.12 15.282 12.532L13.918 13.898C13.8482 13.9712 13.7562 14.0195 13.6563 14.0354C13.5564 14.0513 13.4541 14.0339 13.365 13.986C11.1354 12.7021 9.28598 10.8503 8.00499 8.61903C7.95702 8.52978 7.93964 8.42726 7.95554 8.32719C7.97144 8.22711 8.01972 8.13502 8.09299 8.06503L9.45299 6.70403C9.86499 6.29003 9.90999 5.65003 9.55399 5.23903V5.24003Z"
                stroke="#512689"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-black text-roboto text-base">{userId.telNumber}</p>
          </div>
          <div className="flex min-w-[160px] min-h-8 mt-3">
            <svg
              className="mt-1 mr-2"
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V14C0.5 14.3978 0.658035 14.7794 0.93934 15.0607C1.22064 15.342 1.60218 15.5 2 15.5H20C20.3978 15.5 20.7794 15.342 21.0607 15.0607C21.342 14.7794 21.5 14.3978 21.5 14V2C21.5 1.60218 21.342 1.22064 21.0607 0.93934C20.7794 0.658035 20.3978 0.5 20 0.5ZM18.35 2L11 7.085L3.65 2H18.35ZM2 14V2.6825L10.5725 8.615C10.698 8.7021 10.8472 8.74877 11 8.74877C11.1528 8.74877 11.302 8.7021 11.4275 8.615L20 2.6825V14H2Z"
                fill="#512689"
              />
            </svg>
            <a href={`mailto:${userId.email}`} className="text-violet dec text-roboto text-base no-underline">
              {userId.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
