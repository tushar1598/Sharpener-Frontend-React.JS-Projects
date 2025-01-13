import React, { useState } from "react";
import Compose from "../Mail/Compose";
import Sidebar from "../Mail/Sidebar";
import Inbox from "../Mail/Inbox";
import Sent from "../Mail/Sent";
import Unread from "../Mail/Unread";
import "./Profile.css";

const Profile = () => {
  const [flag, setFlag] = useState(false);
  const [inbox, setInbox] = useState(false);
  const [sent, setSent] = useState(false);
  const [unread, setUnread] = useState(false);

  const onShowTextEditor = () => {
    setFlag(true);
    setInbox(false);
    setSent(false);
    setUnread(false);
  };

  const onShowInbox = () => {
    setInbox(true);
    setFlag(false);
    setSent(false);
    setUnread(false);
  };

  const onShowSent = () => {
    setSent(true);
    setFlag(false);
    setInbox(false);
    setUnread(false);
  };

  const onShowUnread = () => {
    setUnread(true);
    setSent(false);
    setFlag(false);
    setInbox(false);
  };

  return (
    <div id="parent">
      <div id="sidebar">
        <Sidebar
          onShowTextEditor={onShowTextEditor}
          onShowInbox={onShowInbox}
          onShowSent={onShowSent}
          onShowUnread={onShowUnread}
        />
      </div>
      <div id="emails">
        {flag && <Compose />}
        {inbox && <Inbox />}
        {sent && <Sent />}
        {unread && <Unread />}
      </div>
    </div>
  );
};

export default Profile;
