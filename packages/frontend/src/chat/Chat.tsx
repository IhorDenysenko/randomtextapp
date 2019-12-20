import React, { useState, useEffect, MouseEvent } from "react";
import { loadMessageHistory, leaveChatRoom, subscribeToReceiveMessage, unsubscribeToReceiveMessage, sendMessageToChatroom } from '../api/SocketAPI';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, createStyles, Theme, TextField, Card, InputAdornment, Grid, Divider, ListItemText, Typography, CardContent, List, ListItem } from '@material-ui/core';

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

interface ChatProps {
    username: string;
    name: string;
    handleLeaveChat: (data: string) => void;
}

const Chat: React.FC<ChatProps> = (props: ChatProps) => {

    const classes = useStyles();

   
    return (
        <Card className={classes.card}>

            <CardContent className={classes.card_content}>
                <ChatHeader username={props.username} name={props.name} handleLeaveChat={props.handleLeaveChat} />
                <Divider orientation="horizontal" />

                <ChatBody name={props.name} />

                <ChatFooter username={props.username} name={props.name} />
            </CardContent>


        </Card>
    );
};

interface ChatHeaderProps {
    username: string;
    name: string;
    handleLeaveChat: (data: string) => void;
}

const ChatHeader: React.SFC<ChatHeaderProps> = (props: ChatHeaderProps) => {

    const handleLeaveRoom = (ev: MouseEvent) => {
        ev.preventDefault();

        leaveChatRoom(props.username, props.name);
        props.handleLeaveChat('');
    };

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item xs={11}>
                <Typography gutterBottom variant="h4" component="h2"> {props.name} </Typography>
            </Grid>
            <Grid item xs={1}>
                <IconButton onClick={handleLeaveRoom}>
                    <CloseIcon />
                </IconButton>
            </Grid>
        </Grid>
    );

};

interface ChatBodyProps {
    name: string;
}

const ChatBody: React.SFC<ChatBodyProps> = (props: ChatBodyProps) => {
    const classes = useStyles();

    const [messages, setMessages] = useState([] as string[]);

    useEffect(() => {

        subscribeToReceiveMessage((data: string) => {
            setMessages([...messages, data]);
        });

        return () => {
            unsubscribeToReceiveMessage();
        };
    }, [messages]);

    useEffect(() => {

        loadMessageHistory(props.name, (data: string[]) => {     
            setMessages(data);
        });

    }, [props.name]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <List className={classes.chatroom_list}>
                    <Grid item xs={12}>
                        { 
                        messages.map(messag => {
                            return (
                                <ListItem>
                                    <ListItemText primary={messag} />
                                </ListItem>
                            )
                        })
                        }
                    </Grid>
                </List>
            </Grid>
        </Grid>
    );

};


interface ChatFooterProps {
    username: string;
    name: string;
}

const ChatFooter: React.FC<ChatFooterProps> = (props: ChatFooterProps) => {

    const [message, setMessage] = useState('');


    const sendMessage = (ev: MouseEvent) => {
        ev.preventDefault();

        if (message === '') {
            return;
        }

        sendMessageToChatroom(props.username, props.name, message);
        setMessage('');
    };


    return (
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
                                <IconButton onClick={sendMessage}>
                                    <CommentIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );

};


export default Chat;
