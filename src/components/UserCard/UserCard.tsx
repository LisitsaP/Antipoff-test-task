// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleLike } from '../../features/likeSlise';
// import { RootState } from '../../store';




// interface UserCardProps {
//   id: string;
//   imageUrl: string;
//   name: string;
// }


// const UserCard: React.FC<UserCardProps> = ({ id, imageUrl, name }) => {
//   const dispatch = useDispatch();
//   const likedItems = useSelector((state: RootState) => state.likes.likedItems); 
//   const isLiked = likedItems.includes(id); 

//   const handleLikeToggle = () => {
//     dispatch(toggleLike(id)); 
//   };

//   return (
//     <div className="user-card">
//       <img src={imageUrl} alt={name} width={150} height={150} />
//       <h3>{name}</h3>
//       <button onClick={handleLikeToggle}>
//         {isLiked ? <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M11.85 8C9.72375 8 8 9.72173 8 11.8455C8 15.691 12.55 19.1869 15 20C17.45 19.1869 22 15.691 22 11.8455C22 9.72173 20.2762 8 18.15 8C16.848 8 15.6965 8.64569 15 9.63398C14.645 9.1289 14.1734 8.71669 13.625 8.43226C13.0767 8.14784 12.4679 7.99956 11.85 8Z" stroke="#151317" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
//  : <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M11.85 8C9.72375 8 8 9.72173 8 11.8455C8 15.691 12.55 19.1869 15 20C17.45 19.1869 22 15.691 22 11.8455C22 9.72173 20.2762 8 18.15 8C16.848 8 15.6965 8.64569 15 9.63398C14.645 9.1289 14.1734 8.71669 13.625 8.43226C13.0767 8.14784 12.4679 7.99956 11.85 8Z" fill="#512689"/>
// </svg>
// }
//       </button>
//     </div>
//   );
// };

// export default UserCard;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLike } from '../../features/likeSlise';
import { RootState } from '../../store';

interface UserCardProps {
  id: string;
  imageUrl: string;
  name: string;
}

const UserCard: React.FC<UserCardProps> = ({ id, imageUrl, name }) => {
  const dispatch = useDispatch();
  const likedItems = useSelector((state: RootState) => state.likes.likedItems);
  const isLiked = likedItems.includes(id);
  const navigate = useNavigate(); 

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    dispatch(toggleLike(id));
  };

  const handleCardClick = () => {
    navigate(`/users/${id}`); 
  };

  return (
    <div className="max-w-[305px] w-full max-h-[263px] p-[36px_20px_20px] flex flex-col items-center justify-center gap-4 hover:gap-3.5 hover:border-black hover:border md:active:scale-[0.98] bg-white shadow-md rounded-lg z-0 transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img className="w-[124px] h-[124px] rounded-full object-cover" src={imageUrl} alt={name} width={150} height={150} />
      <h3 className="text-lg font-roboto">{name}</h3>
      <button className="w-[30px] h-[28px] bg-greyLight rounded-md bg-no-repeat bg-center self-end z-10 transition-all" onClick={handleLikeToggle}>
        {isLiked ? (
          <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.85 8C9.72375 8 8 9.72173 8 11.8455C8 15.691 12.55 19.1869 15 20C17.45 19.1869 22 15.691 22 11.8455C22 9.72173 20.2762 8 18.15 8C16.848 8 15.6965 8.64569 15 9.63398C14.645 9.1289 14.1734 8.71669 13.625 8.43226C13.0767 8.14784 12.4679 7.99956 11.85 8Z" stroke="#151317" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.85 8C9.72375 8 8 9.72173 8 11.8455C8 15.691 12.55 19.1869 15 20C17.45 19.1869 22 15.691 22 11.8455C22 9.72173 20.2762 8 18.15 8C16.848 8 15.6965 8.64569 15 9.63398C14.645 9.1289 14.1734 8.71669 13.625 8.43226C13.0767 8.14784 12.4679 7.99956 11.85 8Z" fill="#512689" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default UserCard;
