import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {signup} from '../actions/userActions'
import { Form, Button, Spinner } from 'react-bootstrap'

export default function Signup(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const isLoading = useSelector(state => state.ui.isLoading);
	const dispatch = useDispatch()

	function handleSubmit(e){
		e.preventDefault();
		// console.log({username, password},props.history))
		dispatch(signup({username, password},props.history));
		
	}
	return (
		<div style={{'height': '85vh'}} className="row">
			<div className="col-md-4 m-auto">
				{isLoading? <Spinner animation="border" className="d-block ml-auto mb-2"/>: null}
				<div style={{fontSize: '1.3em'}} className="mb-2 text-secondary">Signup Form</div>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="d-flex mb-2">
						<Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required/>
					</Form.Group>
					<Form.Group className="d-flex mb-2">
						<Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
					</Form.Group>

					<Button variant="primary" type="submit" className="ml-0">
						Submit
					</Button>
				</Form>
				
			</div>	
		</div>

	)
}
