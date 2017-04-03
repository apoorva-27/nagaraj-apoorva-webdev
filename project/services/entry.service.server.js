/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (app,EntryModel) {
    app.post("/api/entry", createEntry);

    function createEntry(req, res) {
        console.log("enty service create entry server")
        var newE = req.body;
        EntryModel
            .createEntry(newE)
            .then(function (entry) {
                    res.json(entry);

                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }
}