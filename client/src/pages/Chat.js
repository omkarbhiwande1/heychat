import React, {useEffect, useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentConversation, sendChat, sendSocketChat} from '../actions/chatActions';
import io from 'socket.io-client'
import { Form, Button, Spinner } from 'react-bootstrap'

export default function Chat(props) {
	const username = useSelector(state => state.user.username);
	// const rusername = props.match.params.rusername;
	const isLoading = useSelector(state => state.ui.isLoading);
	const userid = useSelector(state => state.user.userid);
	const [socket, setSocket] = useState();
	const [messageText, setMessageText] = useState('');
	const currentConversation = useSelector(state=>state.chat.currentConversation);
	const currentChatIdentity = useSelector(state=>state.chat.currentChatIdentity);

	const dispatch = useDispatch();
	
	const lastRef = useCallback(node=>{
        if(node){
            node.scrollIntoView({smooth: true});
        }
	},[]);
	
	useEffect(()=>{
		dispatch(getCurrentConversation(props.match.params.rid, props.match.params.tchat));
	},[])

	useEffect(()=>{
		let newSocket = null;
		// console.log(currentChatIdentity);
		if(currentChatIdentity){
			console.log(currentChatIdentity);
			newSocket = io({query: {currentChatIdentity}})
			// newsocket = io();
			setSocket(newSocket);
			newSocket.on('recieve-message', (data)=>{
				dispatch(sendSocketChat(data));
			})

			// console.log("Socket is set");
		}
		return () => {
			if(newSocket){
				newSocket.off('recieve-message');
				newSocket.close();
				setSocket(null);
			}
		}
	},[currentChatIdentity])

	function handleSubmit(e){
		e.preventDefault();
		if(messageText!==''){

			dispatch(sendChat(socket,{rid: props.match.params.rid, messageText, currentChatIdentity}));
			setMessageText('');
		}
	}
	return (
		<div style={{height: '85vh'}} className='d-flex flex-column border border-primary rounded col-md-4 mr-auto ml-auto mt-3'>
            {isLoading?(
				<div  className=" mt-4  ml-auto mr-auto">
					<Spinner animation="border" className="d-block"/>
				</div>
			):(

				<>
				<div className='d-flex flex-column flex-grow-1 overflow-auto'>

					<div className='d-flex flex-column justify-content-end flex-grow-1 '>
						{
							currentConversation && currentConversation.messages.map((message, index)=>{
								const lastMessage = currentConversation.messages.length-1 === index;
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
