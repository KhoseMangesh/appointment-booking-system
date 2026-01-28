"use client";

import { useState } from "react";

export default function SchedulingPage() { const [name, setName] = useState(""); const [age, setAge] = useState(""); const [date, setDate] = useState(""); const [time, setTime] = useState(""); const [doctor, setDoctor] = useState(""); const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

return ( <div className="min-h-screen bg-white flex items-center justify-center px-4"> <div className="w-full max-w-lg shadow-lg rounded-2xl p-10"> {!submitted ? ( <> <h1 className="text-4xl font-bold text-center mb-8 text-black"> Appointment Booking </h1>

<form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl font-medium mb-2 text-black">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-400 rounded-lg px-4 py-3 text-xl text-black placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2 text-black">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full border border-gray-400 rounded-lg px-4 py-3 text-xl text-black placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2 text-black">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-400 rounded-lg px-4 py-3 text-xl text-black placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2 text-black">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full border border-gray-400 rounded-lg px-4 py-3 text-xl text-black placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2 text-black">Doctor Name</label>
            <input
              type="text"
              placeholder="Enter doctor name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
              className="w-full border border-gray-400 rounded-lg px-4 py-3 text-xl text-black placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full text-xl font-semibold py-4 rounded-lg shadow text-black"
          >
            Confirm Appointment
          </button>
        </form>
      </>
    ) : (
      <div className="text-xl space-y-3 text-black">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">
          Appointment Booked ✅
        </h1>
        <p className="text-black"><strong className="text-black">Patient Name:</strong>  {name}</p>
        <p className="text-black"><strong className="text-black">Patient Age:</strong>  {age}</p>
        <p className="text-black"><strong className="text-black">Date:</strong>  {date}</p>
        <p className="text-black"><strong className="text-black">Time:</strong>  {time}</p>
        <p className="text-black"><strong className="text-black">Doctor Name:</strong>  {doctor}</p>
      </div>
    )}
  </div>
</div>

); }