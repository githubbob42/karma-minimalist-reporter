'use strict';


var MinimalistReporter = function(baseReporterDecorator, color) {

    baseReporterDecorator(this);

    if (color) {
        this.USE_COLORS = true;

        this.LOG_SINGLE_BROWSER = '%s: ' + '%s'.cyan + '\n';
        this.LOG_MULTI_BROWSER = '%s %s: ' + '%s'.cyan + '\n';

        this.SPEC_FAILURE = '%s %s FAILED'.red + '\n';
        this.SPEC_SLOW = '%s SLOW %s: %s'.yellow + '\n';
        this.ERROR = '%s ERROR'.red + '\n';

        this.FINISHED_ERROR = ' ERROR'.red;
        this.FINISHED_SUCCESS = ' SUCCESS'.green;
        this.FINISHED_DISCONNECTED = ' DISCONNECTED'.red;

        this.X_FAILED = ' (%d FAILED)'.red;

        this.TOTAL_SUCCESS = 'TOTAL: %d SUCCESS'.green + '\n';
        this.TOTAL_FAILED = 'TOTAL: %d FAILED, %d SUCCESS'.red + '\n';
    }

    this.onBrowserComplete = function(browser) {
        this.write(this.renderBrowser(browser) + '\n');
    };

    this.onRunComplete = function(browsers, results) {
        if (browsers.length > 1 && !results.disconnected && !results.error) {
            if (!results.failed) {
                this.write(this.TOTAL_SUCCESS, results.success);
            } else {
                this.write(this.TOTAL_FAILED, results.failed, results.success);
            }
        }
    };

};

MinimalistReporter.$inject = ['baseReporterDecorator', 'config.color'];

// PUBLISH DI MODULE
module.exports = {
    'reporter:minimalist': ['type', MinimalistReporter]
};