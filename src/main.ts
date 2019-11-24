import {exec, execFile} from "child_process";
import { app, BrowserWindow, dialog, ipcMain, Menu, session } from "electron";
import Store from "electron-store";
import path from "path";

const store = new Store();
// app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");






if (require("electron-squirrel-startup")) { app.quit(); }

const handleStartupEvent = () => {
  if (process.platform !== "win32") {
    return false;
  }

  const squirrelCommand = process.argv[1];
  switch (squirrelCommand) {
    case "--squirrel-install":
      const target = path.basename(process.execPath);
      const updateDotExe = path.resolve(
        path.dirname(process.execPath),
        "..",
        "update.exe",
      );
      const createShortcut =
        updateDotExe +
        "--createShortcut=" +
        target +
        "--shortcut-locations=Desktop,StartMenu";
      exec(createShortcut);
      // Always quit when done

      return true;

    case "--squirrel-updated":
      // Optionally do things such as:
      //
      // - Install desktop and start menu shortcuts
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Always quit when done
      app.quit();

      return true;
    case "--squirrel-uninstall":
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Always quit when done
      app.quit();

      return true;
    case "--squirrel-obsolete":
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      return true;
  }
};

if (handleStartupEvent()) {
  app.quit();
  // weird?
}








// can we do this nicer?
// const Browsericon = path.join(process.cwd(), "/static/icons/icon.png");
const Browsericon = path.join(__dirname, "/static/icons/icon.png");
declare var MAIN_WINDOW_WEBPACK_ENTRY: any;
declare var MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

declare var SECOND_WINDOW_WEBPACK_ENTRY: any;
declare var SECOND_WINDOW_PRELOAD_WEBPACK_ENTRY: any;


ipcMain.on("request-mainprocess-action", (event: any, arg: any) => {
  createSecondWindow();
});

// console.log(__dirname + "\\static\\Tor\\Tor\\tor.exe");


// Tor Windows
const StartTorWindows = () => {
  execFile(`${__dirname}\\static\\Tor\\Tor\\tor.exe`);
 };
if (process.platform === "win32") {
  StartTorWindows();
 }

// Tor linux (User has to run tor on 9050 himself probably.)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: any;
let secondWindow: any;

const createWindow = () => {
  // Setting it here because it is essentially the same as calling it from app.ready
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({ responseHeaders: Object.assign({
        "Content-Security-Policy": [ "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://wallet.moneypot.com " ],
        //  "Access-Control-Allow-Origin": ["*"]
    }, details.responseHeaders)});
  });

  const filter = {
    urls: ["https://*.moneypot.com/*"],
  };
// messy
  session.defaultSession.webRequest.onHeadersReceived(filter, (details: any, callback) => {
    details.responseHeaders["access-control-allow-origin"] = "*";
    callback({ responseHeaders: Object.assign({
        // tslint:disable-next-line: max-line-length
        // "Content-Security-Policy": [ "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://wallet.moneypot.com " ],
        // 'Access-Control-Allow-Origin': '*'
    }, details.responseHeaders)});
  });

  
 // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      allowRunningInsecureContent: false,
      webSecurity: true,
      // Due to CORS ERRORS.
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    });
  mainWindow.autoHideMenuBar = true;
  mainWindow.resizable = false;


  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.setIcon(Browsericon);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Check for all windows.
  mainWindow.webContents.session.setProxy(
   {
     proxyRules: "socks5://127.0.0.1:9050",
   });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};





const createSecondWindow = () => {
  // Create the browser window.
  secondWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
       nodeIntegration: false,
       webSecurity: true,
       // Due to CORS ERRORS
      allowRunningInsecureContent: false,
      preload: SECOND_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    });

  // and load the index.html of the app.
  secondWindow.loadURL(SECOND_WINDOW_WEBPACK_ENTRY);
  secondWindow.setIcon(Browsericon);
  secondWindow.autoHideMenuBar = true;
  // Open the DevTools.
  // secondWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  secondWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    secondWindow = null;
  });

};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


app.on("ready",
 createWindow,

);

if (store.get("linuxstartup") !== "true") {
store.set("linuxstartup", "false");
}

if (process.platform === "linux" && store.get("linuxstartup") === "false" ) {
    app.on("ready" , () =>
    tormessage(),
    );
}


const options = {
   type: "question",
   buttons: ["I acknowledge"],
   defaultId: 1,
   title: "Is Tor installed?",
   message: "Hi Linux-Meister. Do you have tor installed?",
   detail: "If not, please install tor, and make sure it runs on ::9050",
  //  checkboxLabel: "do not show message anymore",
  //  checkboxChecked: true,

 };

// Minimum options object


const tormessage = async () => {
 // Synchronous usage
 const response = await dialog.showMessageBox(options);
 // do something with response/checkmark, but no.
 if (response.response === 0) { store.set("linuxstartup", "true"); }
// will always return true. just a simple warning on first-startup for now.
};

// I don't want users opening tabs themselves, so this code is unnecessary.
app.on("browser-window-created", (e: any, window: any) => {
  window.setMenuBarVisibility(false),
    window.setIcon(Browsericon);
});


// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
  if (process.platform === "win32") {
    // Maybe kill tor here. Debugging to see if this is necessary.
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null && secondWindow === null) {
    createWindow();

  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.






