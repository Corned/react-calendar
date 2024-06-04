// @ts-nocheck

import { useState } from "react"
import "./App.css"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")

const days = [
  "Su", "Ma", "Ti", "Ke",
  "To", "Pe", "La",
]

const mockData = [
  {
    start: moment([2024, 5, 5]),
    end: moment([2024, 5, 8]),
    label: "9:00 - 15:00",
    color: "red",
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
 
  const firstDayOfCurrentMonth = moment([ date.year(), date.month(), 1 ]).day()

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


  const testing = []
  const a = mockData.map((data) => {
    const columnsOccupied = data.end.diff(data.start, "days") + 1
    const rowsOccupied = Math.ceil((columnsOccupied + data.start.day()) / columns)

    console.log({ rowsOccupied, columnsOccupied });
    
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

                  {
                    Array.from({ length: 7 }).map((_, day) => {
                      const item = items[7 * week + day]
                      
                      return (
                        <div className={`calendar__day ${item.currentMonth ? "" : "grayed"}`}>
                          <div className="calendar__day-header">
                            <p className={`calendar__day-number ${ item.date.isSame(today, "day") ? "today" : "" }`}>
                              { item.date.date().toString().padStart(2, "0") }
                            </p>
                          </div>

                          <div className="calendar__day-data">
                            {
                              mockData.map((data) => {

                                const isBetween = item.date.isBetween(data.start, data.end)
                                const isOnFirstDay = item.date.isSame(data.start, "day")
                                const isOnLastDay = item.date.isSame(data.end, "day")
                                
                                if (isBetween || isOnFirstDay || isOnLastDay) {
                                  return (
                                    <div className={`data ${isOnFirstDay && "first-day"} ${isOnLastDay && "last-day"}`}>
                                      <p>{ data.label }</p>
                                    </div>
                                  )
                                }
                              })
                            }
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