import { useState } from "react"
import "./App.css"

const date = new Date()
const year = date.getFullYear()
//const month = date.getMonth() + 1 // JavaScript months are index-based.
const day = date.getDate()
const dayOfWeek = date.getDay()

const Calendar = () => {
  const [ month, setMonth ] = useState(date.getMonth() + 1)

  const rows = 6
  const cols = 7

  console.log({ year, month });

  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ]

  const getNumberOfDaysInMonth = (year, month) =>
    new Date(year, month, 0).getDate()

  const getFirstDayOfMonth = (year, month) =>
    new Date(year, month - 1, 1).getDay()

  const getLastDayOfMonth = (year, month) =>
    new Date(year, month, 0).getDay()
  
  const dateString = date.toLocaleDateString()
  const daysInCurrentMonth = getNumberOfDaysInMonth(year, month)
  const firstDayOfCurrentMonth = days[getFirstDayOfMonth(year, month)]
  const lastDayOfCurrentMonth = days[getLastDayOfMonth(year, month)]

  console.log({ dateString, daysInCurrentMonth, firstDayOfCurrentMonth, lastDayOfCurrentMonth });

  const daysBefore = getFirstDayOfMonth(year, month)  
    
  const items = []

  while (items.length < getFirstDayOfMonth(year, month)) {
    items.push({ x: -1 })
  }



  for (let i = 0; i < daysInCurrentMonth; i++) {
    items.push({ x: i  + 1 })
  }


  while (items.length < rows * cols) {
    items.push({ x: -1 })
  }


  return (
    <div className="calendar">
      <p>{ date.toLocaleDateString() }</p>

      <div className="calendar__header">
        <div className="calendar__header-title">
          <p>Sunday</p>
        </div>
        <div className="calendar__header-title">
          <p>Monday</p>
        </div>
        <div className="calendar__header-title">
          <p>Tuesday</p>
        </div>
        <div className="calendar__header-title">
          <p>Wednesday</p>
        </div>
        <div className="calendar__header-title">
          <p>Thursday</p>
        </div>
        <div className="calendar__header-title">
          <p>Friday</p>
        </div>
        <div className="calendar__header-title">
          <p>Saturday</p>
        </div>
      </div>
      <div className="calendar__days">

        {
          items.map((a) => {
            return (
              <div className={a.x < 0 ? "grayed" : "normal"}>
                <p>{ a.x }</p>
              </div>
            )
          })
        }

      </div>

      <button onClick={() => setMonth(month - 1)}>{"<-"}</button>
      <button onClick={() => setMonth(month + 1)}>{"->"}</button>

    </div>
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