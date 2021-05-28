import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useSelector, useDispatch } from 'react-redux'
import { DiTrello } from 'react-icons/di'
import AddItem from './AddItem'
import { BsSearch, BsGrid3X3Gap } from 'react-icons/bs'
import { BiHomeAlt, BiLogOut } from 'react-icons/bi'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(0.5, 0.3, 0.5, 0.4),
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgba(0,0,0,.12)',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Raleway',
    top: '0',
    verticalAlign: 'middle',
    position: 'fixed',
    width: '100%',
    zIndex: 1,
  },
  backGroundBorder: {
    backgroundColor: 'hsla(0,0%,100%,.24)',
    color: 'white',
    borderRadius: '3px',
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
      color: 'rgba(255, 255, 255, 0.8)',
    },
  },
  headerIcon: {
    fontSize: '1.2rem',
    padding: '0.3rem 0.4rem 0.2rem 0.4rem',
    marginRight: '4px',
  },
  trello: {
    fontWeight: 700,
    color: 'rgba(255, 255, 255, 0.5)',
    zIndex: 100,
    opacity: 0.7,
    fontWeight: '700',
    fontSize: '23px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '15rem',
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
      color: 'rgba(255, 255, 255, 0.8)',
    },
  },
  boards: {
    display: 'flex',
    height: '1.05rem',
    alignItems: 'center',
    padding: '0.5rem 0.6rem',
    marginRight: '4px',
  },
  searchIcon: {
    position: 'absolute',
    top: '25%',
    right: '0.5rem',
    color: '#fff',
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
      color: 'rgba(255, 255, 255, 0.8)',
    },
  },
  boardSearch: {
    width: '170px',
    position: 'relative',
  },
  boardSearchInput: {
    height: '2rem',
    border: 'none',
    width: '100%',
    padding: '0 3rem 0 0.5rem',
    '&::placeholder ': {
      color: 'white',
    },
  },
  logout: {
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    marginTop: '4px',
    height: '1.05rem',
    right: 0,
    marginLeft: '10px',
    marginRight: '20px',
    zIndex: 200,
    width: '85px !important',
    padding: '0.5rem 0.6rem',
  },
}))

export default function Header({ btnText, path, icon }) {
  const classes = useStyles()
  const history = useHistory()
  return (
    <>
      <div className={classes.header}>
        <span className={`${classes.headerIcon} ${classes.backGroundBorder}`}>
          <BsGrid3X3Gap />
        </span>
        <span className={`${classes.headerIcon} ${classes.backGroundBorder}`}>
          <BiHomeAlt />
        </span>

        <div className={`${classes.boards} ${classes.backGroundBorder}`}>
          <DiTrello style={{ marginRight: '4px', fontSize: '1.2rem' }} />
          Boards
        </div>

        <div className={classes.boardSearch}>
          <input
            type="search"
            placeholder="Jump to.."
            className={`${classes.boardSearchInput} ${classes.backGroundBorder}`}
          />
          <BsSearch className={classes.searchIcon} />
        </div>
        <div className={classes.trello}>
          <DiTrello />
          Trello
        </div>
      </div>

      <div
        className={`${classes.logout} ${classes.backGroundBorder}`}
        onClick={() => {
          history.push('/')
        }}
      >
        <BiLogOut style={{ marginRight: '4px', fontSize: '1.2rem' }} />
        Logout
      </div>
    </>
  )
}
