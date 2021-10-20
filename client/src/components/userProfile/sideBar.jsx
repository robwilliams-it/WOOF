import React from 'react';

import UserMenu from './userMenu.jsx';

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from '../../contexts/AuthContext.jsx';


const SideBar = () => {

  const { userData, currentUser } = useAuth();
  const [userDataState, setUserDataState] = userData;
  {console.log(userDataState)}
  {console.log(currentUser)}

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Typography variant="h6" align="center" fullWidth>
          Account
        </Typography>
      </Grid>
      <Grid item id='userInfo' sm={2}>
        <Typography>Name: {userDataState.name}</Typography>
        <Typography>Email: {userDataState.email}</Typography>
        <Typography>address here</Typography>
        {/* <Typography>{currentUser.email}</Typography> */}
        <UserMenu />
      </Grid>
    </Grid>
  )
}

export default SideBar;