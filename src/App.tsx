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
    start: moment([2024, 5, 2]),
    end: moment([2024, 5, 14]),
    label: "9:00 - 15:00",
    color: "red",
  },
  {
    start: moment([2024, 5, 7]),
    end: moment([2024, 5, 9]),
    label: "15:00 - 16:00",
    color: "blue",
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

  console.timeEnd("items") 

  return (

    <>
      
      <p>{ date.format("MMMM YYYY") }</p>

      <div className="nav">
        <button onClick={() => setDate(moment())}>{"Tänään"}</button>
        <button onClick={removeMonth}>{"Edellinen"}</button>
        <button onClick={addMonth}>{"Seuraava"}</button>
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
      
                          </div>
                        </div>
                      )
                    })
                  }

                </div>
              )
            })
          }





{/*           {
            items.map((item) => (
              <div className={`calendar__day ${item.currentMonth ? "" : "grayed"}`}>
                <div className="calendar__day-header">
                  <p className={`day__number ${ item.date.isSame(today, "day") ? "today" : "" }`}>
                    { item.date.date().toString().padStart(2, "0") }
                  </p>
                </div>

                <div className="data">
                  {
                    mockData.map((data) => {
                      if (item.date.isBetween(data.start, data.end) || item.date.isSame(data.start, "day") || item.date.isSame(data.end, "day") ) {
                        return (
                          <p className={`data__entry ${item.date.isSame(data.start, "day") && "first"} ${item.date.isSame(data.end, "day") && "last"}`} style={{ background: data.color}}>
                            { data.label }
                          </p>
                        )
                      }
                    })
                  }
                </div>
              </div>
            ))
          } */}

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