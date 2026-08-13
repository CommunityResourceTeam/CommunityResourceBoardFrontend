import React, { useEffect, useState } from 'react';
import MessagesDisplay from '../components/MessagesDisplay';
import MessageForm from '../components/MessageForm';
import AccountManagement from '../components/AccountManagement';

import './App.css';
import LogoImage from '../secret-messages-logo.png';
import MessagesContext from '../contexts/MessagesContext';
import AccountContext from '../contexts/AccountContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Proxy Component Imports
import CRBSlider from '../components/CRBSlider';
import CRBDatePicker from '../components/CRBDatePicker';
import CRBGrid from '../components/CRBGrid';
import CRBTagSelect from '../components/CRBTagSelect';
import CRBTagPicker from '../components/CRBTagPicker';
import CRBDateTimePicker from '../components/CRBDateTimePicker';
import CRBTimePicker from '../components/CRBTimePicker';
import CRBProfileUpload from '../components/CRBProfileUpload';
import CRBPopUpBox from '../components/CRBPopUpBox';
import CRBMenu from '../components/CRBMenu';
import CRBPostCondensed from '../components/CRBPostCondensed';
import CRBButtonPrimary from '../components/CRBButtonPrimary';
import CRBButtonSecondary from '../components/CRBButtonSecondary';
import CRBAccountCondensed from '../components/CRBAccountMenu';
import CRBCheckBox from '../components/CRBCheckBox';
import CRBProfile from '../components/CRBProfile';
import CRBDialog from '../components/CRBDialog';
import CRBReportMenu from '../components/CRBReportMenu';
import CRBPasswordInput from '../components/CRBPasswordInput';
import CRBEmailInput from '../components/CRBEmailInput';
import CRBZipCodeInput from '../components/CRBZipCodeInput';

const hostURL = ((process.env.NODE_ENV === "production")
                ? "https://cfa-summer26-l10-weihua-api.onrender.com"
                : "https://127.0.0.1:3002");

const apiSignup = hostURL+ "/signup";
const apiLogin = hostURL+ "/login";
const apiLogout = hostURL+ "/logout";
const apiPostNew = hostURL+ "/message";
const apiGetAll = hostURL+ "/";
const apiUpdateOne = hostURL+ "/message/";
const apiDeleteOne = hostURL+ "/message/";

const postSignupParams = {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  credentials: 'include'
};
const postLoginParams = {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  credentials: 'include'
};
const postLogoutParams = {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  credentials: 'include'
};
const postNewParams = {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  credentials: 'include'
};
const getAllParams = {
  method: 'GET',
  credentials: 'include'
}
const updateOneParams = {
  headers: { 'Content-Type': 'application/json' },
  method: 'PATCH',
  credentials: 'include'
};
const deleteOneParams = {
  method: 'DELETE',
  credentials: 'include'
};

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [messages, showMessages] = useState([]);
  const [isSecret, setSecret] = useState(false);

  async function signupUser(user) {
    try {
      const postSignupParamsWithBody = {
        ...postSignupParams,
        body: JSON.stringify(user)
      };

      const response = await fetch(apiSignup, postSignupParamsWithBody);
      if (response.status === 201) {
        setLoggedInUser(user.username);
        saveLocalAccountData(user.username);

        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  async function loginUser(user) {
    try {
      const postLoginParamsWithBody = {
        ...postLoginParams,
        body: JSON.stringify(user)
      };

      const response = await fetch(apiLogin, postLoginParamsWithBody);
      if (response.status === 200) {
        setLoggedInUser(user.username);
        saveLocalAccountData(user.username);

        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  async function logoutUser() {
    try {
      const response = await fetch(apiLogout, postLogoutParams);
      if (response.status === 200) {
        setLoggedInUser("");
        clearLocalAccountData();

        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  function loadLocalAccountData() {
    const username = localStorage.getItem("username");
    if (username !== null) {
      setLoggedInUser(username);
    }
  }

  function saveLocalAccountData(username) {
    localStorage.setItem("username", username);
  }

  function clearLocalAccountData() {
    localStorage.removeItem("username");
  }

  async function newMessage(message) {
    try {
      message.date = (new Date()).toISOString();

      const postNewParamsWithBody = {
        ...postNewParams,
        body: JSON.stringify(message)
      };

      const response = await fetch(apiPostNew, postNewParamsWithBody);
      if (response.status === 201) {
        if (message.secret === isSecret) {
          showMessages([message, ...messages]);  
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getMessages(isSecret) {
    try {
      const response = await fetch(apiGetAll + isSecret, getAllParams);
      if (response.status === 200) {
        let receivedMessages = await response.json();
        showMessages(receivedMessages);
        setSecret(JSON.parse(isSecret));
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function updateMessage(messageId, newMessage) {
    try {
      const now = (new Date()).toISOString();

      const response = await fetch(apiUpdateOne + messageId, {
        ...updateOneParams,
        body: JSON.stringify({
          message: newMessage,
          date: now
        })
      });
      if (response.status === 200) {
        const message = messages.find(message => message._id === messageId);
        message.message = newMessage;
        message.date = now;
        showMessages([...messages]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteMessage(messageId) {
    try {
      const response = await fetch(apiDeleteOne + messageId, deleteOneParams);
      if (response.status === 200) {
        const messageIndex = messages.findIndex(message => message._id === messageId);
        messages.splice(messageIndex, 1);
        showMessages([...messages]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (props.secrets === true) {
      if (loggedInUser !== "") {
        getMessages("true");
      }
    }
    else {
      getMessages("false");
    }
  }, [props, loggedInUser]); // This will activate any time App itself gets re-rendered

  useEffect(() => {
    loadLocalAccountData();
  }, []);

  return (
    <AccountContext.Provider value={{loggedInUser, signupUser, loginUser, logoutUser}}>
      <MessagesContext.Provider value={{messages, newMessage, getMessages, updateMessage, deleteMessage}}>
        <section className="sketch-container">    

          <header className="sketch-header">
              <h1>Welcome to ResourceNest!</h1>
          </header>

          <section className="sketch-tags-section">
            <p className="section-label">Tags</p>
            <nav className="tags-column">
              <CRBTagSelect />
              <CRBTagPicker />
            </nav>
            <button type="button" className="more-tags-btn">More Tags</button>
          </section>

          <section className="sketch-search-section">
            <label htmlFor="homepage-search" className="sr-only">Search Posts</label>
            <input 
              id="homepage-search"
              type="text" 
              placeholder="Search Bar" 
              className="search-input" 
            />
          </section>

          <nav className="explore-header" aria-label="Explore actions">
            <CRBButtonPrimary />
          </nav>
          /* Post Grid */

          <main className="sketch-post-grid">
            
          </main>
          <footer className="utility-bar">
            <CRBDialog />
          </footer>
        </section>

      </MessagesContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
