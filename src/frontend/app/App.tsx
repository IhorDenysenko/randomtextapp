import React, { useState, useEffect } from 'react';
import SignIn from "../signin/SignIn";
import ChatContainer from "../chat/ChatContainer";
import ChatroomContainer from "../chat/ChatroomContainer";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';

const App: React.FC = () => {
  const [name, setName] = useState('');

  useEffect(() => {

    console.log("new name: " + name);
  }, [name]);


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        {
          name !== '' ? (
            <React.Fragment>
              <Grid container alignItems="center">
                <ChatroomContainer username={name} />
                <ChatContainer username={name} />
              </Grid>
            </React.Fragment>
          ) : (
            <Grid container alignItems="center" justify="center">
              <SignIn onUsernameChange={n => setName(n)} />
            </Grid>
            )
        }
      </Container>
    </React.Fragment>
  );
};

export default App;
