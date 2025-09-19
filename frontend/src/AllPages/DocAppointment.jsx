import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Import format from date-fns

const DocAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve doctor ID from localStorage (when the doctor logs in)
  const doctorId = localStorage.getItem("doctor_id");
  const doctorName = localStorage.getItem("doctor_name");

  console.log("Doctor ID from localStorage:", doctorId); // Log doctorId to confirm it's correct

  // Fetch appointments for this specific doctor
  useEffect(() => {
    if (!doctorId) return; // If doctorId is not available, skip fetching appointments

    const fetchAppointments = async () => {
      try {
        // Fetch appointments for the doctor using the stored doctor ID
        const response = await fetch(`http://127.0.0.1:8000/api/doctor/${doctorId}/book-appointments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
          },
        });

        const data = await response.json();
        console.log("Fetched appointments:", data); // Log fetched data

        setAppointments(data); // Store the fetched appointments in state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchAppointments(); // Call fetchAppointments when the component mounts
  }, [doctorId]); // Re-run the effect if doctorId changes

  // Render loading state or appointments
  return (
    <div className='container'>
      <h2 className='fw-bold mb-4'>Appointments for Dr. {doctorName}</h2>
      {loading ? (
        <p>Loading appointments...</p> // Show while appointments are loading
      ) : (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patient_name}</td>
                  <td>
                    {format(new Date(appointment.appointment_date), "MMMM dd, yyyy")} {/* Format the date */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3'>No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DocAppointment;
