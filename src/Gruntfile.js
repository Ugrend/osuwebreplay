module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    grunt.initConfig({
        concat: {
            js: {
                src: ['js_src/main.js','js_src/libs/*.js', 'js_src/osu/skins.js',  'js_src/ui/**/*.js',
                    'js_src/osu/ui/render.js', '!js_src/osu/ui/interface/*.js', 'js_src/osu/ui/interface/replay_control.js', 'js_src/**/*.js', 'js_src/osu/ui/interface/*.js',
                    '!js_src/launcher.js', 'js_src/launcher.js'],
                dest: 'osureplay-es6.js'
            },
            css: {
                src: ['css/**/*.css'],
                dest: '../static/css/osureplay.css'
            }

        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015-without-strict'],
                comments: false,
                minified: true

            },
            dist: {
                files: {
                    "../static/js/osureplay.js": "osureplay-es6.js"
                }
            }
        },

        watch: {
            js: {
                files: ['js_src/**/*.js'],
                tasks: ['concat:js','babel']
            },
            css: {
                files: ['css/**/*.css'],
                tasks: ['concat:css']
            }
        }
    });
    grunt.registerTask('build', ['concat','babel']);
};