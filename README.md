# kbitzr

Apples to Apples for your phone.

## Setup

This project assumes you have a couple of things installed globally. Make sure you install all this first.

```
npm install -g mocha gulp nodemon cordoba ios-sim
```

Also install `imagemagick` (This is big library)

```
brew install imagemagick
```

After that, make sure you go through all these steps:

### 1. Running Tests

```
nodemon server
// In another tab
mocha server/tests
```

### 2. Compiling SASS

```
gulp sass
```

You can also just watch for changes using this command

```
gulp watch
```

Whenever you change a file, it will re-compile them.

### 3. Cordoba

All this is taken from [this tutorial](http://coenraets.org/blog/cordova-phonegap-3-tutorial/). If you have any questions, refer back to it.

```
cordova platforms add ios
// Who cares about android...
// cordova platforms add android

cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.console
```

To build your app run the following command:

```
gulp cordoba
```

This will copy all your files into the `cordoba/www` directory.

To run it in an emulator run this:

```
cordova emulate ios
```