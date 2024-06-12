// @ts-nocheck

import { useState } from "react"
import "./App.css"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")

const mockData = [
  {
    startDate: moment([2024, 5, 4]),
    endDate: moment([2024, 5, 10]),
    startTime: "9:00",
    endTime: "15:00",
    label: "Mathematics 101",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 6]),
    endDate: moment([2024, 5, 13]),
    startTime: "15:15",
    endTime: "16:00",
    label: "Algorithms and Datastructures",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 11]),
    endDate: moment([2024, 5, 15]),
    startTime: "9:00",
    endTime: "12:00",
    label: "Extended Brunch",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 27]),
    endDate: moment([2024, 6, 5]),
    startTime: "9:00",
    endTime: "12:00",
    label: "Schedule Testing",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 18]),
    endDate: moment([2024, 5, 18]),
    startTime: "9:00",
    endTime: "10:00",
    label: "Matematiikka 1",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 18]),
    endDate: moment([2024, 5, 18]),
    startTime: "10:00",
    endTime: "11:00",
    label: "Matematiikka 2",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 18]),
    endDate: moment([2024, 5, 18]),
    startTime: "11:00",
    endTime: "12:00",
    label: "Matematiikka 3",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 18]),
    endDate: moment([2024, 5, 18]),
    startTime: "12:00",
    endTime: "13:00",
    label: "Matematiikka 4",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 17]),
    endDate: moment([2024, 5, 19]),
    startTime: "11:00",
    endTime: "12:00",
    label: "BOOM",
    teacher: "Onni Opettaja",
  },
]

const days = [ "Ma", "Ti", "Ke", "To", "Pe", "La", "Su" ]
const columns = 7
const rows = 6

const Popup = ({ close }) => {
  const handleClose = (event) => {
    event.stopPropagation()    
    close()
  }
  
  return (
    <div className="popup">
      <div className="popup__header">
        <svg className="cross" onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div className="popup__container">
        <div className="day-calendar">
          <div className="day-calendar__time">
            {
              Array.from({ length: 24 }).map((_, index) => {
                return <p>{ index }</p>
              })
            }
          </div>
          <div className="day-calendar__blocks">
            {
              Array.from({ length: 24 }).map((_, index) => {
                return <div></div>
              })
            }
          </div>
        </div>
      </div>

    </div>
  )
}

const Calendar = () => {
  const [ date, setDate ] = useState(moment())
  const [ modal, setModal ] = useState(-1)

  const addMonth = () => {
    setDate((oldDate) => oldDate.clone().add({ month: 1 }))
    setModal(null)
  }

  const removeMonth = () => {
    setDate((oldDate) => oldDate.clone().subtract({ month: 1 }))
    setModal(null)
  }

  const handleModal = (index) => {
    console.log(`handleModal called with value of ${index}`)
    setModal(index)
    console.log(`handleModal finished`)
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
    const startingColumn = data.startDate.day() - 1
    const startingRow = Math.floor(calendarCells.findIndex((item) => item.date.isSame(data.startDate, "day")) / 7)
    const columnsOccupied = data.endDate.diff(data.startDate, "days") + 1
    const rowsOccupied = Math.ceil((columnsOccupied + data.startDate.day()) / columns)

    const blocks = []

    let currentWeek = data.startDate.week()
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
              <p>{ `${data.startTime} ${data.label}` }</p>
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
            <p>{ `${data.startTime} ${data.label}` }</p>
          </div>
        ),
        week: currentWeek,
      })
    }
        
    return blocks
  }).flat()
  

  return (

    <>      
      <div className="calendar-wrapper">
        <div className="calendar__controls">
          <p className="calendar__current-date">{ date.format("MMMM YYYY") }</p>

          <div className="nav">
            <button onClick={() => setDate(moment())}>{"Tänään"}</button>
            <button onClick={removeMonth}>{"Edellinen"}</button>
            <button onClick={addMonth}>{"Seuraava"}</button>
          </div>
        </div>

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
                  {
                    Array.from({ length: 7 }).map((_, day) => {
                      const cellIndex = 7 * week + day
                      const item = calendarCells[cellIndex]
                      
                      return (
                        <div
                          key={`cell-${cellIndex}`}
                          className={`calendar__cell ${item.currentMonth ? "" : "grayed"}`}
                          style={{ gridRow: "1 / 3", gridColumn: day + 1 }}
                          onClick={() => handleModal(cellIndex)}
                        >
                          <p className={`calendar__cell-number ${ item.date.isSame(today, "day") ? "today" : "" }`}>
                            { item.date.date().toString().padStart(2, "0") }
                          </p>

                         {
                          cellIndex === modal && <Popup close={() => handleModal(-1)} />
                         }
                        </div>
                      )
                    })
                  }

                  <div className="calendar__block-container">
                    {

                      blocks
                        .filter((data) => data.week === actualWeekNumber)
                        .map((data) => data.element)
                    }
                  </div>

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