module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            js: {
                src: ['js_src/main.js','js_src/libs/*.js', 'js_src/osu/skins.js',  'js_src/ui/**/*.js',
                    'js_src/osu/ui/render.js', '!js_src/osu/ui/interface/*.js', 'js_src/**/*.js', 'js_src/osu/ui/interface/*.js',
                    '!js_src/launcher.js', 'js_src/launcher.js'],
                dest: '../static/js/osureplay.js'
            },
            css: {
                src: ['css/**/*.css'],
                dest: '../static/css/osureplay.css'
            }

        },
        watch: {
            js: {
                files: ['js_src/**/*.js'],
                tasks: ['concat:js']
            },
            css: {
                files: ['css/**/*.css'],
                tasks: ['concat:css']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', ['concat'])
};