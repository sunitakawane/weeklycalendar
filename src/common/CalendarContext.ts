import { createContext } from "react"

type TypeCalendarContext = {
    stateCalendar: any
    setStateCalendar: Function
}

export const CalendarContext = createContext<TypeCalendarContext>({
    stateCalendar: {},
    setStateCalendar: () => {},
})
