import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { loadUsers } from '../../features/usersSlice';
import UserCard from '../UserCard/UserCard';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Loader } from '../Loader';

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const windowWidth = useWindowDimensions();

  const isDesktopScreenDevice = windowWidth >= 850;
  const usersPerPage = isDesktopScreenDevice ? 8 : 4;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-12 px-20 max-w-[1440px] mx-auto flex flex-col gap-14">
      <div className="flex justify-center flex-wrap gap-5">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <UserCard key={user.id} id={user.id} imageUrl={user.imageUrl} name={user.name} />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 text-sm md:text-base bg-grayLight text-roboto mx-1 bg-gray-200 rounded-lg disabled:opacity-50 duration-300 cursor-pointer active:scale-[0.98] ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-violet hover:text-white'}`}
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Предыдущая
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-4 py-2 mx-1 rounded-lg duration-300 cursor-pointer active:scale-[0.98] ${pageNumber === currentPage ? 'bg-violet text-white' : 'bg-grayLight hover:bg-violet  hover:text-white '}`}
            type="button"
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className={`px-4 py-2 mx-1 text-sm md:text-base text-roboto text-black transition-all duration-300 cursor-pointer active:scale-[0.98] bg-grayLight rounded-lg disabled:opacity-50 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-violet hover:text-white'}`}
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Следующая
        </button>
      </div>

      <div className="text-center mt-4 text-sm md:text-base text-roboto text-roboto">
        <p className="text-gray">
          {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, users.length)} из {users.length}
        </p>
      </div>
    </section>
  );
};

export default UserList;