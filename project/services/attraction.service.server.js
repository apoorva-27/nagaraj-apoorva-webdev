/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (app,AttractionModel) {
    app.get("/api/name", findPlaceByText);
    app.post("/api/user/:uid/attraction/:aid/status/:sid",favorite);
    app.get("/api/user/:uid/attraction/:aid/status",findFavoritesByUserId);
    app.get("/api/admin/attractions",getAllAttractions);
    app.get("/api/attraction/:aid",findAttractionById);
    app.put("/api/attraction/:aid",updateAttraction);
    app.delete("/api/attraction/:aid",deleteAttraction)

    function deleteAttraction(req,res) {
        // var userId=req.params.uid;
        var attractionId=req.params.aid;
        // var entryId=req.params.eid;
        console.log("beofre deleting model")
        AttractionModel
            .deleteAttraction(attractionId)
            .then (function (entry) {
                    console.log("deleteAttraction delete at server service"+entry)
                    res.json(entry);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function updateAttraction(req,res){
        var attractionId=req.params.aid;
        var attraction=req.body;
        // console.log("user  in request  body"+user);

        AttractionModel
            .updateAttraction(attractionId,attraction)
            .then (function (attraction) {
                    console.log("entry update at server service"+attraction)
                    res.json(attraction);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findAttractionById(req,res) {

        console.log("attraction server service")

        attractionId=req.params.aid;
        AttractionModel
            .findAttractionById(attractionId)
            .then (function (status) {
                    // console.log("status at attraction service server : ",status)
                    //     console.log("step 7: service server success : ",status[0])
                    res.json(status);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function getAllAttractions(req,res) {
        // console.log("Step 3: attractin service server js")
        AttractionModel
            .getAllAttractions()
            .then (function (status) {
                // console.log("status at attraction service server : ",status)
                //     console.log("step 7: service server success : ",status[0])
                    res.json(status);
                },
                function (err) {
                    res.send(null);
                });
    }

    function findFavoritesByUserId(req,res) {
        var userId=req.params.uid;
        var attractionId=req.params.aid;

        AttractionModel
            .findFavoritesByUserId(userId,attractionId)
            .then (function (status) {
                    res.json(status);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function favorite(req,res) {
        // console.log("favorite : attraction service server attraction :",req.body)

        var userId=req.params.uid;
        var attractionId=req.params.aid;
        var status=req.params.sid;
        var attraction=req.body;

        AttractionModel
            .favorite(userId,attractionId,status,attraction)
            .then (function (status) {
                    res.json(status);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findPlaceByText(req,res) {
        // console.log("server : findplacebytext")
        var searchParam=req.query.place;
        // console.log("server search text: ",searchParam)
        AttractionModel
            .findPlaceByText(searchParam);
    }
}