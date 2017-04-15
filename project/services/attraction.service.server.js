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
        var attractionId=req.params.aid;
        AttractionModel
            .deleteAttraction(attractionId)
            .then (function (entry) {
                    res.json(entry);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function updateAttraction(req,res){
        var attractionId=req.params.aid;
        var attraction=req.body;

        AttractionModel
            .updateAttraction(attractionId,attraction)
            .then (function (attraction) {
                    res.json(attraction);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findAttractionById(req,res) {

        attractionId=req.params.aid;
        AttractionModel
            .findAttractionById(attractionId)
            .then (function (status) {
                    res.json(status);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function getAllAttractions(req,res) {
        AttractionModel
            .getAllAttractions()
            .then (function (status) {
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
        var searchParam=req.query.place;
        AttractionModel
            .findPlaceByText(searchParam);
    }
}