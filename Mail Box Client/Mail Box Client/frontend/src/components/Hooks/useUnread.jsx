import { useState, useEffect } from "react";
import axios from "axios";

const useUnreadEmails = (userEmail) => {
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
  }, [userEmail]);

  return emails;
};

export default useUnreadEmails;
