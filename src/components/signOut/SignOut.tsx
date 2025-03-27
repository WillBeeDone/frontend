import { JSX } from 'react'
import MyButton from '../myButton/MyButton'
import { useDispatch } from 'react-redux';
import { signOut } from '../../features/auth/authSlice';

export default function SignOut(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <MyButton
      text="SignOut"
      variant="primary"
      func={() => {
        dispatch(signOut());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }}
    />
  );
}