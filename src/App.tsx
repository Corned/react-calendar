import { useState } from "react"
import "./App.css"

import moment from "moment"

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

  // 


  const lastMonth = date.clone().subtract({ month: 1 })
  const daysInLastMonth = lastMonth.daysInMonth()

  const nextMonth = date.clone().subtract({ month: 1 })
  const daysInNextMonth = nextMonth.daysInMonth()
  
  const firstDayOfCurrentMonth = moment([ date.year(), date.month(), 1 ]).day()
  


  for (let dayNumber = (daysInLastMonth - firstDayOfCurrentMonth); dayNumber < daysInLastMonth; dayNumber++) {
    items.push({
      dayNumber: dayNumber + 1,
      current: false,
    })
  }

  for (let dayNumber = 1; dayNumber <= date.daysInMonth(); dayNumber++) {
    items.push({
      dayNumber,
      currentMonth: true,
    })
  }
  
  let i = 0
  while (items.length < rows * columns) {
    i++
    items.push({
      dayNumber: i,
      currentMonth: false,
    })
  }



  return (

    <>
      
      <p>{ date.format("MM/YYYY") }</p>

      <button onClick={removeMonth}>{"<-"}</button>
      <button onClick={addMonth}>{"->"}</button>
      

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
                <p className="day__number">{ item.dayNumber.toString().padStart(2, "0") }</p>
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
      <h1>Calendar</h1>



      <Calendar />
    </div>
  )
}

export default App