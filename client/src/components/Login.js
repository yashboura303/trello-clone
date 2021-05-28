import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import HowToRegIcon from '@material-ui/icons/HowToReg'

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()
  const useStyles = makeStyles((theme) => ({
    center: {
      height: '100vh',
    },
    login: {
      padding: '1.5rem 1.6rem',
      backgroundColor: 'hsla(0,0%,100%,.24)',
      color: 'black',
      borderRadius: '3px',
      '&:hover': {
        opacity: 1,
        cursor: 'pointer',
        color: 'grey',
      },
    },
  }))

  useEffect(() => {
    if (loggedIn) history.push(`/board`)
  }, [history, loggedIn])
  const classes = useStyles()
  return (
    <>
      <Grid
        container
        className={classes.center}
        alignItems="center"
        justify="center"
        alignContent="center"
      >
        <button
          className={classes.login}
          onClick={() => {
            setLoggedIn(!loggedIn)
          }}
        >
          Login
        </button>
      </Grid>
    </>
  )
}
