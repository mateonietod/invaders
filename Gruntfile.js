'use strict';

module.exports = function(grunt) {
    // cargamos todas las tareas
    require('load-grunt-tasks')(grunt);

    // Configuracion del proyecto.
    grunt.initConfig({
        wiredep: {
            app: {
                src: ['index.html']
            }
        },
        includeSource: {
            dev: {
                files: {
                    //dest - src
                    'index.html': 'base/index.dev.html'
                }
            },
            dist: {
                files: {
                    //dest - src
                    'index.html': 'base/index.dist.html'
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            libs: {
                files: { '.tmp/libs/libs.js': require('wiredep')().js }
            },
            app: {
                files: { '.tmp/js/app.js': ['app/main.js', 'app/**/*.js'] }
            }
        },
        concat: {
            libs: {
                src: ['.tmp/libs/libs.js'],
                dest: '.tmp/libs/libs.pack.js'
            },
            app: {
                src: ['.tmp/js/app.js'],
                dest: '.tmp/js/main.pack.js'
            }
        },
        uglify: {
            libs: {
                src: ['.tmp/libs/libs.pack.js'],
                dest: 'build/libs/libs.min.js'
            },
            app: {
                src: ['.tmp/js/main.pack.js'],
                dest: 'build/js/app.min.js'
            }
        },
        clean: {
            tmp: '.tmp',
            build: 'build'
        },
        less: {
            dev: {
                files: {
                    "app.css": [
                        "app/master.less"
                    ]
                },
                options: {
                    compress: false,
                    //source maps
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'app.css.map',
                    sourceMapFilename: 'app.css.map'
                }
            },
            build: {
                files: {
                    "app.css": [
                        "app/master.less"
                    ]
                },
                options: {
                    compress: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
            },
            dev: {
                options: {
                    map: {
                        prev: ''
                    }
                },
                src: 'app.css'
            },
            build: {
                src: 'app.css'
            }
        },
        watch: {
            less: {
                files: [
                    'app/*/**.less',
                    'app/*/styles/**.less'
                ],
                tasks: ['less:dev', 'autoprefixer:dev']
            },
            lib: {
                files: [
                    'lib/**'
                ],
                tasks: ['clean', 'includeSource:dev', 'wiredep']
            }
        }
    });

    // resgistrar las tareas
    grunt.registerTask('default', [
        'dev'
    ]);

    grunt.registerTask('dev', [
        'clean',
        'includeSource:dev',
        'wiredep',
        'less:dev',
        'autoprefixer:dev'
    ]);

    grunt.registerTask('build', [
        'clean',
        'ngAnnotate',
        'concat',
        'uglify',
        'includeSource:dist',
        'less:build',
        'autoprefixer:build',
        'clean:tmp'
    ]);
};
