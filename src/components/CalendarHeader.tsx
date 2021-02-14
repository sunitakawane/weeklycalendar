import React from "react";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core/";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import format from "date-fns/format";

import { CalendarContext } from "../common/CalendarContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    borderBottom: "1px solid #E0E0E0",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    fontWeight: 400,
    fontSize: theme.spacing(3),
    textTransform: "capitalize",
  },
  button: {
    paddingRight: theme.spacing(1),
  },

  tooltip: {
    marginTop: 2,
  },
}));

function CalendarHeader(props: any) {
  const { goToToday, next, previous } = props;
  const { stateCalendar } = useContext(CalendarContext);
  const { selectedDate } = stateCalendar;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar>
        <Tooltip
          title={`${format(new Date(), "EEEE, MMMM d")}`}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            variant="outlined"
            aria-label="Today"
            onClick={goToToday}
            className={classes.menuButton}
          >
            Today
          </Button>
        </Tooltip>
        <Tooltip title="Previous Week" classes={{ tooltip: classes.tooltip }}>
          <IconButton onClick={previous}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next Week" classes={{ tooltip: classes.tooltip }}>
          <IconButton onClick={next}>
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
        <Typography className={classes.title}>
          {format(selectedDate, "MMMM yyyy")}
        </Typography>
      </Toolbar>
    </div>
  );
}

export default CalendarHeader;
