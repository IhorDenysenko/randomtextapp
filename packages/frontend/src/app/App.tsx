import React, {useState, useEffect} from 'react';
import SignIn from "../signin/SignIn";
import ChatContainer from "../chat/ChatContainer";
import ChatroomContainer from "../chat/ChatroomContainer";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';

const App: React.FC = () => {

	const [name, setName] = useState('');
	const [chatname, setChatname] = useState('');

	const handleChangeChatname = (data: string): void => setChatname(data);

	return (
		<>
			<CssBaseline />
			<Container maxWidth="md">
				{
					name !== '' ? (

						<Grid container alignItems="center">
							<ChatroomContainer username={name} handleChangeChat={handleChangeChatname} />
							<ChatContainer username={name} name={chatname} handleLeaveChat={handleChangeChatname}/>
						</Grid>

					) : (
							<Grid container alignItems="center" justify="center">
								<SignIn onUsernameChange={n => setName(n)} />
							</Grid>
						)
				}
			</Container>
		</>
	);
};

export default App;
