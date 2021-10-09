import React, { useEffect, useState } from 'react';
import { API } from '../utils/APICalls';


const Messages = (props) => {

  const [messages, setMessages] = useState([
    { id: 1, text: 'ssn1' },
    { id: 2, text: 'ssn2' },
    { id: 3, text: 'ssn3' },
    { id: 4, text: 'ssn4' },
    { id: 5, text: 'ssn5' },
    { id: 6, text: 'ssn6' },
    { id: 7, text: 'ssn7' },
    { id: 8, text: 'ssn8' },
    { id: 9, text: 'ssn9' },
    { id: 10, text: 'ssn10' },
    { id: 11, text: 'ssn11' },
    { id: 12, text: 'ssn12' },
    { id: 13, text: 'ssn13' },
    { id: 14, text: 'ssn14' },
    { id: 15, text: 'ssn15' },
    { id: 16, text: 'ssn16' },
    { id: 17, text: 'ssn17' },
    { id: 18, text: 'ssn18' },
    { id: 19, text: 'ssn19' },
    { id: 20, text: 'ssn20' },
    { id: 21, text: 'ssn21' },
    { id: 22, text: 'ssn22' },
    { id: 23, text: 'ssn23' },
    { id: 24, text: 'ssn24' },
    { id: 25, text: 'ssn25' },
    { id: 26, text: 'ssn26' },
    { id: 27, text: 'ssn27' },
    { id: 28, text: 'ssn28' },
    { id: 29, text: 'ssn29' },
    { id: 30, text: 'ssn30' },
    { id: 31, text: 'ssn31' },
    { id: 32, text: 'ssn32' },
    { id: 33, text: 'ssn33' },
  ])
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
      <div style={{ width: '100%', overflow: 'auto', marginBottom: '20px' }}>
        {
          messages.map(message => (
            // TODO test the condition
            <div key={message.id} className={(props.user && message.userId === props.user.id) ? 'messages-item' : 'messages-item sender'}>{message.text}</div>
          ))
        }
      </div>
      <span className="new-msg-wrapper">
        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
        <button onClick={() => sendNewMessage(props.user, props.conversation, newMessage)}>send</button>
      </span>
    </div>
  );
}

export default Messages;
