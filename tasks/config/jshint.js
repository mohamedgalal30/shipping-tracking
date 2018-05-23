module.exports = function(grunt) {

	grunt.config.set('jshint', {
		// define the files to lint
		files: require('../pipeline').jsFilesToInject,
		// configure JSHint (documented at http://www.jshint.com/docs/)
		options: {
	    // more options here if you want to override JSHint defaults
		    globals: {
		      jQuery: true,
		      console: true,
		      module: true
		    }
	  	}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
