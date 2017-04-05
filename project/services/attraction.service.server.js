/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (app,AttractionModel) {
    app.get("/api/name", findPlaceByText);
    app.post("/api/user/:uid/attraction/:aid/status/:sid",favorite);

    function favorite(req,res) {
        console.log("favorite : attraction service server attraction :",req.body)

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
        console.log("server : findplacebytext")

        var searchParam=req.query.place;
        console.log("server search text: ",searchParam)
        PlaceModel
            .findPlaceByText(searchParam);
    }


}