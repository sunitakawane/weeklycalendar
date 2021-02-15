import React, { useContext } from "react";
import { CalendarContext } from "../common/CalendarContext";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { format, differenceInMinutes } from "date-fns";

const useStyles = makeStyles((theme: Theme) => ({
  marker: {
    overflow: "hidden",
    position: "absolute",
    border: "1px solid rgba(66, 165, 245, 0.8)",
    backgroundColor: "rgba(66, 165, 245, 0.8)",
    padding: "1px 3px",
    borderRadius: 3,
    borderTopRightRadius: 3,
    cursor: "pointer",
    zIndex: 50,
    "&:hover": {
      zIndex: 53,
      backgroundColor: "rgba(66, 165, 245, 1)",
    },
    minHeight: 24,
  },
  markerText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  beginEnd: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: 10,
  },
}));

function getStyles(
  left: number,
  top: number,
  partOfStyle: React.CSSProperties
): React.CSSProperties {
  return {
    position: "absolute",
    transform: "initial",
    opacity: 1,
    height: "",
    ...partOfStyle,
  };
}

function DisplayEvent(props: any) {
  const classes = useStyles();
  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { defaultEventDuration } = stateCalendar;

  const { calendarEvent, len, sq } = props;

  const beginDate = new Date(calendarEvent.begin);
  const endDate = new Date(calendarEvent.end);

  const beginDateFormatted = format(
    beginDate,
    format(beginDate, "mm") === "00" ? "HH" : "HH:mm"
  );
  const endDateFormatted = format(
    endDate,
    format(endDate, "mm") === "00" ? "HH" : "HH:mm"
  );

  const currentDay = beginDate;
  const initTime = new Date(format(currentDay, "yyyy/MM/dd 0:0:0"));
  const position = differenceInMinutes(currentDay, initTime) + 2;
  const duration = differenceInMinutes(endDate, beginDate) - 3;

  const viewEvent = (props: any) => {
    const { calendarEvent } = props;

    setStateCalendar({
      ...stateCalendar,
      openViewDialog: true,
      calendarEvent,
    });
  };

  const left = (100 / len) * sq + 1;

  const partOfStyle: React.CSSProperties = {
    marginTop: position,
    height: duration,
    width: `calc((100% / ${len}) - 2px)`,
    marginLeft: `calc(100% / ${len} * ${sq})`,
  };

  return (
    <div
      id={calendarEvent.id}
      className={classes.marker}
      style={getStyles(left, position / 57 - 2, partOfStyle)}
      onClick={(eventEl: any) =>
        viewEvent({
          eventEl,
          calendarEvent,
          defaultEventDuration,
          stateCalendar,
          setStateCalendar,
        })
      }
    >
      <div className={classes.markerText}>{calendarEvent.title}</div>
      <div className={classes.beginEnd}>
        <span>{beginDateFormatted}</span>
        <span> - </span>
        <span>{endDateFormatted}</span>
      </div>
    </div>
  );
}

export default DisplayEvent;
