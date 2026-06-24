const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');


const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
    }
);


const get_admin_connection_config = () => {
     const config = {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_ROOT_USER || process.env.MYSQL_USER,
        password: process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQL_PASSWORD || '',
        multipleStatements: true,
    };

    if (process.env.MYSQL_PORT){
        config.port = Number(process.env.MYSQL_PORT);
    }

    return config;
}


const ensure_database_and_user = async() => {
    const dbName = process.env.MYSQL_DB;
    const appUser = process.env.MYSQL_USER;
    const appPassword = process.env.MYSQL_PASSWORD || '';

    // base case
    if(!dbName || !appUser){
        throw new Error('Set MYSQL_DB and MYSQL_USER first');
    }

    const admin_connection = await mysql.createConnection(get_admin_connection_config);

    try{
        const escapedDb = mysql.escapeId(dbName);

        await admin_connection.query(`CREATE DATABASE IF NOT EXISTS ${escapedDb};`);

        if (process.env.MYSQL_ROOT_USER && appUser !== process.env.MYSQL_ROOT_USER) {
            const escapedUser = mysql.escape(appUser);
            const escapedPass = mysql.escape(appPassword);
            await adminConnection.query(
                `CREATE USER IF NOT EXISTS ${escapedUser}@'%' IDENTIFIED BY ${escapedPass}; ` +
                `GRANT ALL PRIVILEGES ON ${escapedDb}.* TO ${escapedUser}@'%'; ` +
                'FLUSH PRIVILEGES;'
            );
        }
    }
    finally{
        await admin_connection.end();
    }
}

const connect_mysql = async() => {
    try{
        await sequelize.authenticate();
    }
    catch(error){
        console.error('Unable to connect', error.message);

        if (error.message?.includes('Access denied') || error.message?.includes('Unknown database')) {
            try{
                await ensure_database_and_user();
                await sequelize.authenticate();
                return;
            }
            catch(recoveryError){
                console.error('MYSQL recovery failed', recoveryError.message);
            }
        }
        process.exit(1);
    }
}


module.exports = {connect_mysql, sequelize};