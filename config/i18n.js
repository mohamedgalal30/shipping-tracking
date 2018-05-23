/**
 * Internationalization / Localization Settings
 * (sails.config.i18n)
 *
 * If your app will touch people from all over the world, i18n (or internationalization)
 * may be an important part of your international strategy.
 *
 *
 * For more informationom i18n in Sails, check out:
 * http://sailsjs.org/#!/documentation/concepts/Internationalization
 *
 * For a complete list of i18n options, see:
 * https://github.com/mashpie/i18n-node#list-of-configuration-options
 *
 *
 */

module.exports.i18n = {

  /***************************************************************************
  *                                                                          *
  * Which locales are supported?                                             *
  *                                                                          *
  ***************************************************************************/

  locales: ['ar'],

  /****************************************************************************
  *                                                                           *
  * What is the default locale for the site? Note that this setting will be   *
  * overridden for any request that sends an "Accept-Language" header (i.e.   *
  * most browsers), but it's still useful if you need to localize the         *
  * response for requests made by non-browser clients (e.g. cURL).            *
  *                                                                           *
  ****************************************************************************/

  defaultLocale: 'ar',

  /****************************************************************************
  *                                                                           *
  * Automatically add new keys to locale (translation) files when they are    *
  * encountered during a request?                                             *
  *                                                                           *
  ****************************************************************************/

   updateFiles: false,

  /****************************************************************************
  *                                                                           *
  * Path (relative to app root) of directory to store locale (translation)    *
  * files in.                                                                 *
  *                                                                           *
  ****************************************************************************/

  // localesDirectory: '/config/locales'
 // setting of log level DEBUG - default to require('debug')('i18n:debug')
    logDebugFn: function (msg) {
        console.log('debug', msg);
    },

    // setting of log level WARN - default to require('debug')('i18n:warn')
    logWarnFn: function (msg) {
        console.log('warn', msg);
    },

    // setting of log level ERROR - default to require('debug')('i18n:error')
    logErrorFn: function (msg) {
        console.log('error', msg);
    },

};
