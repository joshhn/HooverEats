import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Matching.module.css";
import Popup from "../../components/Popup/Popup";
import axios from "axios";

export default function Profile() {
  const {
    user: { info, idToken },
  } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("Hi! I would like to connect");
  const [otherUser, setOtherUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userMatching, setUserMatching] = useState(null);

  console.log(idToken);
  console.log(userInfo);

  useEffect(() => {
    const test = async () => {
      setUserInfo(
        (
          await axios.get("https://twiki.csc.depauw.edu/api/profile", {
            headers: {
              authorization: idToken,
            },
          })
        ).data
      );
    };
    const getMatching = async () => {
      setUserMatching(
        (
          await axios.get("https://twiki.csc.depauw.edu/api/matching", {
            headers: {
              authorization: idToken,
            },
          })
        ).data
      );
    };
    getMatching();
    test();
  }, []);
  //
  // const onChange = (e) => {
  //   if (e.target.checked) setUserInfo({ ...userInfo, type: e.target.value });
  // };
  const getReason = (reason) => {
    return reason.gradYear + " " + reason.majors.toString() + " " + reason.hobbies.toString();
  }
  const openPopup = (matching) => {
    setIsOpen(true);
    setPopupMessage("Hi! I would like to connect");
    setOtherUser(matching.user);
  }
  const changePopupMessage = (e) => {
    setPopupMessage(e.target.value);
  }
console.log(userMatching);
  return (
    <div>
      {userMatching?.map((matching) => {
        return <div className={styles.profile__bio} onClick={() => openPopup(matching)}>{matching.user.name} {getReason(matching.reason)}</div>
      })}
      {isOpen && <Popup
        content={<>
          <b>Send a message to {otherUser.name}!</b><br/>
          <input type="text" id="message" name="message" value={popupMessage} onChange={changePopupMessage}/>
          <button>Send</button>
        </>}
        handleClose={() => setIsOpen(false)}
      />}
    </div>
  );
}
