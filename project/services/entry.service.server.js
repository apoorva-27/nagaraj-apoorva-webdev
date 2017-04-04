/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (app,EntryModel) {
    app.post("/api/user/:uid/attraction/:aid/entry", createEntry);
    app.get("/api/user/:uid/attraction/:aid",findEntriesByAttraction);
    app.get("/api/user/:uid/attraction/:aid/entry/:eid",findEntryByEntryId);
    app.put("/api/user/:uid/attraction/:aid/entry/:eid",updateEntry)

    function updateEntry(userId,attractionId, entry) {
        var userId=req.params.uid;
        var attractionId=req.params.aid;
        var entryId=req.params.eid;
        var entry=req.body;
        // console.log("user  in request  body"+user);

        EntryModel
            .updateEntry(entryId,entry)
            .then (function (entry) {
                    console.log("entry update at server service"+entry)
                    res.json(entry);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findEntryByEntryId(req,res) {
        var userId=req.params.uid;
        var attractionId=req.params.aid;
        var entryId=req.params.eid;

        EntryModel
            .findEntryByEntryId(entryId)
            .then (function (entry) {
                    // console.log("user object at user service 3"+user)
                    res.json(entry);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findEntriesByAttraction(req,res) {
        var userId=req.params.uid;
        var attractionId=req.params.aid;

         EntryModel
            .findEntriesByAttraction(attractionId)
            .then (function (entries) {
                    // console.log("user object at user service"+user)
                    res.json(entries);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }

    function createEntry(req, res) {
        console.log("enty service create entry server")
        var newE = req.body;
        var userId=req.params.uid;
        var attractionId=req.params.aid;

        var newEntry = {
            title:newE.title,
            story:newE.story,
            date:newE.date,
            userId:userId,
            attractionId:attractionId
        }


        EntryModel
            .createEntry(newEntry)
            .then(function (entry) {
                    res.json(entry);

                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }
}