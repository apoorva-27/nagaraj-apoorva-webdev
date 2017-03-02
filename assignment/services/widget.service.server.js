/**
 * Created by hiresave on 3/1/2017.
 */

module.exports = function(app) {

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/page/:pageId/widget', createWidget);

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
        console.log("did itworktill here?")
        widgetId=req.params.widgetId;
        // console.log(widgetId)
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                console.log("fin d widget by id"+widgets[w])
                return;
            }
        }
       res.sendStatus(404);

    }

    function updateWidget(req,res) {
        var widgetId=req.params.widgetId;
        var widget=req.body;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets[w].text=widget.text;
                widgets[w].url=widget.url;
                widgets[w].name=widget.name;
                widgets[w].size=widget.size;
                widgets[w].width=widget.width;
                return;
            }
        }
        return null;
    }

    function createWidget(req,res) {
        var newWid=req.body;
        console.log("the whoewidget?" + newWid)

        var newwidget = {
            _id:newWid.id,//(new Date()).getTime().toString(),

        pageId:newWid.pageId,
            widgetType:newWid.widgetType
        }
        widgets.push(newwidget)
        console.log("newwidget"+newwidget)
        res.json(newwidget);
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
}