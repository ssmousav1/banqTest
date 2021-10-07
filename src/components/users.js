import React, { useEffect, useState } from 'react';
import { API } from '../utils/APICalls';
import { fakeUsers } from '../utils/mockData';

const Users = (props) => {

  const [users, setUsers] = useState([
    { id: 1, name: 'ssn' },
    { id: 2, name: 'ssn' },
    { id: 3, name: 'ssn' },
    { id: 4, name: 'ssn' },
    { id: 5, name: 'ssn' },
  ])

  const getUsers = async () => {
    const res = await API('/user', 'get')
    if (res.data) {
      console.log(res.data.data);
      setUsers(res.data.data)
    }

    // const res = await API('/users', 'get')
    // console.log(res.data);
    // setUsers(res.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const selectUser = (userID) => {
    // props.setUser(userID)
  }

  return (
    <div className="users-container">
      <h2>
        users
      </h2>
      {
        users && users.map(user => (
          <div className='user-item' onClick={() => selectUser(user.id)}>{user.name}</div>
        ))
      }
    </div>
  );
}

export default Users;
