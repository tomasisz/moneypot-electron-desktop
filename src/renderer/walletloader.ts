import "../styles/walletloader.scss";
const setURL = localStorage.getItem("MainscriptURL");
const setHash = localStorage.getItem("MainHash");

declare const Mousetrap: any;

// Rename variables if we have multiple checkboxes
const checked = JSON.parse(localStorage.getItem("checkbox1")!);
if (checked === true) {
    (document.getElementById("defaultCheck1")! as HTMLInputElement).checked = true;
  // no toaster
 } else if (checked === false) {
   thistoaster();
 }
document.getElementById("savesettings")!.onclick = () => {
  const Checkbox1 = (document.getElementById("defaultCheck1")! as HTMLInputElement);
  localStorage.setItem("checkbox1", JSON.stringify(Checkbox1.checked));

};



document.getElementById("request")!.onclick = async () => {
    const response = await fetch("https://wtfismyip.com/json");
    // {}
    const json = await response.json();
    let x = JSON.stringify(json, null, "\t");
    x = x.replace('"YourFuckingIPAddress":', '"Your IP Adress":');
    x = x.replace('"YourFuckingHostname":', '"Your Hostname":');
    x = x.replace('"YourFuckingISP":', '"Your ISP":');
    x = x.replace('"YourFuckingTorExit":', '"Your TOR Exit":');
    x = x.replace('"YourFuckingCountryCode":', '"Your Country Code":');
    x = x.replace('"YourFuckingLocation":', '"Your Location":');
    document.getElementById("demo")!.innerHTML = x;
    console.log(x)
    // on multiple requests, user can check console to see that IP hasn't changed.
    // Note to self:  IP changes roughly every 10 minutes
};

const scriptTag = document.createElement("script");
scriptTag.integrity = `sha256-${setHash}`;
  // Call from local storage
scriptTag.src = `${setURL}`;
// scriptTag.crossOrigin="use-credentials"
scriptTag.crossOrigin = "ANONYMOUS";

  // to keep things clean, we will append it to the page's
  // <head /> tag.
document.head.appendChild(scriptTag);

  // Overlay for thisTorBrowser IP {}
document.getElementById("overlay")!.style.display = "block";

  // Attend the user that they can open an overlay displaying their connection information. (Why? I don't know.)
function thistoaster() {
    const x = document.getElementById("toaster");
    x!.className = "show";
    setTimeout(() => {
      x!.className = x!.className.replace("show", "");
    }, 5500);
    // "hide"
  }

  // We required Mousetrap in preload
Mousetrap.bind("shift+k", () => {
    thisfunction();
  });

  // open overlay
function thisfunction() {
    const x = document.getElementById("connectionoverlay");
    x!.className = "show";

    Mousetrap.bind("shift+k", () => {
      anotherfunction();
    });

    return;
  }
  // close overlay
function anotherfunction() {
    const x = document.getElementById("connectionoverlay");
    x!.className = "";
    Mousetrap.bind("shift+k", () => {
      thisfunction();
    });

    return;
  }
