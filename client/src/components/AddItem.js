import React from 'react'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  add: {
    textTransform: 'none',
    margin: theme.spacing(0.2, 1, 1, 1),
    justifyContent: 'left',
    opacity: 0.8,
    width: (props) => (props.width ? props.width : '256px'),
    color: (props) => props.color,
    fontWeight: 'bold',
    backgroundColor: 'hsla(0,0%,100%,.24)',
    '&:hover': {
      opacity: 1,
      backgroundColor: 'rgba(9,30,66,.08)',
    },
  },
}))

export default function AddItem({ btnText, handleClick, icon, color, width }) {
  const classes = useStyles({ color })
  return (
    <Button className={`${classes.add}`} onClick={handleClick}>
      {icon} {btnText}
    </Button>
  )
}
