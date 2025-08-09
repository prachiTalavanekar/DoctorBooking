import React, { useEffect, useState } from 'react'

const BookingTime = ({ docInfo }) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const getAvailableSlots = async () => {
    setDocSlots([])

    // getting current date
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        //add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        //increament current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])

  return (
    // booking slots
    <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700 mt-4'>
      <p>Booking slots</p>
      <div className='flex gap-3 intems-center w-full overflow-x-scroll mt-4'>
        {
          docSlots.length && docSlots.map((item, index) => {
            return <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#7dd1b3] text-gray-800' : 'border border-gray-200 text-gray-500'}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          })
        }
      </div>
      <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlots.length && docSlots[slotIndex].map((item,index)=>{
          return  <p  onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-2 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#7dd1b3] text-gray-800' : 'text-gray-400 border border-gray-300'} `} key={index}>
            {item.time.toLowerCase()}
          </p>
        })}
      </div>
      <button className='bg-[#7dd1b3] text-gray-900 text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
    </div>
  )
}





export default BookingTime