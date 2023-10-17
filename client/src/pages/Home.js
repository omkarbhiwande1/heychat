import React, {useEffect} from 'react'
// import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {getConversations} from '../actions/chatActions';
import {useSelector, useDispatch} from 'react-redux';
import { Spinner, ListGroup, Button } from 'react-bootstrap';
export default function Home() {
    const conversations = useSelector(state=>state.chat.conversations);
    // console.log(conversations);
    const isLoading = useSelector(state=>state.ui.isLoading);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getConversations());
    },[])




    return (
        <div style={{height: '85vh'}} className="d-flex flex-column">
            <div className="d-flex flex-cloumn flex-grow-1 overflow-auto row col-md-4 mr-auto ml-auto mt-3">
                {
                    isLoading?(
                        <div  className=" mt-4  ml-auto mr-auto">
                            <Spinner animation="border" className="d-block"/>
                        </div>
                    ):(
                        conversations.length === 0 ?(
                            <div  className=" m-auto">
                                <p className="text-primary">You have no Conversations</p>
                            </div>
                        ):(
                            <ListGroup variant="flush" className="d-flex flex-column flex-grow-1">
                            
                           
                                {   
                                    conversations.map((conversation, index)=>{
                                        return(
                                            <ListGroup.Item 
                                                key={index}
                                                className="d-flex pl-3 border-bottom"
                                            >   
                                                <div className="align-self-center">
                                                    {conversation.rusername}
                                                </div>
                                                <Link className="ml-auto btn btn-sm btn-primary" to={`/chat/${conversation.rid}/0`}>Message</Link>
                                            </ListGroup.Item>

                                        )
                                    })
                                }
                            
                            </ListGroup>
                        )   

                        

                        
                    )
                }   

            </div>

            
        </div>
    )
}
