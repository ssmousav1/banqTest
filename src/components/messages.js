import React, { useEffect, useState } from 'react';
import { API } from '../utils/APICalls';


const Messages = (props) => {

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState()

  const getMessages = async (user, conversation) => {
    const res = await API(`/user/${user}/conversation/${conversation}/message`, 'get')
    console.log(res.data.data);
    setMessages(res.data.data)


    // const res = await API(`/message`, 'get')
    // console.log(res.data);
    // setMessages(res.data)
  }

  const sendNewMessage = async (user = null, conversation = null, newMessage = null) => {
    const res = await API(`/user/${user}/conversation/${conversation}/message`, 'post', { text: newMessage })

    getMessages(props.user, props.conversation)
  }

  useEffect(() => {
    if (props.user && props.conversation) {
      getMessages(props.user, props.conversation)
    }
  }, [props.user, props.conversation])

  // const setNewMe

  return (
    <div className="messages-container">
      <h2>
        Messages
      </h2>
      {
        messages.map(message => (
          <div className='messages-item'>{message.text}</div>
        ))
      }
      <span className="new-msg-wrapper">
        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
        <button onClick={() => sendNewMessage(props.user, props.conversation, newMessage)}>send</button>
      </span>
    </div>
  );
}

export default Messages;
