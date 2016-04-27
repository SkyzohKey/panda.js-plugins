# PandaTests
PandaTests is a plugin for [Panda.js] that permits to do assertions the right way.
To learn more about this plugin, read the following samples.

![](http://i.imgur.com/TBzGMGr.png)

## Installation
In order to install **PandaTests**, simply copy this file into your
`<project_root>/src/plugins` folder. That's all ! You'll then have to **require**
it whenever you want to use it in your code. _(see the samples)_

## Samples
### Basic usage
**File** `main.js`:
```js
game.module('game.main')
.require('plugins.tests')
.body(function () {
  game.createScene('Main', {
    init: function () {
      // We first instanciate a Test object.
      var test = new game.Test();

      // Then we proceed our tests.
      test.assert(true == true, 'true equals true'); // Test pass
      test.assert(true == false, 'true equals false'); // Test fails
      test.assert(0 == false, '0 equals false'); // Test pass
      test.assert('false' == false, '"false" equals false'); // Test fails

      // Now we can ask for tests results.
      test.showResults();
      /**
      * -- Tests results --
      * - Passed tests: 2
      * - Failed tests: 2
      * - Total  tests: 4
      * -- Tests results --
      **/

      // We can also reset tests results.
      test.resetCounters();
    }
  });
});
```

[Panda.JS]: https://pandajs.net
