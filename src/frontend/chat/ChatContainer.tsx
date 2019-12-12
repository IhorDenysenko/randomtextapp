import React, { useState, useEffect } from "react";
import Chat from '../chat/Chat';
import { makeStyles, createStyles, Theme, Typography, Card} from '@material-ui/core';
import {
    subscribeToOnJoined,
    unsubscribeToOnJoined,
    subscribeToLeftChat,
    unsubscribeToLeftChat,
    leaveChatRoom
} from '../api/SocketAPI';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
        height: 440,
        width: 500,
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper_content: {      
        marginTop: theme.spacing(24),
        alignItems: 'center'
    },
  }),
);


interface Props {
    username: string;
}

const ChatContainer: React.FC<Props> = (props: Props) => {

    const [chatname, setChatname] = useState('');
    const classes = useStyles();

    useEffect(() => {

        subscribeToOnJoined((data:{chat: string}) => {

            if(chatname !== ''){

                leaveChatRoom(props.username, chatname);
                setChatname('');
            }

            setChatname(data.chat);
        });

        return() => {
            unsubscribeToOnJoined();
        };
    },[chatname]);

    useEffect(() => {

        subscribeToLeftChat((data) => {

            if(chatname === data.chat){
                setChatname('');
            }

        });

        return() => {
            unsubscribeToLeftChat();
        };
    },[chatname]);

    return (
        <Card className={classes.paper}>
            {
                chatname !== '' ? (
                        <Chat username={props.username} name={chatname}/>
                    )
                    :
                    (
                        
                        <Typography className={classes.paper_content} variant="h4" component="h2"> Join Chat And Start Messaging </Typography>
                    )
            }
        </Card>
    );
};

export default ChatContainer;