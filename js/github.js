
function populateGithubRepoCards(outputDiv) {
    populateGithubRepoCardsArray(testApi, outputDiv);
}

/*function populateGithubRepoCards(outputDiv)
{
    //  todo should not call the API every time - move to Firebase

    $.ajax({
        url:'https://api.github.com/users/darryncampbell/repos?per_page=30&page=1&sort=updated&direction=desc',
        headers: {
            "Accept": "application/vnd.github.v3+json",
            //"User-Agent": "darryncampbell",
            "Authorization": "",
            "Accept": "application/vnd.github.mercy-preview+json",
        },
        type:'GET',
        outputDiv: outputDiv,
        error: function()
        {
            //file not exists
            console.log("error");
        },
        success: function(data)
        {
            //file exists
            populateGithubRepoCardsArray(data, outputDiv);
        }
    });
}*/

function populateGithubRepoCardsArray(json, outputDiv) {
    console.log(outputDiv);
    var html = "";

    for (var i = 0; i < json.length; i++) {
        html += "<div class='card m-4 h-100' style='max-width: 30rem;'>";
        html += "<div class='card-block'>";
        html += "<div class='card-header'>";
        html += "<h5><a href='" + json[i].html_url + "'>" + json[i].name + "</a>";
        html += "</h5>";
        html += "</div>";
        html += "<div class='card-body p-2'>";
        html += "<h6 class='card-subtitle mb-2 text-muted'></h6>";
        html += "<div class='row'>";
        html += "<div class='col-4'>";
        var screenshot = resolveImage(json[i].name, json[i].html_url);
        var fallbackUrl = "";
        if (json[i].owner != null)
            fallbackUrl = json[i].owner.avatar_url;
        html += "<img class='img-fluid rounded' src='" + screenshot + "' alt='Repo image' onerror=\"this.onerror=null; this.src='" + fallbackUrl + "'\">";
        html += "</div>";
        html += "<div class='col-8'>";
        html += "<p class='card-text'>" + json[i].description;
        html += "<p class='font-italic'>";
        var updatedDate = new Date(json[i].pushed_at);
        html += "Updated: " + updatedDate.toDateString() + ".<br />";
        var createdDate = new Date(json[i].created_at);
        html += "Created: " + createdDate.toDateString() + ".";
        html += "</p>";
        html += "<a href='" + json[i].html_url + "/blob/master/README.md" + "'>View Readme</a>";
        html += "</p>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "<div class='card-footer text-muted flex-grow-1 bg-white'>";
        if (json[i].topics && json[i].topics.length > 0) {
            html += "Topics: ";
            for (var topic = 0; topic < json[i].topics.length; topic++) {
                html += "<span class='badge badge-pill badge-secondary'>" + json[i].topics[topic] + "</span>";
            }
            html += "<br />";
        }
        //html += "<span class="badge badge-pill badge-light"><i class="fa fa-android fa-lg"></i></span>
        html += "<span class='badge badge-pill badge-light'><i class='fa fa-star fa-lg' title='Stargazers'> " + json[i].stargazers_count + " </i></span>";
        //html += "<span class='badge badge-pill badge-light'><i class='fa fa-eye  fa-lg' title='Watchers'> " + json[i].watchers_count + " </i></span>";
        html += "<span class='badge badge-pill badge-light'><i class='fa fa-code-fork fa-lg'> " + json[i].forks_count + " </i></span>";
        if (json[i].language != null)
            html += "<span class='badge badge-pill badge-light'>" + json[i].language + "</span>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
    }

    document.getElementById(outputDiv).innerHTML = html;
}

function resolveImage(repoName, repoUrl) {
    switch (repoName) {
        case "DataWedge-VoiceRecognition-Sample":
            return repoUrl + "/raw/master/screenshots/app_1.jpg";
        case "DataWedge-Cordova-Sample":
            return repoUrl + "/raw/master/screens/application01.png";
        case "WiFi-RTT-Trilateration":
            return repoUrl + "/raw/master/screenshots/002.png";
        case "EMDK-DeviceIdentifiers-Sample":
            return repoUrl + "/raw/master/screenshots/working.jpg";
        case "DataWedge-Background-Scanning":
            return repoUrl + "/raw/master/screenshots/launcher.jpg";

    }
    return repoUrl + "/raw/master/screenshots/app.jpg";
}




