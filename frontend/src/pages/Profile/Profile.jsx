import {useContext, useEffect, useState} from "react";
import {signOut} from "../../firebase";
import {AuthContext} from "../../contexts/AuthContext";
import {Redirect} from "react-router";
import axios from "axios";
import styles from "./Profile.module.css";

export default function Profile() {
  const {
    user: {info, idToken},
  } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);

  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Faculty']

  const priorities = ['','Normal', 'Good', 'Important']

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const majors = ['Actuarial Science', 'Africana Studies', 'Anthropology', 'Art History', 'Asian Studies',
    'Biochemistry', 'Biology', 'Cellular and Molecular Biology', 'Chemistry', 'Chinese Studies',
    'Classical Civilization', 'Communication', 'Computer Science', 'Earth Science', 'Economics', 'Education Studies',
    'English (Literature)', 'English (Writing)', 'Environmental Biology', 'Environmental Geoscience', 'Film Studies',
    'Geology', 'German', 'German Studies', 'Global French Studies', 'Global Health', 'Greek', 'Hispanic Studies',
    'History', 'Independent Interdisciplinary', 'Italian Cultural Studies', 'Japanese Studies', 'Kinesiology', 'Latin',
    'Mathematics', 'Music/School of Music', 'Neuroscience', 'Peace and Conflict Studies', 'Philosophy', 'Physics',
    'Political Science', 'Pre-engineering', 'Psychology', 'Religious Studies', 'Romance Languages', 'Sociology',
    'Studio Art', 'Theatre', "Women's, Gender, and Sexuality Studies"]

  const hobbies = ['Writing', 'Reading', 'Photography', 'Sports', 'Drawing', 'Cooking',
    'DIY', 'Coding', 'Content Creation', 'Dancing', 'Meditation', 'Languages', 'Music',
    'Volunteering']

  useEffect(() => {
    const getUserInfo = async () => {
      setUserInfo(
        (
          await axios.get("https://twiki.csc.depauw.edu:5000/profile", {
            headers: {
              authorization: idToken,
            },
          })
        ).data
      );
    };

    getUserInfo();
  }, []);

  const postUserInfo = async () => {
    await axios.post("https://twiki.csc.depauw.edu:5000/profile/update",
      userInfo,
      {
        headers: {
          authorization: idToken,
        },
      })
  }

  const onPriorityChange = (e) => {
    const userPriorities = userInfo?.priorities;
    if (e.target.id === "prefYear") {
      userPriorities[0] = e.target.value;
    } else if (e.target.id === "prefMajor") {
      userPriorities[1] = e.target.value;
    } else if (e.target.id === "hobby") {
      userPriorities[2] = e.target.value;
    }
    setUserInfo({...userInfo, priorities: userPriorities});
  };

  const getPriority = (type) => {
    if (type === "prefYear") {
      return userInfo?.priorities[0];
    } else if (type === "prefMajor") {
      return userInfo?.priorities[1];
    } else if (type === "hobby") {
      return userInfo?.priorities[2];
    }
  };

  const onTypeChange = (e) => {
    if (e.target.checked) setUserInfo({...userInfo, type: e.target.value});
  };

  const numericYearCollegeYearConvert = (year, numeric) => { //Map number year to
    if (year === -1) return "Faculty";
    if (year === "Faculty") return -1;
    if (numeric) {
      if (currentMonth > 6) {
        return years[3 - (year - currentYear - 1)];
      } else {
        return years[3 - (year - currentYear)];
      }
    } else {
      let index = years.indexOf(year);
      if (currentMonth > 6) {
        return (3 - index + currentYear + 1);
      } else {
        return (3 - index + currentYear);
      }
    }
  }
  const addPreference = (e) => {
    if (e.target.id === "prefYear") {
      const prefYears = userInfo.prefYear??Array();
      const yearValue = numericYearCollegeYearConvert(e.target.value, false);
      if (!prefYears.includes(yearValue)) {
        prefYears.push(yearValue);
      }
      setUserInfo({...userInfo, prefYear: prefYears});
    } else if (e.target.id === "prefMajor") {
      const prefMajors = userInfo.prefMajor??Array();
      if (!prefMajors.includes(e.target.value)) {
        prefMajors.push(e.target.value);
      }
      setUserInfo({...userInfo, prefMajor: prefMajors});
    } else if (e.target.id === "hobby") {
      const userHobbies = userInfo.hobbies??Array();
      if (!userHobbies.includes(e.target.value)) {
        userHobbies.push(e.target.value);
      }
      setUserInfo({...userInfo, hobbies: userHobbies});
    }

  }
  const removePreference = (e) => {
    if (e.target.id === "prefYear") {
      const prefYears = userInfo.prefYear;
      const yearValue = numericYearCollegeYearConvert(e.currentTarget.textContent, false);
      const index = prefYears.indexOf(yearValue);
      if (index !== -1) {
        prefYears.splice(index, 1);
      }
      setUserInfo({...userInfo, prefYear: prefYears});
    } else if (e.target.id === "prefMajor") {
      const prefMajors = userInfo.prefMajor;
      const index = prefMajors.indexOf(e.currentTarget.textContent);
      if (index !== -1) {
        prefMajors.splice(index, 1);
      }
      setUserInfo({...userInfo, prefMajor: prefMajors});
    } else if (e.target.id === "hobby") {
      const userHobbies = userInfo.hobbies??Array();
      const index = userHobbies.indexOf(e.currentTarget.textContent);
      if (index !== -1) {
        userHobbies.splice(index, 1);
      }
      setUserInfo({...userInfo, hobby: userHobbies});
    }
  }

  console.log(userInfo)
  if (!info) return <Redirect to="/"/>;
  return (
    <div>
      <div className={styles.profile}>
        <div className={styles.profile__avatar}>
          <img src={info.photo} alt=""/>
          <p className={styles.profile__badge}>
            {userInfo?.gradYear ? "STUDENT" : "FACULTY"}
          </p>
        </div>
        <div className={styles.profile__bio}>
          <h1>{userInfo?.name}</h1>
          <div className={styles.profile__info}>
            <p>
              Class: <span>{userInfo?.gradYear}</span>
            </p>
            <p>
              Major: <span>{userInfo?.major || "Undefined"}</span>
            </p>
          </div>
          <div className={styles.profile__status}>
            <p>Current Status: </p>
            <div>
              <input
                type="radio"
                id="giver"
                name="status"
                value="GIVER"
                checked={userInfo?.type === "GIVER"}
                onChange={onTypeChange}
              />
              <label htmlFor="giver">Giver</label>
            </div>
            <div>
              <input
                type="radio"
                id="receiver"
                name="status"
                value="RECEIVER"
                checked={userInfo?.type === "RECEIVER"}
                onChange={onTypeChange}
              />
              <label htmlFor="receiver">Receiver</label>
            </div>
            <div>
              <input
                type="radio"
                id="neither"
                name="status"
                value="NEITHER"
                checked={userInfo?.type === "NEITHER"}
                onChange={onTypeChange}
              />
              <label htmlFor="neither">Neither</label>
            </div>
          </div>
          <div>
            <div><h2>Matching Preferences</h2></div>
            <div>(decide who should get your swipe)</div>
          </div>
          <div className={styles.profile__info}>
            {/*PREF YEAR*/}
            <p>Year:</p>
            <input id="prefYear" type="range" min="1" max="3" value={getPriority("prefYear")} onChange={onPriorityChange} step="1"/>
            {userInfo?.prefYear?.map((prefYear) => {
              return <div onClick={removePreference}
                          id="prefYear">{numericYearCollegeYearConvert(prefYear, true)}</div>;
            })}
            <select id="prefYear" onChange={addPreference} value="">
              <option value="" disabled selected hidden>Add Years...</option>
              {years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </select>
            {/*PREF MAJOR*/}
            <p>Major:</p>
            <input id="prefMajor" type="range" min="1" max="3" value={getPriority("prefMajor")} onChange={onPriorityChange} step="1"/>
            {userInfo?.prefMajor?.map((prefMajor) => {
              return <div onClick={removePreference} id="prefMajor">{prefMajor}</div>;
            })}
            <select id="prefMajor" onChange={addPreference} value="">
              <option value="" disabled selected hidden>Add Majors...</option>
              {majors.map((major) => {
                return <option value={major}>{major}</option>;
              })}
            </select>
            {/*PREF HOBBY*/}
            <p>Hobbies</p>
            <input id="hobby" type="range" min="1" max="3" value={getPriority("hobby")} onChange={onPriorityChange} step="1"/>
            {userInfo?.hobbies?.map((hobby) => {
              return <div onClick={removePreference} id="hobby">{hobby}</div>;
            })}
            <select id="hobby" onChange={addPreference} value="">
              <option value="" disabled selected hidden>Add Hobbies...</option>
              {hobbies.map((hobby) => {
                return <option value={hobby}>{hobby}</option>;
              })}
            </select>
          </div>
          <div className={styles.profile__update}>
            <button type="submit" onClick={postUserInfo}>Update My Status</button>
            <p>5 times left</p>
          </div>
        </div>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
