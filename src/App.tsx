// @ts-nocheck

import { useState } from "react"
import "./App.css"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")

const mockData = [
  {
    start: moment([2024, 5, 4]),
    end: moment([2024, 5, 10]),
    label: "9:00 - 15:00 Mathematics 101",
  },
  {
    start: moment([2024, 5, 6]),
    end: moment([2024, 5, 13]),
    label: "15:15 - 16:00 Algorithms and Datastructures",
  },
  {
    start: moment([2024, 5, 11]),
    end: moment([2024, 5, 15]),
    label: "9:00 - 12:00 Extended Brunch",
  },
  {
    start: moment([2024, 5, 27]),
    end: moment([2024, 6, 5]),
    label: "9:00 - 12:00 Schedule Testing",
  },
]

const days = [ "Ma", "Ti", "Ke", "To", "Pe", "La", "Su" ]
const columns = 7
const rows = 6

const Calendar = () => {
  const [ date, setDate ] = useState(moment())  

  const addMonth = () => {
    setDate((oldDate) => oldDate.clone().add({ month: 1 }))
  }

  const removeMonth = () => {
    setDate((oldDate) => oldDate.clone().subtract({ month: 1 }))
  }

  const calendarCells = []

  const today = moment()
  const lastMonth = date.clone().subtract({ month: 1 })
  const daysInLastMonth = lastMonth.daysInMonth()

  const nextMonth = date.clone().add({ month: 1 })
  const daysInNextMonth = nextMonth.daysInMonth()
 
  const firstDayOfCurrentMonth = moment([ date.year(), date.month(), 1 ]).day() - 1
  
  // Previous month
  for (let dayNumber = (daysInLastMonth - firstDayOfCurrentMonth); dayNumber < daysInLastMonth; dayNumber++) {
    calendarCells.push({
      date: moment([ lastMonth.year(), lastMonth.month(), dayNumber + 1 ]),
      currentMonth: false,
    })
  }

  // Current month
  for (let dayNumber = 0; dayNumber < date.daysInMonth(); dayNumber++) {
    calendarCells.push({
      date: moment([ date.year(), date.month(), dayNumber + 1 ]),
      currentMonth: true,
    })
  }  
  
  // Next month
  const daysInPreviousAndCurrent = calendarCells.length
  for (let dayNumber = calendarCells.length; dayNumber < rows * columns; dayNumber++) {
    calendarCells.push({
      date: moment([ nextMonth.year(), nextMonth.month(), dayNumber - daysInPreviousAndCurrent + 1 ]),
      currentMonth: false,
    })
  }

  // Generate calendar schedule blocks
  const blocks = mockData.map((data) => {
    // Figure out in what column and row the schedule element starts from
    // and how big it should be.
    const startingColumn = data.start.day() - 1
    const startingRow = Math.floor(calendarCells.findIndex((item) => item.date.isSame(data.start, "day")) / 7)
    const columnsOccupied = data.end.diff(data.start, "days") + 1
    const rowsOccupied = Math.ceil((columnsOccupied + data.start.day()) / columns)

    const blocks = []

    let currentWeek = data.start.week()
    let currentColumn = startingColumn
    let currentRow = startingRow
    let cellsToVisit = columnsOccupied
    let creatingBlock = true
    let originColumn = currentColumn

    while (cellsToVisit > 0) {
      creatingBlock = true
      currentColumn++
      cellsToVisit--

      // Current block is starting to be too big for the view
      if (currentRow === rows) {
        break
      }

      // If true, row changes
      if (currentColumn === columns) {

        blocks.push({
          element: (      
            <div
              className={`block ${blocks.length === 0 ? "first" : ""} ${cellsToVisit === 0 ? "last" : ""}`}
              style={{ gridColumn: `${originColumn + 1} / ${ currentColumn + 1 }` }}
            >
              <p>{ data.label }</p>
            </div>
          ),
          week: currentWeek,
        })
        
        creatingBlock = false 
        currentColumn = 0
        currentRow++ // Increment row
        originColumn = 0 // Next block will start from column 0
        currentWeek++ // Increment week when going to the next row
      }
      
    }

    if (creatingBlock) {
      blocks.push({
        element: (      
          <div
            className={`block ${blocks.length === 0 ? "first" : ""} last`}
            style={{ gridColumn: `${originColumn + 1} / ${ currentColumn + 1 }` }}
          >
            <p>{ data.label }</p>
          </div>
        ),
        week: currentWeek,
      })
    }
        
    return blocks
  }).flat()
  

  return (

    <>
      <div className="calendar__controls">
        <p>{ date.format("MMMM YYYY") }</p>

        <div className="nav">
          <button onClick={() => setDate(moment())}>{"Tänään"}</button>
          <button onClick={removeMonth}>{"Edellinen"}</button>
          <button onClick={addMonth}>{"Seuraava"}</button>
        </div>
      </div>
      
      <div className="calendar">
        <div className="calendar__header">
          {
            days.map((day) => (
              <div key={day} className="calendar__header-title">
                <p>{ day }</p>
              </div>
            ))
          }
        </div>
        <div className="calendar__body">

          {
            Array.from({ length: 6 }).map((_, week) => {
              // Get the first top left cell of the calendar and check its week number
              const actualWeekNumber = calendarCells[0].date.week() + week
              
              return (
                <div className="calendar__week">
                  <div className="calendar__block-container">
                    {

                      blocks
                        .filter((data) => data.week === actualWeekNumber)
                        .map((data) => data.element)
                    }
                  </div>

                  {
                    Array.from({ length: 7 }).map((_, day) => {
                      const item = calendarCells[7 * week + day]
                      
                      return (
                        <div className={`calendar__cell ${item.currentMonth ? "" : "grayed"}`}>
                          <div className="calendar__cell-header">
                            <p className={`calendar__cell-number ${ item.date.isSame(today, "day") ? "today" : "" }`}>
                              { item.date.date().toString().padStart(2, "0") }
                            </p>
                          </div>
                        </div>
                      )
                    })
                  }

                </div>
              )
            })
          }


        </div>

      </div>
    </>
  )
}

const App = () => {
  return (
    <div className="app">
      <Calendar />
    </div>
  )
}

export default App