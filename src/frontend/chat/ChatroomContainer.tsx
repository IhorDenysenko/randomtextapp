import React, { useState, useEffect } from "react";
import axios from 'axios';
import {joinChatRoom} from "../api/SocketAPI";
import {makeStyles, createStyles, Theme, Card, Divider, Button, Typography, CardActions, CardContent, List, ListItem } from '@material-ui/core';
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

interface Props {
    username: string;
}

const ChatroomContainer: React.FC<Props> = (props: Props) => {

    const [chatrooms, setChatrooms] = useState([]);
    const classes = useStyles();

    useEffect(() => {

        const loadChatRooms = (): void => {
            axios.get(`https://randomtextapp.herokuapp.com/api/chatrooms`)
                .then(res => {

                    const roomdata = res.data;
                    setChatrooms(roomdata);
                });
        };

        loadChatRooms();

    },[]);

    const handleChooseChatroom = (ev: React.MouseEvent): void => {
        ev.preventDefault();

        let target = (ev.currentTarget as HTMLButtonElement).getAttribute('value');
    
        joinChatRoom(props.username, target? target : "");
    };

    return(
            <Card className={classes.card}>

                <CardContent className={classes.card_content}>
                    <Typography gutterBottom variant="h4" component="h2"> Chatrooms </Typography>  
                    <Divider orientation="horizontal" />
                </CardContent>
                
                <CardActions>              
                <List className={classes.chatroom_list}>

                    {chatrooms.map(chatroom => {
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

                </CardActions>
            </Card>
       
    );

};

export default ChatroomContainer;