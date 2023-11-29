module.exports = targets => {
    targets.declare({
        events: new targets.types.Sync(['events'])
    });
};
