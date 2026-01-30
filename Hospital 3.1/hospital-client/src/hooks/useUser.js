import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';


const useUser = () => {
  const [users] = useAuthState(auth);
  const [myUser, setUser] = useState([]);
  const user = myUser[0];

  // console.log(users);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${users?.email}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [myUser, users?.email,users]);
  return { user };
};

export default useUser;
