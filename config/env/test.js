/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
    
        /***************************************************************************
         * Set the default database connection for models in the development       *
         * environment (see config/connections.js and config/models.js )           *
         ***************************************************************************/
    
        models: {
            connection: 'mysqlTestServer'
        },
        connections: {
            // rabbitmq: {
            //     protocol: 'amqp',
            //     hostname: 'rabbitmq-server',
            //     port: 5672,
            //     // username: 'guest',
            //     // password: 'guest',
            //     // locale: 'en_US',
            //     // frameMax: 0,
            //     // heartbeat: 0,
            //     // vhost: '/',
            // },
    
            mysqlTestServer: {
                adapter: 'sails-mysql',
                host: '172.17.0.2',
                port:3306,
                user: 'root',
                password: 'mypassword',
                database: 'shipping_tracking_test',
            }
        },
    
    };
    