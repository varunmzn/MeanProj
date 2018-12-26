'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Stores', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            address_1: {
                type: Sequelize.STRING,
                allowNull: true
            },
            address_2: {
                type: Sequelize.STRING,
                allowNull: true
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true
            },
            state: {
                type: Sequelize.STRING,
                allowNull: true
            },
            postal_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            contact_name: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            phone: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            police_hold: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            police_frequency: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            police_fax: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            police_email: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            leads_id: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            leads_username: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            leads_password: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            weight_unit: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            timezone: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            group: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            points_system: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            payout_max: {
                type: Sequelize.DECIMAL(2, 2),
                allowNull: true
            },
            payout: {
                type: Sequelize.DECIMAL(2, 2),
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Stores');
    }
};