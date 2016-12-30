module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'src/css/tigereye.css' : 'src/scss/tigereye.scss'
                }
            }
        },
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
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            uses_defaults: ['src/js/tigereye.js']
        },
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    './dist/js/tigereye.min.js': ['./dist/js/tigereye.js'],
                }
            }
        },
        concat: {
            js: {
                src: ['src/js/tigereye.js'],
                dest: 'dist/js/tigereye.js'
            },
            css: {
                src: ['src/css/tigereye.css'],
                dest: 'dist/css/tigereye.css'
            }
        },
        watch: {
            css: {
                files: 'src/**/*.scss',
                tasks: ['sass', 'concat:css', 'cssmin', 'copy']
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint', 'concat:js', 'uglify', 'copy'],
                options: {
                    debounceDelay: 250
                }
            }
        },
        build: {
            tasks: ['sass', 'concat:css', 'cssmin', 'jshint', 'concat:js', 'uglify', 'copy']
        },
        exec: {
            server: 'node server.js'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default',['watch']);
    grunt.registerTask('serve',['exec']);
};