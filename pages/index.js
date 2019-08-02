import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, CssBaseline } from '@material-ui/core';
import moment from 'moment'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: "100vh",
    flex: 1,
    color: 'white',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#333',
    margin: "auto"
  }
});

function getDays(m) {
  return Math.floor(moment.duration(m, 's').asDays());
}

function getHours(m) {
  return Math.floor(
    moment.duration(
      moment.duration(m, 's').asSeconds() - moment.duration(getDays(m), 'days').asSeconds(), 's'
    ).asHours()
  );
}

function getMinutes(m) {
  return Math.floor(
    moment.duration(
      moment.duration(m, 's').asSeconds() 
      - moment.duration(getDays(m), 'days').asSeconds() 
      - moment.duration(getHours(m), 'hours').asSeconds(), 's'
    ).asMinutes()
  );
}

function getSeconds(m) {
  return Math.floor(
    moment.duration(
      moment.duration(m, 's').asSeconds() 
      - moment.duration(getDays(m), 'days').asSeconds() 
      - moment.duration(getHours(m), 'hours').asSeconds()
      - moment.duration(getMinutes(m), 'minute').asSeconds(), 's'
    ).asSeconds()
  );
}

function Index({ children }) {
  const end = moment('2019-08-30 16:00')
  const classes = makeStyles(styles)();
  const [refresh, setRefresh] = useState(end.diff(moment(), 's'))
  useEffect(() => {
    const inter = setInterval(() => {setRefresh(end.diff(moment(), 's'))}, 1000)
    return () => clearInterval(inter)
  }, [])
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Typography align="center" variant="h1" gutterBottom>Countdown</Typography>
      <Typography align='left' variant="h1">
        {getDays(refresh).toString().padStart(2, '0')}{" "}jour{(getDays(refresh) > 1 ? 's' : '')}
        <br/>
        {getHours(refresh).toString().padStart(2, '0')}{" "}heure{(getHours(refresh) > 1 ? 's' : '')}
        <br />
        {getMinutes(refresh).toString().padStart(2, '0')}{" "}minute{(getMinutes(refresh) > 1 ? 's' : '')}
        <br/>
        {getSeconds(refresh).toString().padStart(2, '0')}{" "}seconde{(getSeconds(refresh) > 1 ? 's' : '')}
      </Typography>
    </div>
  );
}

export default Index;