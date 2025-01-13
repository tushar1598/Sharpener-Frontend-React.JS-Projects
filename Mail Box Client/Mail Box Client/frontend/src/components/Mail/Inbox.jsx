import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Inbox.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useInbox from "../Hooks/useInbox";

const Inbox = () => {
  const user = useSelector((state) => state.auth.user);
  const { emails, setEmails } = useInbox(user.email);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  const onEmailBarClick = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:9000/emails/mark-as-read/${id}`,
        {
          isRead: true,
        }
      );
      const updatedEmail = res.data.email;
      const updatedEmails = emails.map((email) =>
        email._id === updatedEmail._id ? updatedEmail : email
      );
      setEmails(updatedEmails);
      setSelectedEmail(updatedEmail);
    } catch (err) {
      console.log(err);
    }
  };

  const onRadioSelect = (id) => {
    setSelectedEmailId(id);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.put(`http://localhost:9000/emails/delete-inbox/${id}`);
      const updatedEmails = emails.filter((email) => email._id !== id);
      setEmails(updatedEmails);
      toast.success("Email Has Been Deleted Successfully!!");
    } catch (err) {
      console.log(err);
    }
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
              <h2>Inbox</h2>
            </div>
            <div className="email-list">
              {emails.map((email) => (
                <div
                  onClick={() => onEmailBarClick(email._id)}
                  key={email._id}
                  className={`email-item ${
                    selectedEmail === email.email ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="emailSelect"
                    className="email-radio"
                    checked={selectedEmailId === email._id}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => onRadioSelect(email._id)}
                  />
                  {email.isRead === "false" && (
                    <span className="blue-dot">•</span>
                  )}
                  <div className="email-info">
                    <p className="email-subject">{email.subject}</p>
                  </div>
                  <div className="email-time">{email.time}</div>
                  <button
                    onClick={(e) => handleDelete(email._id, e)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Inbox;
