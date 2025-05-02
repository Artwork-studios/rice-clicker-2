let span = 0;
let database;

setInterval(()=>{
  if (span < 1 ){
    document.getElementById("riceSpan").textContent = "0"
}
},100)




// Function to update the span value and display
function updateSpan() {
  document.getElementById("riceSpan").textContent = span.toString();
}

// Function to increment the variable
function variable() {
  span = span + 1;
  updateSpan();
}

// Function to show the cookie modal
function showCookieModal() {
  document.getElementById("cookieModal").style.display = "block";
}

// Function to hide the cookie modal
function hideCookieModal() {
  document.getElementById("cookieModal").style.display = "none";
}

// Function to open the IndexedDB database
function openDatabase() {
  const dbName = "variableDB";
  const dbVersion = 1;

  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = function(event) {
    console.error("Error opening database:", event.target.error);
  };

  request.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Create an object store to store the variable data
    if (!db.objectStoreNames.contains("variables")) {
      db.createObjectStore("variables", { keyPath: "name" });
    }
  };

  request.onsuccess = function(event) {
    database = event.target.result;
    retrieveVariable();
    console.log("IndexedDB database opened!");
  };
}

// Function to save the variable to IndexedDB
function saveVariable() {
  const transaction = database.transaction("variables", "readwrite");
  const objectStore = transaction.objectStore("variables");

  const variable = { name: "span", value: span };

  const request = objectStore.put(variable);

  request.onsuccess = function(event) {
    console.log("Variable saved to IndexedDB!");
    hideCookieModal();
  };

  request.onerror = function(event) {
    console.error("Error saving variable to IndexedDB:", event.target.error);
  };
}

// Function to retrieve the variable from IndexedDB
function retrieveVariable() {
  const transaction = database.transaction("variables", "readonly");
  const objectStore = transaction.objectStore("variables");

  const request = objectStore.get("span");

  request.onsuccess = function(event) {
    if (request.result) {
      span = request.result.value;
      updateSpan();
      console.log("Variable retrieved from IndexedDB:", span);
    }
  };

  request.onerror = function(event) {
    console.error("Error retrieving variable from IndexedDB:", event.target.error);
  };
}

// Function to handle the "Save Cookies" button click
document.getElementById("saveCookiesBtn").addEventListener("click", saveVariable);

// Function to handle the "Reject Cookies" button click
document.getElementById("rejectCookiesBtn").addEventListener("click", hideCookieModal);

// Function to save the variable before the page unloads
window.addEventListener("beforeunload", function() {
  saveVariable();
});

// Show the cookie modal when the page loads
window.addEventListener("load", function() {
  showCookieModal();
  openDatabase();
});
