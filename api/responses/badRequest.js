/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest(data, options) {
    // sails.log.error('Bad Request:', data);
    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    let message = (data instanceof Error)? data.message : data

    sails.log.error('Bad Request:', message);

    // Set status code
    res.status(400);

    // Log error to console
    if (message !== undefined) {
        sails.log.verbose('Sending 400 ("Bad Request") response: \n', message);
    } else sails.log.verbose('Sending 400 ("Bad Request") response');

    // Only include errors in response if application environment
    // is not set to 'production'.  In production, we shouldn't
    // send back any identifying information about errors.
    // if (sails.config.environment === 'production') {
    //   data = undefined;
    // }

    // If the user-agent wants JSON, always respond with JSON
    if (req.wantsJSON) {
        return res.jsonx({ flash: req.__(data), message: (message || 'bad request'), data: {} });
    }

    // If second argument is a string, we take that to mean it refers to a view.
    // If it was omitted, use an empty object (`{}`)
    options = (typeof options === 'string') ? { view: options } : options || {};

    // If a view was provided in options, serve it.
    // Otherwise try to guess an appropriate view, or if that doesn't
    // work, just send JSON.
    if (options.view) {
        var err = data.err;
        if (err) {
            if (err.invalidAttributes) {
                _.each(err.invalidAttributes, function(val, key) {
                    var rules = _.map(val, 'rule');
                    if (rules.indexOf('required') != -1) {
                        req.msg(key + '.required', 'danger');
                    } else {
                        _.each(rules, function(rule) {
                            req.msg(key + '.' + rule, 'danger');
                        })
                    }
                });
            } else if (Util.main.isArray(err)) {
                _.each(err, function(msg) {
                    req.msg(msg, 'danger');
                });
            } else if (typeof err == 'string') {
                req.msg(err, 'danger')
            } else {
                req.msg('danger');
            }
        }
        return res.view(options.view, data);
    }

    // If no second argument provided, try to serve the implied view,
    // but fall back to sending JSON(P) if no view can be inferred.
    else return res.guessView({ data: data }, function couldNotGuessView() {
        return res.jsonx(data);
    });

};
