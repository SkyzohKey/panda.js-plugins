# PandaLogger
PandaLogger is a plugin for [Panda.js] that brings basic logger features into the game scope.
To learn more about this plugin, read the following samples.

## Installation
In order to install PandaLogger, simply copy this file into your `<project_root>/src/plugins` folder. That's all !  
You'll then have to require it whenever you want to use it in your code. (see samples)

## Mini-doc
### LogType's allowed with PandaLogger
Here's a table that show you what LogType each log method uses.
> **IMPORTANT**: U should **NEVER** use UNKNOWN, it's here just for cases where the LogType is invalid.

| Log method | LogType | Indice |
|:-----------|---------|-------:|
|            | UNKNOWN | -1     |
| info()     | INFO    | 0      |
| warn()     | WARNING | 1      |
| error()    | ERROR   | 2      |
| fatal()    | FATAL   | 3      |
| debug()    | DEBUG   | 4      |

## Samples
### Basic usage

In this first sample, I'll show you the way I think right to handle the desired logLevel ; The awesome `config.js` file!

**File** `config.js`:
```js
pandaConfig = {
  system: {
    width: 800,
    height: 400
  },
  logger: {
    logLevel: "DEBUG"
  }
};

game.config = pandaConfig;
```

**File** `main.js`:
```js
game.module('game.main')
.require('plugins.logger')
.body(function () {
  game.createScene('Main', {
    init: function () {
      game.logger.debug("This is a debug message");
      game.logger.info("This is an information message");
      game.logger.warn("This is a warning message");
      game.logger.error("This is an error message");
      game.logger.fatal("This is a fatal error messages");
    }
  });
});
```

[Panda.JS]: https://pandajs.net
