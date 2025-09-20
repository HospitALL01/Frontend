import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Notification() {
  const notifications = [
    { id: 1, text: "Chad Lui sent you a video", time: "Just now" },
    { id: 2, text: "Sarah Roberts sent you a GIF", time: "1 hour ago" },
    {
      id: 3,
      text: "Watch your upcoming lesson in Spanish Vocabulary",
      time: "1 hour ago",
    },
    {
      id: 4,
      text: "Congratulations, you’ve completed your course with Chad Lui 🎉",
      time: "2 hours ago",
    },
    {
      id: 5,
      text: "Aishat Yusuf replied to your comment in the Physics Enthusiast Forum",
      time: "3 hours ago",
    },
  ];

  return (
    <div
      className="card shadow-lg"
      style={{
        width: "350px",
        position: "absolute",
        top: "60px",
        right: "20px",
        zIndex: 10,
      }}
    >
      <div className="card-header bg-primary text-white">
        <h5>Notifications</h5>
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="d-flex justify-content-between align-items-center py-2"
            >
              <p className="mb-0">{notification.text}</p>
              <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                {notification.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notification;
