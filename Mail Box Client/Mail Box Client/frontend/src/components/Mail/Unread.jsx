import React, { useState } from "react";
import { useSelector } from "react-redux";
import useUnreadEmails from "../Hooks/useUnread";

const Unread = () => {
  const user = useSelector((state) => state.auth.user);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const emails = useUnreadEmails(user.email);

  const onEmailBarClick = (id) => {
    const email = emails.find((email) => email._id === id);
    setSelectedEmail(email);
  };

  return (
    <>
      <div className="inbox-container">
        {selectedEmail ? (
          <div className="email-details">
            <button
              onClick={() => setSelectedEmail(null)}
              className="back-button"
            >
              Back to Inbox
            </button>
            <h2>{selectedEmail.subject}</h2>
            <p>
              <strong>From:</strong> {selectedEmail.from}
            </p>
            <p>
              <strong>To:</strong> {selectedEmail.to}
            </p>
            <p>
              <strong>Time:</strong> {selectedEmail.time}
            </p>
            <div className="email-body">{selectedEmail.body}</div>
          </div>
        ) : (
          <>
            <div className="inbox-header">
              <h2>Unread Mails</h2>
            </div>
            <div className="email-list">
              {emails
                .filter((email) => email.isRead === "false")
                .map((email) => (
                  <div
                    onClick={() => onEmailBarClick(email._id)}
                    key={email._id}
                    className={`email-item ${
                      selectedEmail === email.email ? "selected" : ""
                    }`}
                  >
                    <div className="email-info">
                      <p className="email-subject">{email.subject}</p>
                    </div>
                    <div className="email-time">{email.time}</div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Unread;
