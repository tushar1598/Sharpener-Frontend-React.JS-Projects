import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Sent.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSent from "../Hooks/useSent";

const Sent = () => {
  const user = useSelector((state) => state.auth.user);
  const { emails, setEmails } = useSent(user.email);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  const onEmailBarClick = (id) => {
    const email = emails.find((email) => email._id === id);
    setSelectedEmail(email);
  };

  const onRadioSelect = (id) => {
    setSelectedEmailId(id);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.put(`http://localhost:9000/emails/delete-sent-box/${id}`);
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
              Back to Sent Box
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
              <h2>Sent Box</h2>
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

export default Sent;
