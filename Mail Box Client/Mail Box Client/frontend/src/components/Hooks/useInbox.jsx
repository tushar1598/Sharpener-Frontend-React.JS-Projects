import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io("http://localhost:9000");

const useInbox = (userEmail) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/emails/fetch-inbox-email/?email=${userEmail}`
        );
        setEmails(res.data.emails);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmails();

    socket.on("new-inbox-email", (newEmail) => {
      if (newEmail.to === userEmail) {
        setEmails((prevEmails) => [newEmail, ...prevEmails]);
        toast.success("New Email Received!");
      }
    });

    return () => {
      socket.off("new-inbox-email");
    };
  }, [userEmail]);

  return { emails, setEmails };
};

export default useInbox;
