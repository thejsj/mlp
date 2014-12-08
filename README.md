# kbitzr

Apples to Apples for your phone.

## Setup

This project assumes you have a couple of things installed globally. Make sure you install all this first.

```
npm install -g mocha gulp nodemon cordoba
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

TODO... how to set up cordoba. Basically, go through [this tutorial](http://coenraets.org/blog/cordova-phonegap-3-tutorial/).