import { useEffect, useLayoutEffect, useRef } from "react";

require("./ChatPlaceholder.css");
const ChatPlaceholder = () => {
  const test = useRef(null);
  useEffect(() => {
    const chatPlaceholder = document.querySelector(".chatPlaceholder");
    test.current = chatPlaceholder;
    chatPlaceholder.style.transform = "translateX(0)";
    document.querySelector(".placeholderText").style.transform = "translateY(0)";
  }, []);
  useLayoutEffect(() => {
    return () => {
      setTimeout(() => {
        test.current.style.transform = "translateY(1000px)";
      }, 1000);
      // Your code here.
    };
  }, []);

  return (
    <div className="chatPlaceholder">
      <p className="placeholderText">Débutez une conversation avec le panel de gauche &#128172;</p>
    </div>
  );
};
export default ChatPlaceholder;
