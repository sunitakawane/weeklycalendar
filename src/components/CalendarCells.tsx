import React, { useState, useEffect, useContext, useMemo } from "react";
import { CalendarContext } from "../common/CalendarContext";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { format, differenceInMinutes, startOfWeek, addDays } from "date-fns";
import Grid from "@material-ui/core/Grid";
import LineDivisor from "./LineDivisor";
import createEditEvent from "./createEditEvent";
import DisplayEvent from "./DisplayEvent";
import Events from "../data/CalendarEvents";

type event = {
  id: string | number;
  title: string;
  description: string;
  begin: string;
  end: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    board: {
      minWidth: "100%",
      height: "100%",
      flex: "none",
      verticalAlign: "top",
      overflow: "hidden",
      position: "relative",
    },
    columnDivisor: {
      height: "100%",
      paddingLeft: 8,
      borderRight: "1px solid #dadce0",
    },
    dayContainer: {
      // backgroundColor: lightBlue[50],
      borderRight: "1px solid #dadce0",
      position: "relative",
      paddingRight: 12,
      flex: "1 1 auto",
      height: "100%",
    },
    eventsContainer: {
      backgroundColor: "transparent",
      position: "relative",
      height: "100%",
      width: "100%",
    },
    currentTimeDot: {
      background: "rgb(226, 57, 43)",
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
      borderColor: "rgb(226, 57, 43)",
      borderTop: "2px solid",
      left: 0,
      right: -1,
    },
  })
);

function CalendarCells(props: any) {
  const classes = useStyles();

  const { selectedWeekIndex, selectedWeek } = props;

  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { selectedDate, defaultEventDuration } = stateCalendar;

  const [currentTimePosition, setCurrentTimePosition] = useState(100);

  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const initTime = new Date(format(now, "yyyy/MM/dd 0:0:0"));
      const position = differenceInMinutes(now, initTime);
      setCurrentTimePosition(position);
    }, 1000);
  }, []);

  const days: any[] = [];
  let startDate = startOfWeek(selectedDate);
  for (let i = 0; i < 7; i++) {
    days.push(addDays(startDate, i));
  }

  const localStorageMarkers = window.localStorage.getItem("markers");
  const getEventData = (day: Date) => {
    console.log("getting events...");

    const allEvents =
      Events().sort((a: event, b: event) => {
        return new Date(a.begin).getTime() - new Date(b.begin).getTime();
      }) || [];
    console.log("allEvents", allEvents);
    const dayEvents = allEvents.filter(
      (event: any) =>
        format(new Date(event.begin), "yyyyMMdd") === format(day, "yyyyMMdd")
    );

    console.log("dayEvents", dayEvents);

    const dayHoursEvents =
      dayEvents.length > 1
        ? dayEvents
            .map((event: any) => new Date(event.begin).getHours())
            .sort((numberA: number, numberB: number) => numberA - numberB)
        : dayEvents.map((event: any) => new Date(event.begin).getHours());
    console.log("dayHoursEvents", dayHoursEvents, dayEvents);

    const eventsByHour = dayHoursEvents.reduce((acc: any[], hour: number) => {
      const len = dayHoursEvents.filter(
        (eventHour: number) => eventHour === hour
      ).length;
      !acc.some((accItem: any) => accItem.hour === hour) &&
        acc.push({ hour, len });
      return acc;
    }, []);

    console.log("eventsByHour", eventsByHour);

    const markers = eventsByHour.map((evHour: any) => {
      return dayEvents
        .filter(
          (event: any) => new Date(event.begin).getHours() === evHour.hour
        )
        .map((event: any, index: number) => (
          <DisplayEvent
            key={`event-${event.id}`}
            calendarEvent={event}
            sq={index}
            len={evHour.len}
          />
        ));
    });
    return markers;
  };

  const CurrentTimeMark = (props: any) => {
    const { marginTop = -1000 } = props;
    return (
      <>
        <div
          className={classes.currentTimeDot}
          style={{ marginTop: marginTop - 5 }}
        />
        <div
          className={classes.currentTimeLine}
          style={{ marginTop: marginTop }}
        />
      </>
    );
  };

  const viewLayoutEl = useMemo(() => {
    return days.map((day) => {
      const isToday =
        format(day, "ddMMyyyy") === format(new Date(), "ddMMyyyy");
      const eventsOfDay = getEventData(day);
      return (
        <Grid
          item
          xs
          id={`day${day + 1}`}
          data-group="day-column"
          data-date={day}
          className={classes.dayContainer}
          key={`board-day-column-${selectedWeekIndex}-${day}-${day}`}
          onClick={(eventEl: any) =>
            createEditEvent({
              eventEl,
              defaultEventDuration,
              stateCalendar,
              setStateCalendar,
            })
          }
        >
          {isToday && <CurrentTimeMark marginTop={currentTimePosition} />}

          {eventsOfDay && eventsOfDay.length > 0 && (
            <div className={classes.eventsContainer} data-date={day}>
              {eventsOfDay}
            </div>
          )}
        </Grid>
      );
    });
    // ....
    // ....
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    classes,
    defaultEventDuration,
    getEventData,

    selectedDate,
    selectedWeek,
    selectedWeekIndex,
    localStorageMarkers,
  ]);

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justify="center"
      alignItems="flex-start"
      className={classes.board}
    >
      <LineDivisor />
      <div className={classes.columnDivisor} />

      {viewLayoutEl}
    </Grid>
  );
}

export default CalendarCells;
