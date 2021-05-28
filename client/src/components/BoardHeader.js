import React from 'react'
import { makeStyles } from '@material-ui/core'
import { BiStar } from 'react-icons/bi'
import { RiArrowDownSLine, RiBarChartHorizontalFill } from 'react-icons/ri'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    marginTop: '3rem',
    overflow: 'hidden',
    opacity: 0.8,
  },
  title: {
    fontWeight: 'bold',

    padding: theme.spacing(0.7, 0.7, 0.7, 0.7),
    fontFamily: 'Raleway',
    fontSize: '19px',
    marginRight: '4px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0,0%,100%,.24)',
    '&:hover': {
      opacity: 1,

      borderRadius: 4,
    },
  },
  headerIcon: {
    backgroundColor: 'hsla(0,0%,100%,.24)',
    fontSize: '1.15rem',
    padding: '0.3rem 0.4rem 0.2rem 0.4rem',
    marginRight: '4px',
    borderRadius: '3px',
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
      color: 'rgba(255, 255, 255, 0.8)',
    },
  },
  board: {
    borderRadius: '3px',
    marginLeft: '3px',
    padding: theme.spacing(0.7, 0.7, 0.7, 0.7),
    backgroundColor: 'hsla(0,0%,100%,.24)',
    marginRight: '4px',
  },
}))
export default function BoardHeader({ title }) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <span className={classes.board}>
        <RiBarChartHorizontalFill
          style={{
            transform: 'rotate(90deg)',
            marginRight: '2px',
            marginTop: '2px',
          }}
        />{' '}
        Board <RiArrowDownSLine />
      </span>
      <span className={classes.title}>{title}</span>
      <span className={classes.headerIcon}>
        <BiStar />
      </span>
    </div>
  )
}
