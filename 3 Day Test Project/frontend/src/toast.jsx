import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        style={{ top: "70px", height: "50px" }}
        autoClose={2500}
      />
    </>
  );
}

export default Toast;
