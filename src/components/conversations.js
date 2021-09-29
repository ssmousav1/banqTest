import React, { useEffect, useState } from 'react';
import { API } from '../utils/APICalls';


const Conversations = (props) => {

  const [conversations, setConversations] = useState([])

  const getUsers = async (user) => {
    const res = await API(`/user/${user}/conversation`, 'get')
    console.log(res.data.data);
    setConversations(res.data.data)

    // const res = await API(`/conversation`, 'get')
    // console.log(res.data);
    // setConversations(res.data)
  }

  useEffect(() => {
    if (props.user) {
      getUsers(props.user)
    }
  }, [props.user])

  const selectConversation = (id) => {
    props.setConversation(id)
  }

  const openNewConversationModal = (type) => {
    props.setNewConversationType(type)
    props.setModal(true)
  }


  return (
    <div className="conversations-container">
      <h2>
        conversations
      </h2>
      {
        props.user &&
        <>
          <button onClick={() => openNewConversationModal('single')}>
            <h3>new conversation</h3>
          </button>

          <button onClick={() => openNewConversationModal('group')}>
            <h3>new group chat</h3>
          </button>
        </>
      }

      {
        conversations.map(conversation => (
          <div className='conversation-item' onClick={() => selectConversation(conversation.id)}>{conversation.name}</div>
        ))
      }
    </div >
  );
}

export default Conversations;
