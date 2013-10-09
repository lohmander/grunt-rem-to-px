# grunt-rem-to-px



## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-rem-to-px --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-rem-to-px');
```


## The "rem_to_px" task

### Overview
In your project's Gruntfile, add a section named `simple_include` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rem_to_px: {
    options: {
        baseFontSize: 16,
        removeFontFace: true,
    },
    dist: {
        src: ['app/css/*.css'],
        dest: 'dist/css/norem/'
    }
  },
})
```

## Options

### baseFontSize

Set base font size in pixels.

### removeFontFace

Remove all font-face to prevent loading fonts twice.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**2013-11-21** First release
