/**
* @name PandaLogger
* @summary A simple PandaJS plugin that brings basic logger features into the game scope.
* @author SkyzohKey
* @version 0.0.2
* @module plugins.logger
**/
game.module('plugins.logger')
.body(function() {

  /**
  * Polyfill for the String.format method
  * It's taken from what Stackoverflow uses ;)
  **/
  String.prototype.format = function() {
    var str = String(this).toString();
    if (!arguments.length)
      return str;
    var args = typeof arguments[0],
      args = (("string" == args || "number" == args) ? arguments : arguments[0]);
    for (var arg in args)
      str = str.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
    return str;
  }

  game.createClass("Logger", {
    /**
    * The plugin version, defined at commiting stage.
    * @property {String} VERSION
    **/
    VERSION: "0.0.2",

    /**
    * The logLevel selected by the plugin in the staticInit method.
    * @private
    **/
    logLevel: null,

    /**
    * Indicate wether we are in debug mode or not. Used to display plugin infos.
    * @private
    **/
    isDebugMode: false,

    /**
    * Static initialization of the Logger.
    * @method staticInit
    * @constructor
    **/
    staticInit: function () {
      /**
      * Basically we'll first search for `game.config.logger.logLevel`, else
      * we'll determine if we have a `logLevel` variable defined into `game` else
      * we fallback to `LogType.DEBUG` that'll print everything it receives.
      **/
      var logLevel = null;

      if (game.config.logger.logLevel != undefined) {
        logLevel = game.config.logger.logLevel;
      } else if (game.logLevel != undefined) {
        logLevel = game.logLevel;
      } else {
        logLevel = game.LogType.DEBUG;
      }

      if (typeof logLevel === "string") { // If defined as a String
        this.logLevel = this._Str2LogType(logLevel);
      } else if (typeof logLevel === "number") { // If defined as a Number (indice from the Enum)
        this.logLevel = this._Number2LogType(logLevel);
      } else if (typeof logLevel === "object") { // If defined as a LogType
        this.logLevel = logLevel;
      } else {
        this.fatal("Logger.logLevel must be a LogType, a Number or a String.");
        return;
      }

      // Get the URL of the page and check it if matches "?debug".
      var href = document.location.href.toLowerCase();
      if (href.match(/\?debug/)) {
        this.isDebugMode = true;
      }

      // This permits us to do tests, you can ofc remove it. ;)
      if (this.isDebugMode) {
        this.debug("Initializing PandaLogger {version}...".format({ version: this.VERSION }));
        this.info ("Log level set to {level}".format({ level: this._LogType2Str(this.logLevel) }));
      }

      return true; // Avoid `init()` to be called.
    },

    /**
    * Method that convert a String to a LogType
    * @method _Str2LogType
    * @private
    * @param {String} type
    * @return {LogType}
    **/
    _Str2LogType: function (type) {
      // A basic switch, do I really need to explain ?
      switch (type) {
        case "DEBUG":
          return game.LogType.DEBUG;
          break;
        case "INFO ":
          return game.LogType.INFO;
          break;
        case "WARN ":
          return game.LogType.WARN;
          break;
        case "ERROR":
          return game.LogType.ERROR;
          break;
        case "FATAL":
          return game.LogType.FATAL;
          break;
        default:
          return "UNKNOWN";
          break;
      }
    },

    /**
    * Method that convert a LogType to a String
    * @method _logType2Str
    * @private
    * @param {LogType} type
    * @return {String}
    **/
    _LogType2Str: function (type) {
      // A basic switch, do I really need to explain ?
      switch (type) {
        case game.LogType.DEBUG:
          return "DEBUG";
          break;
        case game.LogType.INFO:
          return "INFO ";
          break;
        case game.LogType.WARNING:
          return "WARN ";
          break;
        case game.LogType.ERROR:
          return "ERROR";
          break;
        case game.LogType.FATAL:
          return "FATAL";
          break;
        default:
          return "UNKNOWN";
          break;
      }
    },

    /**
    * Method that convert a Number to a LogType
    * The number should correspond to one of the indices from
    * the LogType enum.
    * @method _Str2LogType
    * @private
    * @param {Number} type
    * @return {LogType}
    **/
    _Number2LogType: function (type) {
      // A basic switch, do I really need to explain ?
      switch (type) {
        case 0:
          return game.LogType.INFO;
          break;
        case 1:
          return game.LogType.WARN;
          break;
        case 2:
          return game.LogType.ERROR;
          break;
        case 3:
          return game.LogType.FATAL;
          break;
        case 4:
          return game.LogType.DEBUG;
          break;
        default:
          return game.LogType.UNKNOWN;
          break;
      }
    },

    /**
    * Principal method that handle all the logging logic.
    * @method log
    * @param {LogType} type
    * @param {String} message
    **/
    log: function (type, message) {
      // We don't want unknown messages, or even empty messages.
      if (type == game.LogType.UNKNOWN || message.replace(' ', '') == "") {
        return;
      }

      // We don't want to display messages that are lower than the logLevel.
      if (type > this.logLevel) {
        return;
      }

      // Convert the LogType to string and format the output string.
      var typeStr = this._LogType2Str(type);
      var strToPrint = "[{type}] {message}".format({ type: typeStr, message: message });

      // The dark magic behind this project ; console.log() !
      console.log(strToPrint);
    },

    /**
    * Shortcut functions.
    * Avoid the need to call this.log and passing a game.LogType.
    **/

    /**
    * Debug Shortcut
    * @method debug
    * @param {String} message
    **/
    debug: function (message) {
      this.log(game.LogType.DEBUG, message);
    },

    /**
    * Info Shortcut
    * @method info
    * @param {String} message
    **/
    info: function (message) {
      this.log(game.LogType.INFO, message);
    },

    /**
    * Warning Shortcut
    * @method warn
    * @param {String} message
    **/
    warn: function (message) {
      this.log(game.LogType.WARNING, message);
    },

    /**
    * Error Shortcut
    * @method error
    * @param {String} message
    **/
    error: function (message) {
      this.log(game.LogType.ERROR, message);
    },

    /**
    * Fatal error Shortcut
    * @method fatal
    * @param {String} message
    **/
    fatal: function (message) {
      this.log(game.LogType.FATAL, message);
    }
  });

  /**
  * The LogType "Enum".
  **/
  game.LogType = {
    "UNKNOWN" : -1, // This should never be used.
    "INFO"    : 0,
    "WARNING" : 1,
    "ERROR"   : 2,
    "FATAL"   : 3,
    "DEBUG"   : 4,
  };

  /**
  * Here's our `game.logger` object that is in fact a game.Logger instance
  * shared accross the game module.
  **/
  game.logger = new game.Logger();
});
