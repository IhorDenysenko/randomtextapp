import React, { useState, useEffect } from "react";
import { loadChatRoomNames, joinChatRoom } from "../api/SocketAPI";
import { makeStyles, createStyles, Theme, Card, Divider, Button, Typography, CardActions, CardContent, List, ListItem } from '@material-ui/core';
import 'typeface-roboto';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            height: 440,
            width: 300,
            marginTop: theme.spacing(12),
            marginRight: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        card_content: {
            backgroundColor: theme.palette.background.paper,
            marginTop: theme.spacing(1),
            width: 300
        },
        chatroom_list: {
            maxHeight: 350,
            overflow: 'auto',
            width: 300
        },
        button: {
            display: 'block',
            width: '100%'
        },
    }),
);

interface ChatroomContainerProps {
    username: string;
    handleChangeChat: (data: string) => void;
}

const ChatroomContainer: React.FC<ChatroomContainerProps> = (props: ChatroomContainerProps) => {

    const [chatrooms, setChatrooms] = useState([] as string[]);
    const classes = useStyles();

    useEffect(() => {

        loadChatRoomNames((data: string[]) => {
            setChatrooms(data);
        });

    }, []);

   

    return (
        <Card className={classes.card}>

            <ChatroomHeader />

            <CardActions>
               
               <ChatroomBody username={props.username} chatrooms={chatrooms} handleChangeChat={props.handleChangeChat} />

            </CardActions>
        </Card>
    );
};

const ChatroomHeader: React.SFC = () => {
    const classes = useStyles();

    return (
        <CardContent className={classes.card_content}>
            <Typography gutterBottom variant="h4" component="h2"> Chatrooms </Typography>
            <Divider orientation="horizontal" />
        </CardContent>
    );

};

interface ChatroomContainerBodyProps {
    username: string;
    chatrooms: string[];
    handleChangeChat: (data: string) => void;
}

const ChatroomBody: React.SFC<ChatroomContainerBodyProps> = (props: ChatroomContainerBodyProps) => {
    const classes = useStyles();

    const getButtonValue = (elem: HTMLButtonElement): string => {
        const val = elem.getAttribute('value');
        return val ? val : '';
    };

    const handleChooseChatroom = (ev: React.MouseEvent): void => {
        ev.preventDefault();

        joinChatRoom(props.username, getButtonValue(ev.currentTarget as HTMLButtonElement));
        props.handleChangeChat(getButtonValue(ev.currentTarget as HTMLButtonElement));
    };


    return (
        <List className={classes.chatroom_list}>

            {props.chatrooms.map(chatroom => {
                return (
                    <ListItem>
                        <Button
                            onClick={handleChooseChatroom}
                            color="primary"
                            value={chatroom}
                            name={chatroom}
                            fullWidth
                            variant="contained">
                            {chatroom}
                        </Button>
                    </ListItem>
                );
            })}
        </List>
    );

};


export default ChatroomContainer;