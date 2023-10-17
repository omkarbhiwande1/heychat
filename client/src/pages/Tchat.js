import React, {useEffect, useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {loadTempChat, sendTempChat} from '../actions/chatActions.js';
import { Form, Button, Spinner } from 'react-bootstrap'
export default function Tchat(props) {
    const [messageText,setMessageText] = useState('');
    const userid = useSelector(state => state.user.userid);
    const uid = props.match.params.id;
    const tempChat = useSelector(state=>state.chat.tempChat);
    // console.log(tempChat);
    const isLoading = useSelector(state=>state.ui.isLoading);
    const lastRef = useCallback(node=>{
        if(node){
            node.scrollIntoView({smooth: true});
        }
    },[]);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadTempChat(uid));
    },[])
    function handleSubmit(e){
        e.preventDefault();
        if(messageText !== ''){

            dispatch(sendTempChat({reciever: uid, messageText}));
        }
    }
    return (
        <div style={{height: '88vh'}} className='d-flex flex-column border border-primary rounded mt-1 w-50 ml-auto mr-auto'>
            {
                isLoading?(
                    <div  className=" m-auto">
                        <Spinner animation="border" className=""/>
                    </div>
                ):(
                    <>
                        
                        
                        <div className='d-flex flex-column flex-grow-1 overflow-auto'>

                            <div className='d-flex flex-column justify-content-end flex-grow-1 '>
                                {
                                    tempChat && tempChat.messages.map((message, index)=>{
                                        const lastMessage = tempChat.messages.length-1 === index;
                                        return (
                                            <p 
                                                style={{'width': 'fit-content'}} 
                                                ref={lastMessage ? lastRef : null}
                                                key={index} 
                                                className={message.sender === userid ? "bg-primary text-white align-self-end rounded p-2 ml-2 mr-2" : "bg-dark text-white rounded p-2 ml-2 mr-2"}
                                            >{message.messagetext}</p>

                                        )
                                    })
                                }

                            </div>
                        </div>
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="d-flex mb-0">
                                <Form.Control type="text" placeholder="Enter message" value={messageText} onChange={(e)=>setMessageText(e.target.value)}/>
                                <Button variant="primary" type="submit" className="ml-2">
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                    </>
                )
            }
			
				
		</div>
    )
}
