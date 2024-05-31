import "./App.css"

const Calendar = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const dayOfWeek = date.getDay()

  console.log({ year, month });

  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ]

  const getNumberOfDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate()

  const getFirstDayOfMonth = (year, month) =>
    new Date(year, month, 1).getDay()

  const getLastDayOfMonth = (year, month) =>
    new Date(year, month, 0).getDay()

  
    
  console.log( new Date(year, month + 1, 0).getDay() )
  console.log( new Date(year, month + 1, 0).getMonth() )


  
  const daysInCurrentMonth = getNumberOfDaysInMonth(year, month)
  const firstDayOfCurrentMonth = days[getFirstDayOfMonth(year, month)]
  const lastDayOfCurrentMonth = days[getLastDayOfMonth(year, month)]

  console.log({ daysInCurrentMonth, firstDayOfCurrentMonth, lastDayOfCurrentMonth });
  
    


  return (
    <div className="calendar">
      <p>{ year }, { month }, { day }, { dayOfWeek }</p>

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



      </div>

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