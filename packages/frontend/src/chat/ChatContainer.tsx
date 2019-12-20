import React from "react";
import Chat from "./Chat";
import { makeStyles, createStyles, Theme, Typography, Card } from '@material-ui/core';

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


interface ChatContainerProps {
    username: string;
    name: string;
    handleLeaveChat: (data: string) => void;
}

const ChatContainer: React.SFC<ChatContainerProps> = (props: ChatContainerProps) => {

    const classes = useStyles();



    return (
        <Card className={classes.paper}>
            {
                props.name !== '' ? (
                    <Chat username={props.username} name={props.name} handleLeaveChat={props.handleLeaveChat} />
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