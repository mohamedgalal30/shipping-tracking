module.exports = {
    attributes: {
        courier: {
            type: 'string',
        },
        driverName: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        status: {
            type: 'string',
            enum: ["completed",  "started", "pending", "failed"]
        },
        deliveryDate: {
            type: 'string',
        },
        startedAt: {
            type: 'string',
        },
        finishedAt: {
            type: 'string',
        },
        driverComment: {
            type: 'string',
        },
        fromLocation: {
            type: 'string',
        },
        toLocation: {
            type: 'string',
        },
    },
}