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
        "title": "PubNub Tutorial: Using the Android Chat SDK",
        "url": "https://youtu.be/X7l23UKgPMA",
        "thumbnail": "https://youtu.be/X7l23UKgPMA/0.jpg",
        "imageAlt": "PubNub Tutorial: Using the Android Chat SDK",
        "description": "Tutorial showing how to use the PubNub Android Chat SDK with a dedicated sample application",
        "short": false,
        "editedIndependantly": true,
        "pubnub": true
    },
    {
        "title": "PubNub Tutorial: Using the Swift Chat SDK",
        "url": "https://youtu.be/jX_9P2DcPYU",
        "thumbnail": "https://youtu.be/jX_9P2DcPYU/0.jpg",
        "imageAlt": "PubNub Tutorial: Using the Swift Chat SDK",
        "description": "Tutorial showing how to use the PubNub Swift Chat with a dedicated sample application",
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

    // Use CSS Grid instead of Bootstrap rows/columns
    html += "<div class='videos-grid-container'>"

    for (var i = 0; i < videos.length; i++)
    {
        if (videos[i].pubnub == forPubNub)
        {
            html += createVideoPanelHeader()
            html += createVideoPanelContent(videos[i].title, videos[i].url, videos[i].thumbnail, videos[i].imageAlt, videos[i].description, videos[i].short, videos[i].editedIndependantly)
            html += createVideoPanelFooter()
        }
    }
    
    html += "</div>"
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
    html += "<div class='video-card h-100 border rounded-3 shadow-sm overflow-hidden'>"
    return html;
}

function createVideoPanelContent(title, url, thumbnail, imageAlt, description, short, editedIndependantly)
{
    var html = "";
    
    // Wrap entire card content in a clickable link
    html += "<a href='" + url + "' target='_blank' class='video-card-link text-decoration-none'>"
    
    // Video thumbnail container with overlay
    html += "<div class='video-image-container position-relative overflow-hidden'>"
    
    // Fix thumbnail URLs for YouTube API format
    var fixedThumbnail = thumbnail;
    if (thumbnail.includes('youtu.be/') && thumbnail.includes('/0.jpg')) {
        // Extract video ID from youtu.be format
        var videoId = thumbnail.split('youtu.be/')[1].split('/')[0];
        fixedThumbnail = 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
    }
    
    html += "<img class='img-fluid video-image' src='" + fixedThumbnail + "' alt='" + imageAlt + "' />"
    
    // Video type badge
    if (short) {
        html += "<div class='video-badge position-absolute'>"
        html += "<span class='badge bg-danger'>Short</span>"
        html += "</div>"
    }
    
    // Play button overlay
    html += "<div class='video-play-overlay position-absolute top-50 start-50 translate-middle'>"
    html += "<i class='fas fa-play-circle fa-4x text-white opacity-75'></i>"
    html += "</div>"
    
    html += "</div>"
    
    // Video content
    html += "<div class='video-content p-4'>"
    html += "<h5 class='video-title mb-3'>" + title + "</h5>"
    html += "<p class='video-description text-muted mb-3'>" + description + "</p>"
    html += "</div>"
    
    // Video actions
    html += "<div class='video-actions p-4 pt-0'>"
    html += "<div class='btn video-btn-primary w-100'>"
    html += "<i class='fab fa-youtube me-2'></i>Watch on YouTube</div>"
    html += "</div>"
    
    // Close the card link
    html += "</a>"
    
    return html;
}

function createVideoPanelFooter()
{
    var html = "";
    html += "</div>"
    return html;
}


