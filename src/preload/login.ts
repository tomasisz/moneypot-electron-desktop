import sourceMapSupport from "source-map-support";

import {ipcRenderer, remote} from "electron";


// const _process = process;
// process.once("loaded", function() {
//     global.process = _process;
//   });
// window.remote = remote

declare const window: any;

window.sourceMapSupport = sourceMapSupport;
window.ipcRenderer = ipcRenderer;

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

webContents.on
(
    "context-menu",
    (event, params) => {
        rightClickPosition = { x: params.x, y: params.y };
        contextMenu.popup ();
    },
);
