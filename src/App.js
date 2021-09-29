import React, { useState } from 'react';
import Conversations from './components/conversations';
import Messages from './components/messages';
import Users from './components/users';

import './App.css'
import NewConversation from './components/newConversationModal';


const App = () => {

  const [user, setUser] = useState(null)
  const [modal, setModal] = useState(false)
  const [newConversationType, setNewConversationType] = useState('single')
  const [conversation, setConversation] = useState(null)

  return (
    <div className="app">
      <Users setUser={setUser} />
      <Conversations
        user={user}
        setModal={setModal}
        setConversation={setConversation}
        setNewConversationType={setNewConversationType}
      />
      <Messages
        conversation={conversation}
        user={user}
      />
      {
        modal &&
        <NewConversation
          setModal={setModal}
          newConversationType={newConversationType}
        />
      }
    </div>
  );
}

export default App;
