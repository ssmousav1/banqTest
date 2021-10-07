import React, { useEffect, useState } from 'react';
import { API } from '../utils/APICalls';


const NewConversation = (props) => {

  const [user, setUser] = useState(null)
  const [conversationName, setConversationName] = useState('')
  const [conversation, setConversation] = useState(null)

  const [users, setUsers] = useState([])

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
    }
    const res = await API(`/user/${props.user.id}/conversation`, 'post', data)
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
            <div>
              <input type='text' value={conversationName} onChange={e => setConversationName(e.target.value)} />
              <div>
                <select multiple={true}>
                  {
                    users.map(user => (
                      <option>{user.name}</option>
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
