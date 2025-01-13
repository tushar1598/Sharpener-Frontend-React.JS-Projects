import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Compose.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:9000");

const Compose = () => {
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState({
    from: user.email,
    to: "",
    subject: "",
    body: "",
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    const rawContent = convertToRaw(state.getCurrentContent());
    const bodyHTML = draftToHtml(rawContent);
    setEmail({ ...email, body: bodyHTML });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      socket.emit("send-email", email);
      toast.success("Email Has Been Sent Successfully!!");
      setEmail({ from: user.email, to: "", subject: "", body: "" });
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      toast.error("Failed to send email");
      setEmail({ from: user.email, to: "", subject: "", body: "" });
      setEditorState(EditorState.createEmpty());
    }
  };

  return (
    <>
      <form className="mail-box-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="to"
          placeholder="To"
          value={email.to}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={email.subject}
          onChange={handleChange}
          required
        />
        <Editor
          editorState={editorState}
          toolbarClassName="editToolbar"
          wrapperClassName="editWrapper"
          editorClassName="editEditor"
          onEditorStateChange={handleEditorChange}
          placeholder="Start Composing from Here"
        />
        <input type="submit" value="Send Mail" />
      </form>
    </>
  );
};

export default Compose;
