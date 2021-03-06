/*jshint esversion: 6 */
window.onload = function() {
    const useNodeJS = false;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1653715977-2oYaypJa";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

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
      keyboardObserver();
    } else {
        alert('Login Line Terlebih Dahulu');
    }
}

function keyboardObserver() {
  document.getElementById('lineButton').addEventListener('click', function() {
      if (!liff.isInClient()) {
          sendAlertIfNotInClient();
      } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Get Your Awesome Batik at BatikSidji, Go ahead contact us at mikhael_adiputra@yahoo.com"
        }]).then(function() {
            window.alert('Message sent');
        }).catch(function(error) {
            alert('message error');
            window.alert('Error sending message: ' + error);
        });
      }
  });
}


function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}
