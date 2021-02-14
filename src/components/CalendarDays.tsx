import React, { useContext } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { CalendarContext } from "../common/CalendarContext";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import { grey, lightBlue } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    height: 100,
    "&:after": {
      content: "''",
      position: "absolute",
      top: 165,
      left: 300,
      height: 1,
      width: "calc(100% + 145px)",
      borderTop: "1px solid #dadce0",
    },
  },
  headerFirstColumn: {
    height: 15,
    marginTop: 85,
    paddingLeft: 8,
    borderRight: "1px solid #dadce0",
  },

  headerColumn: {
    borderRight: "1px solid #dadce0",
    position: "relative",
    paddingRight: 12,
    flex: "1 1 auto",
    height: 15,
    marginTop: 85,
  },
  dayHeader: {
    position: "absolute",
    top: -75,
    left: -1,
    height: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    color: "#70757a",
    fontWeight: 500,
    textTransform: "uppercase",
  },
  dateHeader: {
    position: "absolute",
    top: -55,
    left: -1,
    height: 45,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    color: "#70757a",
  },

  headerLabelToday: {
    borderColor: lightBlue[700],
    backgroundColor: lightBlue[700],
    color: "#ffffff",
    border: "1px solid",
    borderRadius: "100%",
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      borderColor: lightBlue[800],
      backgroundColor: lightBlue[800],
    },
  },
  headerLabelNotToday: {
    borderColor: "transparent",
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    border: "1px solid",
    borderRadius: "100%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[200],
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
  board: {
    minWidth: "100%",
    height: "100%",
    flex: "none",
    verticalAlign: "top",
    overflow: "hidden",
    position: "relative",
  },
}));
function CalendarDays(props: any) {
  const classes = useStyles();
  const { stateCalendar } = useContext(CalendarContext);
  const { selectedDate } = stateCalendar;
  const isToday = (day: any) => {
    return format(day, "ddMMyyyy") === format(new Date(), "ddMMyyyy")
      ? true
      : false;
  };

  const days = [];
  let startDate = startOfWeek(selectedDate);
  for (let i = 0; i < 7; i++) {
    days.push(addDays(startDate, i));
  }
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justify="center"
      alignItems="stretch"
      className={classes.header}
    >
      <Grid
        item
        xs={1}
        className={clsx(classes.timeColumnHeader, classes.timeColumn)}
      >
        <div className={classes.timeRow} />
      </Grid>
      <Grid item xs>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.board}
        >
          <div className={classes.headerFirstColumn} />

          {days.map((day) => {
            return (
              <Grid
                item
                xs
                id={`headerDay${day}`}
                data-group="day-header"
                data-day={day}
                className={classes.headerColumn}
                key={`header-label-${day}`}
              >
                <div className={classes.dayHeader}>
                  <span>{format(day, "EEE")}</span>
                </div>
                <div className={classes.dateHeader}>
                  <span
                    className={clsx({
                      [classes.headerLabelNotToday]: !isToday(day),
                      [classes.headerLabelToday]: isToday(day),
                    })}
                  >
                    {format(day, "d")}
                  </span>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CalendarDays;
