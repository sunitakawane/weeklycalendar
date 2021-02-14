import React, { useContext } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { CalendarContext } from "../common/CalendarContext";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";
import CalendarCells from "./CalendarCells";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    overflow: "hidden",
    paddingTop: 1,
    backgroundColor: theme.palette.background.paper,
  },
  body: {
    height: "calc(100% - 150px)",
    overflowX: "scroll",
    overflow: "scroll",
    alignItems: "stretch",
    "&:before": {
      backgroundImage: "linear-gradient(to right,white,rgba(255,255,255,0))",
      content: "",
      height: 2,
      position: "absolute",
      width: 80,
      zIndex: 51,
    },
  },
  timeColumnHeader: {
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    height: "auto",
    overflowY: "hidden",
    flex: "none",
    display: "flex",
    alignItems: "flex-start",
    minWidth: 40,
    maxWidth: 40,
    marginTop: -8,
  },
  timeColumn: {
    position: "relative",
    webkitBoxSizing: "border-box",
    marginLeft: "auto",
  },
  timeRow: {
    position: "relative",
    height: 60,
    paddingRight: 8,
    textAlign: "right",
    color: "#70757a",
    fontSize: 12,
  },
  boardContainer: {
    // borderRight: '1px solid #dadce0',
    overflowX: "auto",
    overflowY: "scroll",
    display: "flex",
    alignItems: "flex-start",
    // backgroundColor: 'rgba(245, 245, 220, 0.30)',
    // height: '100%',
  },
  board: {
    minWidth: "100%",
    height: "100%",
    flex: "none",
    verticalAlign: "top",
    overflow: "hidden",
    position: "relative",
  },

  eventsContainer: {
    backgroundColor: "transparent",
    position: "relative",
    height: "100%",
    width: "100%",
  },

  currentTimeDot: {
    background: cyan[500],
    borderRadius: "50%",
    content: "''",
    position: "absolute",
    height: 12,
    width: 12,
    zIndex: 52,
    marginTop: -1000,
    marginLeft: -6.5,
  },
  currentTimeLine: {
    position: "absolute",
    zIndex: 51,
    borderColor: cyan[500],
    borderTop: "2px solid",
    left: 0,
    right: -1,
  },
}));
function CaledarHrs(props: any) {
  const classes = useStyles();
  const { stateCalendar } = useContext(CalendarContext);
  const { selectedDate } = stateCalendar;
  const isToday = (day: any) => {
    return format(day, "ddMMyyyy") === format(new Date(), "ddMMyyyy")
      ? true
      : false;
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justify="center"
      alignItems="stretch"
      className={classes.body}
    >
      <Grid item xs={1} className={classes.timeColumnHeader}>
        <div className={classes.timeColumn}>
          <div className={classes.timeRow} />
          {Array.from(Array(23).keys()).map((index) => {
            return (
              <div className={classes.timeRow} key={`time-${index}`}>
                <span>{index + 1}</span>
              </div>
            );
          })}
          <div className={classes.timeRow} />
        </div>
      </Grid>

      <Grid item xs className={classes.boardContainer}>
        <CalendarCells />

        {/* <CalendarBoard
      selectedWeekIndex={selectedWeekIndex}
      selectedWeek={selectedWeek}
    /> */}
      </Grid>
    </Grid>
  );
}

export default CaledarHrs;
