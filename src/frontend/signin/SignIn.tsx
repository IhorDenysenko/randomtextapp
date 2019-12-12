import  React, {useState, MouseEvent} from "react";
import {Button, Typography, TextField, makeStyles, Theme, Card, CardContent, Grid, Divider} from '@material-ui/core';
import 'typeface-roboto';

interface Props {
    onUsernameChange: (username: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
      marginTop: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 300,
      height: 300
    },
    card_content: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(3)
    },
    submit: {
      marginTop: theme.spacing(2),
      height: 50
    },
    mainPart: {
        marginTop: theme.spacing(5)
    },
  }));


const SignIn: React.FC<Props> = (props: Props) => {

    const [username, setUsername] = useState('');
    const classes = useStyles();

    const setUser = (event: MouseEvent): void => {
        event.preventDefault();

        if (username !== '') {
            props.onUsernameChange(username);
        }
    };

    return (
        
        <Card className={classes.paper}>
        
            <CardContent  className={classes.card_content}>

                <Typography gutterBottom component="h1" variant="h4">
                Sign in
                </Typography>

                <Divider orientation="horizontal" />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    className={classes.mainPart}
                    autoFocus
                    value={username} onChange={ev => setUsername(ev.target.value)} 
                />
         
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={setUser}
                >
                Sign In
                </Button>

            </CardContent>
        </Card>        
    );

};

export default SignIn;