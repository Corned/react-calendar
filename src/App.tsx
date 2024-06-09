// @ts-nocheck

import { useState } from "react"
import "./App.css"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")

const days = [
  "Ma", "Ti", "Ke",
  "To", "Pe", "La", "Su",
]

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
]

const Calendar = () => {
  const [ date, setDate ] = useState(moment())  

  const addMonth = () => {
    setDate((oldDate) => oldDate.clone().add({ month: 1 }))
  }

  const removeMonth = () => {
    setDate((oldDate) => oldDate.clone().subtract({ month: 1 }))
  }



  const columns = 7
  const rows = 6


  const items = []

  const today = moment()
  const lastMonth = date.clone().subtract({ month: 1 })
  const daysInLastMonth = lastMonth.daysInMonth()

  const nextMonth = date.clone().add({ month: 1 })
  const daysInNextMonth = nextMonth.daysInMonth()
 
  const firstDayOfCurrentMonth = moment([ date.year(), date.month(), 1 ]).day() - 1

  console.time("items")
  


  // Previous month
  for (let dayNumber = (daysInLastMonth - firstDayOfCurrentMonth); dayNumber < daysInLastMonth; dayNumber++) {
    items.push({
      date: moment([ lastMonth.year(), lastMonth.month(), dayNumber + 1 ]),
      current: false,
    })
  }

  // Current month
  for (let dayNumber = 1; dayNumber <= date.daysInMonth(); dayNumber++) {
    items.push({
      date: moment([ date.year(), date.month(), dayNumber ]),
      currentMonth: true,
    })
  }
  
  // Next month
  const daysInPreviousAndCurrent = items.length
  for (let dayNumber = items.length; dayNumber < rows * columns; dayNumber++) {
    items.push({
      date: moment([ nextMonth.year(), nextMonth.month(), dayNumber - daysInPreviousAndCurrent + 1 ]),
      currentMonth: false,
    })
  }

  const a = mockData.map((data) => {
    const startingColumn = data.start.day() - 1
    const startingRow = Math.floor(items.findIndex((item) => item.date.isSame(data.start, "day")) / 7)
    const columnsOccupied = data.end.diff(data.start, "days") + 1
    const rowsOccupied = Math.ceil((columnsOccupied + data.start.day()) / columns)

    const elements = []

    let currentColumn = startingColumn
    let currentRow = startingRow
    let cellsToVisit = columnsOccupied
    let creatingLabel = true

    let from = currentColumn

    while (cellsToVisit > 0) {
      creatingLabel = true
      currentColumn++
      cellsToVisit--

      if (currentColumn === columns) {

        elements.push({
          element: (      
            <div
              className={`data ${elements.length === 0 ? "first" : ""} ${cellsToVisit === 0 ? "last" : ""}`}
              style={{ gridColumn: `${from + 1} / ${ currentColumn + 1 }`, gridRow: "auto" }}
            >
              <p>{ data.label }</p>
            </div>
          ),
          row: currentRow,
        })
        
        currentColumn = 0
        currentRow++
        creatingLabel = false
        from = 0
      }
      
    }

    if (creatingLabel) {
      elements.push({
        element: (      
          <div
            className={`data ${elements.length === 0 ? "first" : ""} last`}
            style={{ gridColumn: `${from + 1} / ${ currentColumn + 1 }`, gridRow: "auto" }}
          >
            <p>{ data.label }</p>
          </div>
        ),
        row: currentRow,
      })
    }
        
    return elements
  })
 
  

  console.timeEnd("items") 

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
              <div className="calendar__header-title">
                <p>{ day }</p>
              </div>
            ))
          }
        </div>
        <div className="calendar__body">

          {
            Array.from({ length: 6 }).map((_, week) => {
              return (
                <div className="calendar__week">
                  <div className="calendar__task-container">
                    {
                      a.flat().map((data) => {
                        return data.row === week && data.element
                      })
                    }
                  </div>

                  {
                    Array.from({ length: 7 }).map((_, day) => {
                      const item = items[7 * week + day]
                      
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