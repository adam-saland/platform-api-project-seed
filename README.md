# Platform API Project Seed

```
├── js
│   ├── color-view.js
│   ├── external-window-snapshot.js
│   ├── layout-form.js
│   ├── left-menu.js
│   ├── platform-provider.js
│   ├── platform-window.js
│   ├── snapshot-form.js
│   ├── template-store.js
│   └── title-bar.js
├── my_platform_notes.txt
├── package-lock.json
├── package.json
├── platform-window.html
├── provider.html
├── public.json
├── app.json
├── server.js
├── serviceworker.js
└── styles
    ├── frame-styles-template.css
    ├── frame-styles.css
    └── light-theme.css
```
```
├── my_platform_notes.txt
├── package-lock.json
├── package.json
├── platform-window.html
├── serviceworker.js
├── js
│   ├── layout-form.js
│   ├── left-menu.js
│   ├── platform-window.js
│   ├── snapshot-form.js
│   ├── [template | snapshot]-store.js(?)
│   └── title-bar.js
|
├── context-api
│   ├── color-view.js
│   ├── color-view.html
│   └── context-api.md
|
├── provider
│   ├── platform-provider.js
│   ├── provider.html
│   ├── provider-[helpers|utils](?).js <-> external-window-snapshot.js
│   ├── provider-[helpers|utils](?).js <-> external-window-snapshot.js
|	└── provider.md
|
├── manifests
│   ├── provider-[helpers|utils](?).js <-> external-window-snapshot.js
│   ├── platform-provider.js
|	├── provider.html
|	└── provider.md
|
└── styles
    ├── frame-styles-template.css
    ├── frame-styles.css
    └── light-theme.css
```
This project seed includes the following [Platform API](https://openfin.co/platform-api) capabilites:

* Examples of the configuration required to use the Platform API and apply customizations
* Usage of the Platform API to group, tab, and rearrange application windows
* API examples of View management and creation
* API examples of Snapshot saving and applying
* Examples of visual customization via CSS
* Examples of visual customization by providing a custom Platform Window
* Examples of behavioral customization by overriding the Platform APIs

[Launch in OpenFin](https://openfin.github.io/start/?manifest=https%3A%2F%2Fopenfin.github.io%2Fplatform-api-project-seed%2Fpublic.json)

## Running the code

**Basic Usage:**

* Clone this repository
* Install the dependencies: `npm install`
* Start the live-server and launch the application: `npm start`

**Advanced Usage:**

For users who would like to test features with a different OpenFin Runtime, configure your workspace as follows:

* Generate a local manifest file, _local.json_, with the specified Runtime version, e.g. canary: `npm start -- canary`
* Subsequent launches will automatically use _local.json_; delete this file to revert to _app.json_

## Understanding the code

### Platform configuration
* [Platform configuration](https://developers.openfin.co/docs/platform-api#section-1-launching-a-platform) has been included in the provided [app.json](app.json) file.
* The [defaultWindowOptions](https://developers.openfin.co/docs/platform-api#section-standard-window-customization) key in the provided `app.json` will instruct the platform to replace our Standard Window with the provided [platform-window.html](platform-window.html) file.
* The [commands](https://developers.openfin.co/docs/platform-api#section-5-3-using-keyboard-commands) key in the provided `app.json` will allow keyboard access to the next tab command.
* The [providerUrl]() key in the provided `app.json` will allow you to make custom changes to the Platform APIs, by pointing to a hosted [provider.html](provider.html) file. (STARTING IN v15.80.50.x)

### CSS Customization
* A [stylesheet](https://developers.openfin.co/docs/platform-api#section-standard-window-customization) is linked in the [platform-window.html](platform-window.html) file, and allows for [visual customization](styles/frame-styles.css). For a complete view of all properties, please refer to the [example stylesheet](https://github.com/openfin/layouts-v2-style-examples)

### Platform Window
The [platform-window.html](platform-window.html) file contains the [layout-container](https://developers.openfin.co/docs/platform-api#section-5-2-complete-window-customization) element and two custom elements: `left-menu` and `title-bar`. These elements, in conjunction with the [js/platform-window.js](js/platform-window.js) file, enable the following functionality:

##### left-menu
Provides examples of the following functionality:
* Adding a View to an existing Window
* Adding a View in a new Window
* Saving the Window's current Layout
* Restoring the Window's current Layout
* Creating a regular OpenFin Window
* Saving/Restoring Platform Snapshots
* Applying a preset arrangement on the current window (Grid, Tabs, Rows)

##### title-bar
Provides examples of the following functionality:
* Draggable area
* Close/Maximize/Minimize buttons

### Provider
Our [custom Provider](js/platform-provider.js) includes an [extension](js/external-window-snapshot.js) that will look for a pre-configured list of [externalWindows](https://cdn.openfin.co/docs/javascript/15.80.49.21/ExternalWindow.html) (the default being the provided [my_platform_notes.txt](my_platform_notes.txt) file opened in notepad.exe) and:

* Override `getSnapshot` to include a [externalWindows](https://cdn.openfin.co/docs/javascript/15.80.49.21/ExternalWindow.html) section containing information on any any external window included in the configuration.
* Override `applySnapshot` to look for an [externalWindows](https://cdn.openfin.co/docs/javascript/15.80.49.21/ExternalWindow.html) section and restore the position and state of any external window included in the configuration.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY5OTY5NTc0OCw5OTczNDYwNjIsMTM1Mz
YxNjY3OCwtMTQ0NDE4NzQ4NSwxMzg0NDM2OTk1LDEwMzQzNDc4
MzIsMTAzMTYzMTEyNiwyMDE0MzYxMzEyXX0=
-->