import React, {useState, useEffect} from 'react'
import {findUsers} from '../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { Form, Button, ListGroup, Spinner } from 'react-bootstrap'

export default function Find() {
    const [searchText, setSearchText] = useState('');
    const searchResults = useSelector(state=>state.user.searchResults);
    const isLoading = useSelector(state=>state.ui.isLoading);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=> dispatch({type: 'CLEAR_SEARCH_RESULTS', payload: []});
    },[])
    function handleSubmit(e){
        e.preventDefault();
        dispatch(findUsers(searchText));

    }
    return (
        <div style={{height: '85vh'}} className="row">
            <div className="col-md-4 mr-auto ml-auto mt-3">
                <Form onSubmit={handleSubmit} className="d-flex ">
					<Form.Group style={{height: '38px', width: '80%'}} className="w-80 mb-0">
						<Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)} value={searchText} required/>
					</Form.Group>
				

					<Button style={{height: '38px'}} variant="success" type="submit" className="ml-2 mb-0">
						Submit
					</Button>
				</Form>
                {
                    isLoading?(
                        <div  className=" mt-4">
                            <Spinner animation="border" className="d-block m-auto"/>
                        </div>
                    ):(<ListGroup variant="flush">
                        {searchResults.map((result, index)=>{
                                // console.log(index);
                                return (
                                    <ListGroup.Item 
                                        key={index}
                                        className="d-flex pl-3 border-bottom"
                                    >   
                                        <div className="align-self-center">
                                            {result.username}
                                        </div>
                                        <Link className="ml-auto btn btn-sm btn-primary" to={`chat/${result.userid}/1`}>Send messsage</Link>
                                    </ListGroup.Item>
                                )
                            })}
                        
            
                    </ListGroup>)
                }   

            </div>

            
        </div>
    )
}
