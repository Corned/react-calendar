import Calendar from "./Calendar.jsx"
import moment from "moment"

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
    startDate: moment([2024, 5, 17]),
    endDate: moment([2024, 5, 19]),
    startTime: "9:00",
    endTime: "10:00",
    label: "Matematiikka 1",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 19]),
    endDate: moment([2024, 5, 21]),
    startTime: "9:00",
    endTime: "10:00",
    label: "Matematiikka 1",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 19]),
    endDate: moment([2024, 5, 21]),
    startTime: "10:00",
    endTime: "11:00",
    label: "Biologia 2",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 19]),
    endDate: moment([2024, 5, 21]),
    startTime: "11:00",
    endTime: "12:00",
    label: "Uskonto 3",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 19]),
    endDate: moment([2024, 5, 21]),
    startTime: "12:00",
    endTime: "13:00",
    label: "Psykologia 4",
    teacher: "Onni Opettaja",
  },
]

const App = () => {
  return (
    <div className="app">
      <p>ASD</p>
      <Calendar calendarData={mockData}/>
    </div>
  )
}

export default App