/**
 * Created by hiresave on 3/1/2017.
 */

module.exports = function(app) {

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put("/page/:pageId/widget", sortWidget);

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "Lorem"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "Lorem"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "name": "Lorem"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "name": "Lorem", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "name": "Lorem", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "name": "Lorem", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "name": "Lorem", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        var wigen=[]
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                wigen.push(widgets[w]);
            }
        }
        res.json(wigen);
    }

    function findWidgetById(req,res) {
        widgetId=req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
        }
       res.sendStatus(404);
    }

    function updateWidget(req,res) {
            var widgetId=req.params['widgetId'];
            var widget=req.body;
            for(var w in widgets){
                var widget_var=widgets[w];
                if(widget_var._id === widgetId){
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].width = widget.width;
                    widgets[w].text = widget.text;
                    widgets[w].size=widget.size;
                    widgets[w].url=widget.url;
                    //return widgets[w];
                    res.send(widgets[w]);
                    return;
                }
            }
    }

    function createWidget(req,res) {
        var newWid=req.body;
        newWid.pageId = req.params['pageId'];
        widgets.push(newWid);
        res.sendStatus(200);
    }

    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;
        var wigen=[]
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function sortWidget(req, res) {
            var pid = req.params['pageId'];
            var i1 = parseInt(req.query.initial);
            var i2 = parseInt(req.query.final);

            var widgetsForGivenPage = [];
            for (var index in widgets) {
                if (widgets[index].pageId === pid) {
                    widgetsForGivenPage.push(index);
                }
            }

            for (var i = i1; i < i2; i++) {
                var temp = widgets[widgetsForGivenPage[i]];
                widgets[widgetsForGivenPage[i]] = widgets[widgetsForGivenPage[i+1]];
                widgets[widgetsForGivenPage[i+1]] = temp;
            }

            for (var i = i1; i > i2; i--) {
                var temp = widgets[widgetsForGivenPage[i]];
                widgets[widgetsForGivenPage[i]] = widgets[widgetsForGivenPage[i-1]];
                widgets[widgetsForGivenPage[i-1]] = temp;
            }
        res.sendStatus(200);
        }

    function uploadImage(req, res) {
            var pageId = null;
            var widgetId = req.body.widgetId;
            var width = req.body.width;
            var userId = req.body.userId;
            var websiteId = req.body.websiteId;

            if (req.file != null) {
                var myFile = req.file;
                var destination = myFile.destination; // folder where file is saved to

                for (var i in widgets) {
                    if (widgets[i]._id === widgetId) {
                        widgets[i].width = width;
                        widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

                        pageId = widgets[i].pageId;
                    }
                }
                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
            }
            else{
                pageId = req.body.pageId;
                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
            }
        }
}