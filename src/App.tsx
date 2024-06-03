// @ts-nocheck

import { useState } from "react"
import "./App.css"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")

const Calendar = () => {
  const [ date, setDate ] = useState(moment())  

  const addMonth = () => {
    setDate((oldDate) => oldDate.clone().add({ month: 1 }))
  }

  const removeMonth = () => {
    setDate((oldDate) => oldDate.clone().subtract({ month: 1 }))
  }


  const days = [
    "Su", "Ma", "Ti", "Ke",
    "To", "Pe", "La",
  ]

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

  console.timeEnd("items") 

  return (

    <>
      
      <p>{ date.format("MMMM YYYY") }</p>

      <div className="nav">
        <button onClick={() => setDate(moment())}>{"current"}</button>
        <button onClick={removeMonth}>{"previous"}</button>
        <button onClick={addMonth}>{"next"}</button>
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
        <div className="calendar__days">
          {
            items.map((item) => (
              <div className={`calendar__day ${item.currentMonth ? "" : "grayed"}`}>
                <p className={`day__number ${ item.date.isSame(today, "day") ? "today" : "" }`}>
                  { item.date.date().toString().padStart(2, "0") }
                </p>
              </div>
            ))
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