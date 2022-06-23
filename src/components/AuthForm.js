import React,{ useState } from 'react'
import axios from 'axios'
import {Button, Form} from "react-bootstrap";

const AuthForm = ({onLogin}) => {
    const [roomId,setRoomId]=useState('')
    const [userName,setUserName]=useState('')
    const [isLoading,setIsLoading]=useState(false)

    const onSubmit=async ()=>{
        if (!roomId || !userName){
            return alert('Неверные данные')
        }
        setIsLoading(true)
        const obj={
            roomId,userName
        }
        await axios.post('/rooms',obj)
        onLogin(obj)
    }

    return (
        <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Room ID</Form.Label>
                <Form.Control
                    onChange={e=>setRoomId(e.target.value)}
                    type="text" placeholder="Room ID" value={roomId} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control
                    onChange={e=>setUserName(e.target.value)}
                    type="text" placeholder="Ваше имя" value={userName} />
            </Form.Group>
            <Button
                onClick={onSubmit}
                variant="success" >
                {isLoading ? "Вход":"Войти"}
            </Button>
        </Form>
    );
};

export default AuthForm;