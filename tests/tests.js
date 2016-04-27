/**
* @name PandaTest
* @summary A simple PandaJS plugin that permits to do assertions the right way.
* @author SkyzohKey
* @version 0.0.1
* @module plugins.test
**/
game.module('plugins.tests')
.body(function () {
  game.createClass('Test', {
    // Results of the tests.
    totalTests:  0,
    failedTests: 0,
    passedTests: 0,

    // Some CSS for styling the tests report.
    titleCss: 'background: #BDC3C7; color: #FFF; padding: 5px;',
    totalCss: 'color: #9B59B6',
    failedCss: 'color: #E74C3C',
    passedCss: 'color: #2ECC71',

    /**
    * @name init
    **/
    init: function () {
      this.resetCounters();

      console.log('%c-- Tests started --', this.titleCss);
      console.log();
    },

    /**
    * @name assert
    * @param {Boolean} condition - Condition to match for the test to pass.
    * @param {String} name       - Name of the test, used in test report.
    * @return {Void}
    **/
    assert: function (condition, name) {
      var caller = new Error().stack.split('\n')[1].split('/').slice(-1).pop();

      if (!condition) {
        var message = caller+":%c"+name || caller+":%cAssertion failed!";
        console.log('%cTest failed: %c'+ message, this.failedCss, this.totalCss);
        this.failedTests++;
      } else {
        var message = caller+":%c"+name || caller+":%cAssertion passed!";
        console.log('%cTest passed: %c'+ message, this.passedCss, this.totalCss);
        this.passedTests++;
      }

      this.totalTests++;
    },

    /**
    * @name resetCounters
    * @desc A quick function to reset tests counters.
    * @return {Void}
    **/
    resetCounters: function () {
      this.totalTests  = 0;
      this.failedTests = 0;
      this.passedTests = 0;
    },

    /**
    * @name showResults
    * @desc Function that console.log the tests results.
    * @return {Void}
    **/
    showResults: function () {
      var pass = String('').concat(this.passedTests, ' (', Math.floor(this.passedTests * 100 / this.totalTests), '%)');
      var fail = String('').concat(this.failedTests, ' (', Math.floor(this.failedTests * 100 / this.totalTests), '%)');

      console.log();
      console.log('%c-- Tests results --', this.titleCss);
      console.log('- %cPassed tests: '+ pass, this.passedCss);
      console.log('- %cFailed tests: '+ fail, this.failedCss);
      console.log('- %cTotal  tests: '+ this.totalTests, this.totalCss);
      console.log('%c-- Tests results --\n', this.titleCss);
      console.log();
    }
  });
});
