/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (app,EntryModel) {
    app.post("/api/user/:uid/attraction/:aid/entry", createEntry);
    app.get("/api/user/:uid/attraction/:aid",findEntriesByAttraction);
    app.get("/api/user/:uid/attraction/:aid/entry/:eid",findEntryByEntryId);
    app.put("/api/entry/:eid",updateEntry);
    app.delete("/api/entry/:eid",deleteEntry);
    app.get("/api/admin/entries",getAllEntries);
    app.get("/api/admin/entry/:eid",findEntryById);
    app.get("/api/user/:uid/entries",findEntriesByUserId);

    function findEntriesByUserId(req,res) {
        var userId = req.params.uid;
        EntryModel.findEntriesByUserId(userId)
            .then(function (entries) {
                    res.json(entries);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }
    function findEntryById(req,res) {
        entryId=req.params.eid;
        EntryModel
            .findEntryById(entryId)
            .then (function (array){
                    console.log(array);
                    res.json(array[0]);
                },
                function(err){
                    res.sendStatus(400).send(err);
                })
    }

    function getAllEntries(req,res){
        EntryModel
            .getAllEntries()
            .then (function (array){
                    res.json(array);
                },
                function(err){
                    res.send(null);
                })
    }

    function deleteEntry(req,res) {
        var userId=req.params.uid;
        var attractionId=req.params.aid;
        var entryId=req.params.eid;
        EntryModel
            .deleteEntry(entryId)
            .then (function (entry) {
                    res.json(entry);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function updateEntry(req,res) {

        var userId=req.params.uid;
        var attractionId=req.params.aid;
        var entryId=req.params.eid;
        var entry=req.body;

        EntryModel
            .updateEntry(entryId,entry)
            .then (function (entry) {
                    console.log("entry update at server service"+entry);
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
                    res.json(entries);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                });
    }

    function createEntry(req, res) {
        var newE = req.body;
        var userId=req.params.uid;
        var attractionId=req.params.aid;

        var newEntry = {
            title:newE.title,
            story:newE.story,
            date:newE.date,
            userId:userId,
            attractionId:attractionId,
            username:newE.username,
        };

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