import React, { useState, useEffect, MouseEvent } from "react";
import  {leaveChatRoom, subscribeToReceiveMessage, unsubscribeToReceiveMessage, sendMessageToChatroom} from '../api/SocketAPI';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close'
import {makeStyles, createStyles, Theme, TextField, Card, InputAdornment, Grid, Divider, ListItemText, Typography, CardContent, List, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
        height: 440,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    card_content: {
        backgroundColor: theme.palette.background.paper,
        width: 500
    },
    chatroom_list: {
        height: 295,
        overflow: 'auto',
        width: 500
    },
    footer: {
        bootom: 0
    },
  }),
);

interface Props {
    username: string;
    name: string;
}

const Chat: React.FC<Props> = (props) => {

    const [chatname, setChatname] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([] as  string[]);
    const classes = useStyles();

    useEffect(() => {

        const loadMessageHistory = (name: string) => {
            axios.get(`https://randomtextapp.herokuapp.com/api/chatrooms/`+name)
                .then(res => {
                    const messageData = res.data;
                    setMessages(messageData);
                });
        };

        setChatname(props.name);
        loadMessageHistory(props.name);

    },[chatname]);

    useEffect(() => {

        subscribeToReceiveMessage((data: string) => {
            const arr = [...messages, data];
            setMessages(arr);
        });

        return () => {
            unsubscribeToReceiveMessage();
        };
    },[messages]);

    const sendMessage = (ev: MouseEvent) => {
        ev.preventDefault();

        if(message === ''){
            return;
        }

        sendMessageToChatroom(props.username, chatname, message);

        setMessage('');
    };

    const handleLeaveRoom = (ev: MouseEvent) => {
        ev.preventDefault();

        leaveChatRoom(props.username, chatname);
    };


    return (
        <Card  className={classes.card}>

            <CardContent className={classes.card_content}>

                <Grid container justify="center" alignItems="center">     
                    <Grid item xs={11}>       
                        <Typography gutterBottom variant="h4" component="h2"> {chatname} </Typography>
                    </Grid>
                    <Grid item xs={1}> 
                        <IconButton onClick={handleLeaveRoom}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>  
                <Divider orientation="horizontal" />   

                <Grid container>
                    <Grid item xs={12}>
                        <List className={classes.chatroom_list}>
                            <Grid item xs={12}>

                                {messages.map(messag => {
                                    return (
                                        <ListItem>
                                            <ListItemText primary={messag} />                            
                                        </ListItem>      
                                    )
                                })}
                            </Grid>
                        </List>
                    </Grid>
                </Grid>

          
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Divider orientation="horizontal" />
                    </Grid>

                    <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required              
                    id="message"
                    label="Message"
                    name="message"
                    autoComplete="message"
                    autoFocus
                    fullWidth
                    value={message} 
                    onChange={ev => setMessage(ev.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton  onClick={sendMessage}>
                                    <CommentIcon />
                                </IconButton>
                          </InputAdornment>
                        ),
                      }}
                />
                </Grid>
                </Grid>
            </CardContent>
            

        </Card>
    );
};

export default Chat;

/*
  {messages.map(messag => {
                                return (
                                    <ListItem>
                                        <ListItemText primary={messag} />                            
                                    </ListItem>      
                                )
                            })}

*/