module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                preserveComments: 'some'
            },
            main: {
                src: 'jquery.hash.js',
                dest: 'jquery.hash.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);
};