import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import CalendarLayoutWeek from "./CalendarLayoutWeek";

const useStyles = makeStyles((theme: Theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    ...theme.mixins.toolbar,
    justifyContent: "flex-center",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    height: "100%",
    width: "100%",
  },
}));
function CalendarLayout(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.drawerHeader} />
      <CalendarLayoutWeek />
    </div>
  );
}

export default CalendarLayout;
