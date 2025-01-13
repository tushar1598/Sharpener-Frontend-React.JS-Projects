import React from "react";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import useSidebar from "../Hooks/useSidebar";

const Sidebar = (props) => {
  const user = useSelector((state) => state.auth.user);
  const emails = useSidebar(user.email);
  const unreadCount = emails.filter((email) => email.isRead === "false").length;

  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <button onClick={props.onShowTextEditor}>Compose</button>
        </div>
        <ul>
          <li>
            <button onClick={props.onShowInbox}>Inbox</button>
          </li>
          <li>
            <button onClick={props.onShowUnread}>Unread({unreadCount})</button>
          </li>
          <li>
            <a href="#">Starred</a>
          </li>
          <li>
            <a href="#">Drafts</a>
          </li>
          <li>
            <button onClick={props.onShowSent}>Sent</button>
          </li>
          <li>
            <a href="#">Archive</a>
          </li>
          <li>
            <a href="#">Spam</a>
          </li>
          <li>
            <a href="#">Deleted Items</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
