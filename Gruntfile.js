module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: './dist/', src: ['**'],
                        dest: './docs/'
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: './dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: './dist/css',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            uses_defaults: ['src/js/tigereye.js']
        },
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    './dist/js/tigereye.min.js': ['./dist/js/tigereye.js']
                }
            }
        },
        watch: {
            css: {
                files: 'src/**/*.scss',
                tasks: ['sass', 'cssmin', 'copy']
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint', 'uglify', 'copy'],
                options: {
                    debounceDelay: 250
                }
            }
        },
        build: {
            tasks: ['cssmin', 'jshint', 'uglify', 'copy']
        },
        js: {
            tasks: ['copy']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build',['build']);
    grunt.registerTask('js',['js']);
    grunt.registerTask('serve',['exec']);
};