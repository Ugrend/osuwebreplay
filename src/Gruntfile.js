module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            js: {
                src: ['js_src/libs/*.js', 'js_src/**/*.js'],
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