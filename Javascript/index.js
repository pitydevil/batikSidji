/*jshint esversion: 6 */

window.onload = function() {
  alert('new ');

    const useNodeJS = false;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1653715977-2oYaypJa";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
              alert('json error');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        alert('tidak pake id');
    } else {
        alert('masuk idnya');
        alert('function ketrigger');
            if (!liff.isInClient()) {
                sendAlertIfNotInClient();
                alert('tidak di client');
            } else {
                  alert('dalam client');
              liff.sendMessages([{
                  'type': 'text',
                  'text': "You've successfully sent a message! Hooray!"
              }]).then(function() {
                  window.alert('Message sent');
                  alert('message berhasil');
              }).catch(function(error) {
                  alert('message error');
                  window.alert('Error sending message: ' + error);
              });
            }
        initializeLiff(myLiffId);

    }
}

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff.init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api

            initializeApp();
        })
        .catch((err) => {
          alert('error di inisiasi LIFF');
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
      alert('sudah masuk');
    } else {
        alert('error inisiasi APP');
    }
}

function ketrigger() {

}


function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}
