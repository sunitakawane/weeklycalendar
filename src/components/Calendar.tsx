import React, { useState } from "react";
import { CalendarContext } from "../common/CalendarContext";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { addWeeks, subWeeks } from "date-fns";

import CalendarHeader from "./CalendarHeader";
import CalendarLayout from "./CalendarLayout";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
}));

function Calendar(props: any) {
  const classes = useStyles();
  const selectedDate = new Date();
  const [stateCalendar, setStateCalendar] = useState({
    selectedDate,
  });
  const [runAnimation, setRunAnimation] = useState(true);

  const goToToday = () => {
    setRunAnimation(false);
    const newDate = new Date();
    setStateCalendar({ ...stateCalendar, selectedDate: newDate });
  };

  const next = () => {
    setRunAnimation(false);
    let newDate = addWeeks(stateCalendar.selectedDate, 1);
    setStateCalendar({ ...stateCalendar, selectedDate: newDate });
  };

  const previous = () => {
    setRunAnimation(false);
    let newDate = subWeeks(stateCalendar.selectedDate, 1);
    setStateCalendar({ ...stateCalendar, selectedDate: newDate });
  };
  return (
    <CalendarContext.Provider value={{ stateCalendar, setStateCalendar }}>
      <div className={classes.root}>
        <CssBaseline />
        <CalendarHeader goToToday={goToToday} next={next} previous={previous} />
        <CalendarLayout runAnimation={runAnimation} />
      </div>
    </CalendarContext.Provider>
  );
}

export default Calendar;
