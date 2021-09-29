import React, { useEffect, useState } from 'react';
import { API } from '../utils/APICalls';


const NewConversation = (props) => {

  const [user, setUser] = useState(null)
  const [conversation, setConversation] = useState(null)

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const res = await API('/user', 'get')
    setUsers(res.data.data)
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className="modal-container">
      <div className="modal-wrapper" onClick={() => props.setModal(false)}></div>
      <span >
        <h5>{props.newConversationType}</h5>
        {
          props.newConversationType === 'single' ?
            <div>
              <select>
                {
                  users.map(user => (
                    <option>{user.name}</option>
                  ))
                }
              </select>
            </div>
            :
            <div></div>
        }
        <button>
          submit
        </button>
      </span>
    </div>
  );
}

export default NewConversation;
