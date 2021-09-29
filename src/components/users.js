import React, { useEffect, useState } from 'react';
import { API } from '../utils/APICalls';
import { fakeUsers } from '../utils/mockData';

const Users = (props) => {

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const res = await API('/user', 'get')
    console.log(res.data.data);
    setUsers(res.data.data)

    // const res = await API('/users', 'get')
    // console.log(res.data);
    // setUsers(res.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const selectUser = (userID) => {
    props.setUser(userID)
  }

  return (
    <div className="users-container">
      <h2>
        users
      </h2>
      {
        users.map(user => (
          <div className='user-item' onClick={() => selectUser(user.id)}>{user.name}</div>
        ))
      }
    </div>
  );
}

export default Users;
