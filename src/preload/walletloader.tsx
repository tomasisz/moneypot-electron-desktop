// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import {BrowserWindow, remote} from "electron";
import Mousetrap from "mousetrap";

declare const window: any;

window.Mousetrap = Mousetrap;
window.remote = remote;
window.BrowserWindow = BrowserWindow;
// Load main content
// window.addEventListener("DOMContentLoaded", () => {
//   const replaceText = (selector: any, text: any) => {
//     const element = document.getElementById(selector);
//     if (element) {
//       element.innerText = text;
//     }
//   };

//   for (const type of ["chrome", "node", "electron"]) {
//      replaceText(`${type}-version`, process.versions[type]);
//   }
// });

// i don't think this is necessary




const { Menu, MenuItem, getCurrentWebContents } = remote;
const webContents = getCurrentWebContents ();

let rightClickPosition: any;
//
const contextMenu = new Menu ();
contextMenu.append(
  new MenuItem({
    label: "Copy",
    role: "copy",
    accelerator: "CmdOrCtrl+C",
  }),
);
// contextMenu.append(
//   new MenuItem({
//     type: "separator",
//   }),
// );
contextMenu.append(
  new MenuItem({
    label: "Paste",
    role: "paste",
    accelerator: "CmdOrCtrl+V",
  }),
);

contextMenu.append(
  new MenuItem({
    type: "separator",
  }),
);
contextMenu.append(
  new MenuItem({
    label: "Fullscreen",
    role: "togglefullscreen",
    accelerator: "F11",
  }),
);
contextMenu.append(
  new MenuItem({
    type: "separator",
  }),
);
contextMenu.append(
   new MenuItem({
     label: "Force Reload",
     role: "forceReload",
     accelerator: "Ctrl + R",
  }),
   );
contextMenu.append(
   new MenuItem({
     type: "separator",
   }),
 );
const menuItem = new MenuItem
(
    {
        label: "Inspect Element",
        click: () => {
            webContents.inspectElement (rightClickPosition.x, rightClickPosition.y);
        },
        accelerator: "Ctrl + Shift + I",
    },
);
contextMenu.append (menuItem);
// contextMenu.append(
//   new MenuItem({
//      type: "separator",
//    }),
//  );

webContents.on
(
    "context-menu",
    (event, params) => {
        rightClickPosition = { x: params.x, y: params.y };
        contextMenu.popup ();
    },
);
