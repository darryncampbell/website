var videos = [
    {
        "title": "How to Enable and Configure PubNub Presence",
        "url": "https://www.youtube.com/watch?v=YGrrFUlO_Ys",
        "thumbnail": "https://img.youtube.com/vi/YGrrFUlO_Ys/0.jpg",
        "imageAlt": "How to Enable and Configure PubNub Presence",
        "description": "Overview of PubNub Presence, including how to enable the feature and what configuration is available",
        "short": false,
        "editedIndependantly": true,
        "pubnub": true
    },
    {
        "title": "How to Enable and Configure PubNub Presence (Short)",
        "url": "https://www.youtube.com/shorts/Trj64j5hsSU",
        "thumbnail": "https://i.ytimg.com/vi/Trj64j5hsSU/oar2.jpg",
        "imageAlt": "How to Enable and Configure PubNub Presence",
        "description": "Overview of PubNub Presence, including how to enable the feature and what configuration is available",
        "short": true,
        "editedIndependantly": true,
        "pubnub": true
    },
    {
        "title": "PubNub Tutorial: Using the Chat SDK",
        "url": "https://www.youtube.com/watch?v=_iHHCUn4aMU",
        "thumbnail": "https://img.youtube.com/vi/_iHHCUn4aMU/0.jpg",
        "imageAlt": "PubNub Tutorial: Using the Chat SDK",
        "description": "Tutorial showing how to use the PubNub Chat SDK and modify the sample application",
        "short": false,
        "editedIndependantly": true,
        "pubnub": true
    },
    {
        "title": "How to Build a Slack-like Chat app in 6 minutes - full video",
        "url": "https://www.youtube.com/watch?v=sGusw99l9eI",
        "thumbnail": "https://img.youtube.com/vi/sGusw99l9eI/0.jpg",
        "imageAlt": "How to Build a Slack-like Chat app in 6 minutes",
        "description": "Overview of PubNub Presence, including how to enable the feature and what configuration is available",
        "short": false,
        "editedIndependantly": false,
        "pubnub": true
    }
]




function loadVideosVideoPage()
{
    loadVideosTable('videos-videopage-pubnub', true);
}

function loadVideosTable(targetTag, forPubNub)
{
    var tag = document.getElementById(targetTag);
    var html = ""
    var count = 0;

    for (var i = 0; i < videos.length; i++)
    {
        if (count != 0 && count % 3 == 0)
        {
            html += createVideoRowEnd()
        }
        if (i == 0 || (count > 0 && count % 3 == 0))
        {
            html += createVideoRowStart()
        }
        if (videos[i].pubnub == forPubNub)
        {
            html += createVideoPanelHeader()
            html += createVideoPanelContent(videos[i].title, videos[i].url, videos[i].thumbnail, videos[i].imageAlt, videos[i].description, videos[i].short, videos[i].editedIndependantly)
            html += createVideoPanelFooter()
            count++;
        }
    }

    tag.innerHTML = html;

}

function createVideoRowStart()
{
    return "<div class='row text-center'>"
}

function createVideoRowEnd()
{
    return "</div>"
}

function createVideoPanelHeader()
{
    var html = "";
    html += "<div class='col-md-6 col-lg-4 mb-0'>"
    html += "<div class='portfolio-item mx-auto border rounded p-2 demo-container'>"
    return html;
}

function createVideoPanelContent(title, url, thumbnail, imageAlt, description, short, editedIndependantly)
{
    var html = "";
    html += "<div class='portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100'>"
    html += "<H4>" + title + "</H4>"
    html += "</div>"
    html += "<div class='demo-image-container'>"
    html += "<a href='" + url + "' target='_blank'>"
    html += "<img class='img-fluid demo-image' style='max-height: 20rem;' src='" + thumbnail + "' alt='" + imageAlt + "' />"
    html += "</a>"
    html += "</div>"
    html += "<p class='demo-description'><br>" + description + "</p>"
    html += "<p class='text-end demo-links'>"
    if (editedIndependantly)
    {
        html += "Edited myself | "
    }
    html += "<a href='" + url + "' target='_blank'>YouTube</a>"
    html += "</p>"
    return html;
}

function createVideoPanelFooter()
{
    var html = "";
    html += "</div>"
    html += "</div>"
    return html;
}


