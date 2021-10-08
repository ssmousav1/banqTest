import React, { useEffect, useState } from 'react';
import { API } from '../utils/APICalls';


const NewConversation = (props) => {

  const [singleUser, setSingleUser] = useState(null)
  const [groupUsers, setGroupUsers] = useState([])
  const [conversationName, setConversationName] = useState('')
  const [conversation, setConversation] = useState(null)

  const [users, setUsers] = useState([
    { id: 1, name: 'ssn1' },
    { id: 2, name: 'ssn2' },
    { id: 3, name: 'ssn3' },
    { id: 4, name: 'ssn4' },
    { id: 5, name: 'ssn5' },
  ])

  const getUsers = async () => {
    const res = await API('/user', 'get')
    if (res.data) {
      setUsers(res.data.data)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const postNewConversation = async () => {
    let data = { user_ids: [] }
    if (props.newConversationType === 'group') {
      data.name = conversationName
      data.user_ids = groupUsers
    } else {
      data.user_ids = singleUser
    }
    console.log(data);
    const res = await API(`/user/${props.user.id}/conversation`, 'post', data)
  }

  const selectSingleUser = e => {
    setSingleUser(e.target.value)
  }


  const selectGroupUser = e => {
    console.log(e.target.value);
    let value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    console.log(value);
    setGroupUsers(
      value,
    );
  }

  return (
    <div className="modal-container">
      <div className="modal-wrapper" onClick={() => props.setModal(false)}></div>
      <span className="model-content">
        <h5>{
          props.newConversationType === 'single' ? 'Start a new conversation' : 'Start a new group chat'
        }</h5>
        {
          props.newConversationType === 'single' ?
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <select onChange={selectSingleUser} value={singleUser}>
                {
                  users.map(user => (
                    <option value={user.id}>{user.name}</option>
                  ))
                }
              </select>
            </div>
            :
            <div>
              <input type='text' value={conversationName} onChange={e => setConversationName(e.target.value)} />
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <select
                  multiple={true}
                  onChange={selectGroupUser}
                  value={groupUsers}
                >
                  {
                    users.map(user => (
                      <option value={user.id}>{user.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
        }
        <button onClick={postNewConversation}>
          submit
        </button>
      </span>
    </div>
  );
}

export default NewConversation;
