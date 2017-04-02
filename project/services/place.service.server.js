/**
 * Created by hiresave on 4/2/2017.
 */

module.exports = function (app,PlaceModel) {
    app.get("/api/name", findPlaceByText);

    function findPlaceByText(req,res) {
        console.log("server : findplacebytext")

        var searchParam=req.query.place;
        console.log("server search text: ",searchParam)
        PlaceModel
            .findPlaceByText(searchParam);
            // .then(function (place) {
            //         res.json(place);
            //
            //     },
            //     function (err) {
            //         res.sendStatus(400).send(err);
            //     });

    }
}