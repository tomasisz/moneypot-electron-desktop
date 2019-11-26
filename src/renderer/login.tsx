 import "../styles/login.css";
declare const ipcRenderer: any;
declare const window: any;
// import x from "../../static/icons/anothericon.png";


// This works- types are ridiculously bad though
window.sourceMapSupport.install();



// // WEBPACK PATHS ARE BUGGED IN PRODUCTION
// // replace this with FA icons
// const elem = document.createElement("img");

// // elem.src = path.join( x);
// elem.src = x;
// elem.setAttribute("height", "50");
// elem.setAttribute("width", "50");
// // elem.setAttribute("alt", "Flower");
// document.getElementById("cauldron")!.appendChild(elem);



function Intro() {
     function off() {
         document.getElementById("overlayinfo")!.style.display = "none";
     }
     function on() {
         document.getElementById("overlayinfo")!.style.display = "block";
     }
     if (localStorage.getItem("IntroButton") === "setTrue") {
         off();
     } else {
         on();
   }
  }
Intro();

document.getElementById("onclick1")!.onclick = () => {
    document.getElementById("overlayinfo")!.style.display = "none";
    localStorage.setItem("IntroButton", "setTrue");
   };

const request = async () => {
     const response = await fetch("https://www.moneypot.com/latest-version/latest-version.json");
     // {}     const json = await response.json();

     const json = await response.json();

     const key = "versionScript";
     const value = Object.values(json)[Object.keys(json).indexOf(key)];
     if (value !== localStorage.getItem("MoneypotURL")) {
         toasterx();
              } else if (value === localStorage.getItem("MoneypotURL")) {
        toastery();
     }
   };
request();




document.getElementById("displayurl")!.onclick = () => {
    document.getElementById("url")!.innerHTML = thisURL!;
    document.getElementById("hash")!.innerHTML = MainHash!;
    const q = document.getElementById("hideurl");
    // q!.className = q!.className.replace("", "show");

    if (q!.className === "") {
       q!.className = q!.className.replace("", "show");
      } else if (q!.className === "show") {
         q!.className = q!.className.replace("show", "");
      }
    // const button = document.getElementById("displayurl");
    // button!.className = button!.className.replace("", "hide");
    // remove the button onclick
    // fix the hash placements
    // add new icon
    // clean css
};

    // create onclick function for button
document.getElementById("submit")!.onclick =  () => {
        // get values from each form field
        const url = (document.getElementById("moneypoturl") as HTMLInputElement).value;
        localStorage.setItem("MoneypotURL", (url));
    };


const thisURL = localStorage.getItem("MoneypotURL");
// document.getElementById("insert")!.innerHTML = thisURL!;

const arr = thisURL!.split("#");
const Mainscript = arr.shift(); // or arr[arr.length-1];
localStorage.setItem("MainscriptURL", (Mainscript)!);
const MainHash = arr.pop(); // or arr[0];
localStorage.setItem("MainHash", (MainHash)!);
// document.getElementById("ThisMainHash")!.innerHTML = MainHash!;






// we close the browserwindow and open the app?!
// document.getelementbyid could replace the listener. I don't know which is better.
const closebtn = document.getElementById("closebtn");

closebtn!.addEventListener("click", (e) => {
    // add a new toaster here
    if (l === 32) {ipcRenderer.send("request-mainprocess-action")  ;
                   window.close();
                   e.preventDefault();
      }}  );



//   const byteLength = parseInt((length).replace(/=/g, "")!.length * 0.75,);
const byteLength = MainHash!.replace(/=/g, "").length * 0.75;
const l = Math.floor(byteLength);

  // We use the makeshift bytelength function ?
function uglytoaster() {
    // this might generate a number of invalid hashes. Need to redo the Bytelength function ASAP!!!
    if (l === 32) {
       const x = document.getElementById("toaster2");
       x!.className = "show";
       setTimeout( () => {
            x!.className = x!.className.replace("show", "hide");
        }, 2900);
       return;
    } else {
        const y = document.getElementById("toaster");
        y!.className = "show";
        setTimeout( () => {
            y!.className = y!.className.replace("show", "hide");
        }, 2900);
        return;
    }
  }

uglytoaster();

function toasterx() {
    const x = document.getElementById("toaster3");
    x!.className = "show";
    setTimeout( () => {
        x!.className = x!.className.replace("show", "");
    }, 5900);
  }

function toastery() {
    const x = document.getElementById("toaster4");
    x!.className = "show";
    setTimeout( () => {
        x!.className = x!.className.replace("show", "");
    }, 5900);
  }

// function setdialogLinux() {
//     if (process.platform === "win32") {
//         if(localStorage.getItem('TorLinux') === "true") {
//             return
//         } else {
//             localStorage.setItem('TorLinux', "false")
//         }
//     }
// }
// setdialogLinux();


