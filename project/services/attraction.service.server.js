/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (app,AttractionModel) {
    app.get("/api/name", findPlaceByText);
    app.post("/api/user/:uid/attraction/:aid/status/:sid",favorite);
    app.get("/api/user/:uid/attraction/:aid/status",findFavoritesByUserId);
    app.get("/api/admin/attractions",getAllAttractions)

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
                    res.sendStatus(400).send(err);
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