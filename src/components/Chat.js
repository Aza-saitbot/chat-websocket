import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import socket from '../socket'
import { Button, Form } from "react-bootstrap"


const Chat = ({users,messages,userName,roomId,onAddMessage}) => {
    const [messageValue, setMessageValue] = useState('')
    const messageRef=useRef(null)

    const onSubmit = () => {
        socket.emit('ROOM:NEW_MESSAGE',{
            userName,
            roomId,
            text:messageValue
        })
        onAddMessage({userName,text:messageValue})
        setMessageValue('')
    }

    useEffect(()=>{
        messageRef.current.scrollTo(0,99999)
    },[messages])
    console.log('users CHAT',users)

    return (
        <div className="chat">
            <div className="chat-users">
                Комната: <b>{roomId}</b>
                <hr/>
                <b>Онлайн ({users?.length}):</b>
                <ul>
                    {users.map((name,index)=>
                        <li key={name+index}>{name}</li>
                    )}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messageRef} className="messages">

                    {messages.map((message,index)=>
                        <div  key={message.userName+index} className="message">
                            <div className="message-text">{message.text}</div>
                            <div>
                                <span>{message.userName}</span>
                            </div>
                        </div>
                    )}                </div>
                <form className="chat-footer">
                    <Form.Control
                        value={messageValue}
                        onChange={event => setMessageValue(event.target.value)}
                        as="textarea" rows={3}/>
                    <Button
                        style={{marginTop: 10}}
                        onClick={onSubmit}
                        variant="outline-primary">
                        Отправить
                    </Button>
                </form>
            </div>

        </div>
    )
}

export default Chat