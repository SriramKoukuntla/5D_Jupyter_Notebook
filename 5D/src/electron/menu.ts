import { Menu, BrowserWindow, shell, app } from 'electron';

export function createAppMenu(mainWindow: BrowserWindow): void {
    const menuTemplate: Electron.MenuItemConstructorOptions[] = [
        {
            label: "File",
            submenu: [
                {
                    label: 'Exit',
                    click: () => {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: "Edit",
            submenu: [
                { label: 'Undo', role: 'undo' },
                { label: 'Redo', role: 'redo' },
                { label: 'Cut', role: 'cut' },
                { label: 'Copy', role: 'copy' },
                { label: 'Paste', role: 'paste' },
                { label: 'Delete', role: 'delete' },
                { label: 'Select All', role: 'selectAll' },
            ],
        },
        {
            label: "View",
            submenu: [
                { label: 'Reload', role: 'reload' },
                { label: 'Force Reload', role: 'forceReload' },
                {
                    label: 'Toggle Developer Tools',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    },
                },
                { label: 'Actual Size', role: 'resetZoom' },
                { label: 'Zoom In', role: 'zoomIn' },
                { label: 'Zoom Out', role: 'zoomOut' },
                {
                    label: 'Toggle Full Screen',
                    click: () => {
                        const isFullScreen = mainWindow.isFullScreen();
                        mainWindow.setFullScreen(!isFullScreen);
                    },
                },
            ],
        },
        {
            label: "Window",
            submenu: [
                { label: 'Minimize', role: 'minimize' },
                { label: 'Zoom', role: 'zoom' },
                { label: 'Close', role: 'close' },
            ],
        },
        {
            label: "Help",
            submenu: [
                {
                    label: 'Learn More',
                    click: () => {
                        shell.openExternal('https://electronjs.org');
                    },
                },
                {
                    label: 'Documentation',
                    click: () => {
                        shell.openExternal('https://www.electronjs.org/docs');
                    },
                },
                {
                    label: 'Community Discussions',
                    click: () => {
                        shell.openExternal('https://www.electronjs.org/community');
                    },
                },
                {
                    label: 'Search Issues',
                    click: () => {
                        shell.openExternal('https://github.com/electron/electron/issues');
                    },
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}
