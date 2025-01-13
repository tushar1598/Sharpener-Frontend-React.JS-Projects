import { useState, useEffect } from "react";
import axios from "axios";

const useSent = (userEmail) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/emails/fetch-sent-email/?email=${userEmail}`
        );
        setEmails(res.data.emails);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmails();
  }, [userEmail]);

  return { emails, setEmails };
};

export default useSent;
