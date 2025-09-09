
function populateSpeakingSlots(outputUpcoming, outputPast) {
    //  todo call this once for upcoming and once for past
    pastEvents = [];
    futureEvents = [];
    for (var i = 0; i < speakingEvents.length; i++) {
        if (speakingEvents[i].date != null) {
            var eventDate = new Date(speakingEvents[i].date);
            var now = new Date();
			now.setDate(now.getDate()- 1);
            if (eventDate >= now)
                futureEvents.push(speakingEvents[i]);
            else
                pastEvents.push(speakingEvents[i]);
        }
    }

    pastEvents.sort(GetSortOrderAsc("date"));
    futureEvents.sort(GetSortOrderDesc("date"));
    populateSpeaking(pastEvents, outputPast);
    populateSpeaking(futureEvents, outputUpcoming);
}

function GetSortOrderDesc(prop) {    
    return function(a, b) {    
        if (new Date(a[prop]) > new Date(b[prop])) {    
            return 1;    
        } else if (new Date(a[prop]) < new Date(b[prop])) {    
            return -1;    
        }    
        return 0;    
    }    
}    
function GetSortOrderAsc(prop) {    
    return function(a, b) {    
        if (new Date(a[prop]) > new Date(b[prop])) {    
            return -1;    
        } else if (new Date(a[prop]) < new Date(b[prop])) {    
            return 1;    
        }    
        return 0;    
    }    
}    

function populateSpeaking(json, outputDiv) {
    var html = "";
    
    for (var i = 0; i < json.length; i++) {
        html += "<div class='col-lg-6 mb-4'>";
        html += "<div class='speaking-card h-100 border rounded-3 shadow-sm overflow-hidden'>";
        
        // Modern card header with image and title
        html += "<div class='speaking-card-header position-relative'>";
        if (json[i].imgSrc != "") {
            html += "<div class='speaking-image-container'>";
            html += "<img class='speaking-image w-100' src='" + json[i].imgSrc + "' alt='Speaking Engagement Image' />";
            html += "<div class='speaking-image-overlay'></div>";
            html += "</div>";
        }
        html += "<div class='speaking-header-content p-3'>";
        html += "<h4 class='speaking-title mb-2'>" + json[i].title + "</h4>";
        html += "<div class='speaking-meta'>";
        html += "<div class='speaking-date mb-2'>";
        html += "<i class='fas fa-calendar-alt me-2 text-primary'></i>";
        html += "<span class='fw-semibold'>" + json[i].userDate + "</span>";
        html += "</div>";
        html += "<div class='speaking-location mb-2'>";
        html += "<i class='fas fa-map-marker-alt me-2 text-primary'></i>";
        html += "<span>" + json[i].location + "</span>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        
        // Enhanced content section
        html += "<div class='speaking-content p-3'>";
        
        // Additional info if present
        if (json[i].otherInfo && json[i].otherInfo.length > 0) {
            for (var j = 0; j < json[i].otherInfo.length; j++) {
                if (json[i].otherInfo[j] && json[i].otherInfo[j].trim() !== "") {
                    html += "<div class='speaking-extra-info mb-2'>";
                    html += "<i class='fas fa-info-circle me-2 text-info'></i>";
                    html += "<small class='text-muted'>" + json[i].otherInfo[j] + "</small>";
                    html += "</div>";
                }
            }
        }
        
        // Description with better typography
        html += "<div class='speaking-description mb-3'>";
        html += "<p class='text-muted mb-0'>" + json[i].brief + "</p>";
        html += "</div>";
        html += "</div>";
        
        // Modern action buttons footer
        if (json[i].linkButtons && json[i].linkButtons.length > 0) {
            html += "<div class='speaking-actions p-3'>";
            html += "<div class='d-flex flex-wrap gap-2'>";
            
            for (var k = 0; k < json[i].linkButtons.length; k++) {
                var buttonText = json[i].linkButtons[k].text;
                var buttonLink = json[i].linkButtons[k].link;
                
                // Determine button style based on content
                var buttonClass = "speaking-btn-secondary";
                var iconClass = "fas fa-external-link-alt";
                
                if (buttonText.toLowerCase().includes('slide')) {
                    buttonClass = "speaking-btn-primary";
                    iconClass = "fas fa-file-powerpoint";
                } else if (buttonText.toLowerCase().includes('video') || buttonText.toLowerCase().includes('recording')) {
                    buttonClass = "speaking-btn-primary"; 
                    iconClass = "fas fa-video";
                } else if (buttonText.toLowerCase().includes('register')) {
                    buttonClass = "speaking-btn-success";
                    iconClass = "fas fa-user-plus";
                }
                
                if (buttonLink == "" || !buttonLink) {
                    html += "<button class='btn " + buttonClass + " btn-sm disabled' disabled>";
                    html += "<i class='" + iconClass + " me-2'></i>" + buttonText + " (Not Available)";
                    html += "</button>";
                } else {
                    html += "<a href='" + buttonLink + "' target='_blank' class='btn " + buttonClass + " btn-sm'>";
                    html += "<i class='" + iconClass + " me-2'></i>" + buttonText;
                    html += "</a>";
                }
            }
            html += "</div>";
            html += "</div>";
        }
        
        html += "</div>";  // Close speaking-card
        html += "</div>";  // Close column
    }
    
    // Wrap in row if we have content
    if (html) {
        html = "<div class='row'>" + html + "</div>";
    } else {
        html = "<div class='row'><div class='col-12 text-center'><p class='text-muted'>No speaking engagements found.</p></div></div>";
    }
    
    document.getElementById(outputDiv).innerHTML = html;
}



var speakingEvents = [
    {
        "date": "June 25, 2026",
        "imgSrc": "./assets/img/speaking/real-time-data-summit-2024.png",
        "title": "Add Real-Time Features to your Mobile App",
        "userDate": "25th June 2024 at TBD BST (GMT + 1)",
        "location": "Online Conference",
        "otherInfo": [
            ""        
        ],
        "brief": "Real-time features will enhance your user experience and improve engagement with your app. However, implementing real-time functionality at scale and cross-platform is not simple, especially when real-time means different things to different apps. <P>You might be tracking a user's location, showing live weather warnings, collaboratively editing a document, or allowing your users to chat with each other. What are the right tools to use? There is no one-size-fits-all, but you don't want to end up with a mashup of storage and transport APIs bloating your app. <P>This talk will discuss the challenges and solutions in maintaining performance and scalability when adding real-time capabilities to your app, whether you are developing the latest hit game or the most useful utility that everyone doesn't yet realise they can't live without.",
        "linkButtons":
            [
                {
                    "text": "Conference Website",
                    "link": "https://www.realtimedatasummit.com/"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20240625_realtime-data-summit.pdf"
                },
                {
                    "text": "Recording",
                    "link": ""
                }
            ]
    },
{
        "date": "April 30, 2026",
        "imgSrc": "./assets/img/speaking/android_worldwide_speaker.png",
        "title": "Add Real-Time Features to your Mobile App",
        "userDate": "30th April 2024 at 1815 BST (GMT + 1)",
        "location": "Online Conference",
        "otherInfo": [
            ""        
        ],
        "brief": "Real-time features will enhance your user experience and improve engagement with your app. However, implementing real-time functionality at scale and cross-platform is not simple, especially when real-time means different things to different apps. <P>You might be tracking a user's location, showing live weather warnings, collaboratively editing a document, or allowing your users to chat with each other. What are the right tools to use? There is no one-size-fits-all, but you don't want to end up with a mashup of storage and transport APIs bloating your app. <P>This talk will discuss the challenges and solutions in maintaining performance and scalability when adding real-time capabilities to your app, whether you are developing the latest hit game or the most useful utility that everyone doesn't yet realise they can't live without.",
        "linkButtons":
            [
                {
                    "text": "Conference Website",
                    "link": "https://android-worldwide.com/"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20240430_android_worldwide_realtime.pdf"
                },
                {
                    "text": "Recording",
                    "link": "https://youtu.be/BFRYiBc35w8"
                }
            ]
    },
    {
        "date": "October 20, 2023",
        "imgSrc": "./assets/img/speaking/gamescom_asia_2023.jpg",
        "title": "Add real-time interactive features to your online games",
        "userDate": "19th October 2023 at 1330 local time",
        "location": "Suntec Convention & Exhibition Centre, Singapore",
        "otherInfo": [
            "Talk will not be recorded"        
        ],
        "brief": "Social features such as chat, friend list management, item trading, and real-time leaderboards are great ways to foster a community around your multiplayer game and increase player retention.  Unfortunately, these real-time features aren’t easy to develop and often get left until the tail end of your development cycle, leading to a frustrating experience for both devs and players.<br><br>In this talk, we will show you some of the best practices used by studios and indie devs as they add social features to their apps and demo how you can easily add these live features into your own game.",
        "linkButtons":
            [
                {
                    "text": "Event Page",
                    "link": "https://bizcommunity.gamescom.global/event/gamescom-asia-2023/planning/UGxhbm5pbmdfMTYwNjU4MA=="
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20231019_gamescom_real_time.pdf"
                },
                {
                    "text": "Playlist of Videos used during presentation",
                    "link": "https://www.youtube.com/watch?v=rwYH7qQA0AI&list=PLdHg3OfLiYCUF31oxW0EHw1bDejNKxI1b&index=1"
                }
            ]
    },
    {
        "date": "August 21, 2023",
        "imgSrc": "./assets/img/speaking/devcom_2023_1.jpg",
        "title": "Add real-time interactive features to your online games",
        "userDate": "21st August 2023 at 1300 local time",
        "location": "Cologne, Germany",
        "otherInfo": [
            "Stage 9 - Kongressaal 1"        
        ],
        "brief": "Social features such as chat, friend list management, item trading, and real-time leaderboards are great ways to foster a community around your multiplayer game and increase player retention.  Unfortunately, these real-time features aren’t easy to develop and often get left until the tail end of your development cycle, leading to a frustrating experience for both devs and players.<br><br>In this talk, we will show you some of the best practices used by studios and indie devs as they add social features to their apps and demo how you can easily add these live features into your own game.",
        "linkButtons":
            [
                {
                    "text": "Conference Page",
                    "link":"https://bizcommunity.gamescom.global/event/devcom-developer-conference-2023/planning/UGxhbm5pbmdfMTQ3MTM0Nw=="
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20230821_devcomm_real_time.pdf"
                },
                {
                    "text": "Recording of Talk",
                    "link": "https://www.youtube.com/watch?v=T4wRC8QAetk"
                },
                {
                    "text": "Playlist of Videos used during presentation",
                    "link": "https://www.youtube.com/watch?v=rwYH7qQA0AI&list=PLdHg3OfLiYCUF31oxW0EHw1bDejNKxI1b&index=1"
                }
            ]
    },
    {
        "date": "July 26, 2023",
        "imgSrc": "./assets/img/speaking/pubnub_build_chat_app.png",
        "title": "Marketing Video: Build a Chat App with PubNub",
        "userDate": "26th July 2023",
        "location": "Online Video",
        "otherInfo": [            
        ],
        "brief": "Build a chat app like slack or discord in around 6 minutes with PubNub",
        "linkButtons":
            [
                {
                    "text": "Video (Full)",
                    "link": "https://www.youtube.com/watch?v=sGusw99l9eI"
                },
                {
                    "text": "Video (Ad)",
                    "link": "https://www.youtube.com/watch?v=NRdCW2oSII4"
                }
            ]
    },
    {
        "date": "December 7, 2022",
        "imgSrc": "./assets/img/speaking/pubnub_rncc.png",
        "title": "Product Launch: React Native Chat Components",
        "userDate": "7th December 2022",
        "location": "Online Webinar",
        "otherInfo": [            
        ],
        "brief": "What more would you do if you didn’t have to deal with the headache that comes with setting up real-time infrastructure for chat in your React Native app?  <p class='lead'>Now’s your chance to find out!<p class='lead'>Join our Product Marketing Manager, Lukasz Smacki and Developer Advocate, Darryn Campbell on December <b>7th at 9:00 am PST / 12:00 pm EST</b> to hear more about the release of our new React Native Chat Components and learn:<ul><li>When React Native is the perfect choice for a mobile app project<li>How PubNub Chat UI Components make it easy to build and maintain chat without sacrificing flexibility<li>How to add chat to a React Native app in as little as 10 minutes",
        "linkButtons":
            [
                {
                    "text": "Registration Link",
                    "link": "https://www.pubnub.com/resources/webinar/save-time-building-with-pubnub-react-native-chat-components/"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20221207_react_native_chat_components.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=lpjAShZ9EqQ"
                },
            ]
    },
    {
        "date": "March 16, 2022",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: DataWedge OCR, Barcode Highlighting & Free-form Image capture",
        "userDate": "16th March 2022",
        "location": "Online Webinar",
        "otherInfo": [            
        ],
        "brief": "DataWedge 11.2 adds a new 'Workflow' input plugin which allows for more complex data capture workflows. Using this new plugin you can now capture a free-form image using the built-in scanner, highlight barcodes of interest or perform optical character recognition (OCR) on any of the following:<ul><li>License plates</li><li>Identity documents</li><li>Vehicle identification number</li><li>Tyre identification number</li><li>Gas or electric meter reading</li></ul>",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20220316_devtalk_datawedgeocr.pdf"
                },
                {
                    "text": "Video",
                    "link": ""
                },
            ]
    },
	{
        "date": "March 17, 2022",
        "imgSrc": "./assets/img/speaking/zebra_ionic.png",
        "title": "Advanced inventory management with Zebra DataWedge and Ionic",
        "userDate": "17th March 2022 at 5pm GMT",
        "location": "Online Webinar",
        "otherInfo": [            
        ],
        "brief": "Thanks to the supported integration, Zebra Android mobile computers can share inventory data with enterprise applications quickly. If you're building mission-critical inventory management apps or looking to get the most out of your existing Zebra investment, don't miss this webinar..<br><br>In this webinar, James Dallas, Product Manager at Ionic, and Darryn Campbell, Senior Enterprise Software Architect at Zebra, will introduce Ionic’s new Zebra DataWedge integration. Topics will include:<br><ul><li>Overview of Zebra DataWedge for mobile computing devices.</li><li>What's new with Ionic Capacitor and enterprise use-cases.</li><li>Live Demo app using Zebra DataWedge integration</li>",
        "linkButtons":
            [
                {
                    "text": "Ionic Blog",
                    "link": "https://blog.ionicframework.com/announcing-zebra-datawedge-integration/"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20220317_ionic_plugin.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://ionic.io/resources/webinars/ionic-zebra-datawedge-integration-webinar"
                },
            ]
    },
    {
        "date": "September 15, 2021",
        "imgSrc": "./assets/img/speaking/android11.png",
        "title": "DevTalk: What's new for Zebra developers in Android 11",
        "userDate": "15th September 2021",
        "location": "Online Webinar",
        "otherInfo": [            
        ],
        "brief": "Android 11 comes with a slew of new features for enterprise developers as well as changes to user privacy and app behaviour.<br><br>In this session, Darryn Campbell will cover how these new privacy and behaviour changes affect enterprise applications and help you prepare for the upcoming update.<br><br>If you have questions about how your app should deal with Scoped Storage or location in Android 11 then please plan on attending.",
        "linkButtons":
            [
                {
                    "text": "Register",
                    "link": "https://register.gotowebinar.com/register/8982955439634635279"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20210915_devtalk_android11.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=xm-_8kjiXlM"
                },
            ]
    },
    {
        "date": "October 22, 2021",
        "imgSrc": "./assets/img/speaking/droidcon_berlin_2021.jpg",
        "title": "Droidcon Berlin 2021: Writing Apps for the Work Profile",
        "userDate": "20th - 22nd October 2021",
        "location": "CityCube, Berlin",
        "otherInfo": [
            
        ],
        "brief": "Android’s Work Profile has been around since Lollipop & it’s a great way to separate your work and personal lives but having your app live in that work profile comes with some special considerations – how does it get installed? How does it get configured? How will the employee’s administrator expect my app to behave?<br><br>I have been working with Enterprise applications since the Work profile was first introduced and, in this talk, I will walk through how to create the best experience both for the end user and their device administrator.",
        "linkButtons":
            [
                {
                    "text": "Register",
                    "link": "https://www.berlin.droidcon.com/"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20211020_droidcon_berlin.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.droidcon.com/2021/11/10/writing-apps-for-the-work-profile/"
                },
            ]
    },
    {
        "date": "November 5, 2021",
        "imgSrc": "./assets/img/speaking/appforum_emea_2021.png",
        "title": "Zebra DevCon 2021 (Zebra developer conference, formally known as AppForum)",
        "userDate": "3rd - 5th November 2021",
        "location": "Online conference",
        "otherInfo": [
            "I will be presenting multiple topics at the 2021 Zebra Developer conference:"
        ],
        "brief": "<b>Updating your app for scoped storage and enterprise persistence</b><br>Android 11 and 12 are seeing big changes around how your application can use Android’s external storage and how you can persist applications across an Enterprise Reset.  This talk will take a deep dive into what you need to do to prepare for these changes and cover Zebra’s recommended techniques for dealing with Android’s scoped storage and enterprise reset persistence.<br><br><b>What's new for Enterprise Developers in Android 11 & 12</b><br>In this talk I will cover some of the new & upcoming features in Android 11 & 12, taking a close look at which features are likely to impact your enterprise deployment.<br><br>  <b>EMM (MDM) and application management</b><br>More and more companies are adopting an EMM (Enterprise Mobility Manager, previously known as an MDM) to deploy and manage their devices and applications.  EMMs themselves have undergone a recent transition to Device Owner (or ‘fully managed devices’).  This talk will demystify the terminology and provide guidance on how application developers and device administrators can adapt to using an EMM for both device and application management.",
        "linkButtons":
            [
                /*{
                    "text": "Landing Page",
                    "link": "https://www.zebra.com/us/en/events/devcon.html"
                },
                {
                    "text": "Register",
                    "link": "https://events.zebra.com/devcon_2021_registration"
                },*/
                {
                    "text": "Slides - EMM (MDM) and application management",
                    "link": "./assets/slides/20211103_appforum_emm_app_management.pdf"
                },
                {
                    "text": "Slides - Scoped Storage",
                    "link": "./assets/slides/20211103_appforum_scoped_storage.pdf"
                },
                {
                    "text": "Slides - What's new in Android 11 &amp; 12",
                    "link": "./assets/slides/20211103_appforum_android_11_12.pdf"
                },
                {
                    "text": "Recording - EMM (MDM) and application management",
                    "link": "https://www.youtube.com/watch?v=X2MzbayJFuc"
                },
                {
                    "text": "Recording - Scoped Storage",
                    "link": "https://www.youtube.com/watch?v=cEP__l7Hbxc"
                },
                {
                    "text": "Recording - What's new in Android 11 &amp; 12",
                    "link": "https://www.youtube.com/watch?v=gArodeMxHJM"
                }
            ]
    },
    {
        "date": "June 23, 2021",
        "imgSrc": "./assets/img/speaking/ioniconf_2021.png",
        "title": "Ionic in the Enterprise",
        "userDate": "23rd June 2021",
        "location": "Online webinar - IoniConf 2021",
        "otherInfo": [
            "Registration Link: See below",
        ],
        "brief": "There are a significant and increasing number of developers that target Android Enterprise who choose to develop with Ionic.  I will share why enterprise developers choose to use Ionic, how Zebra Technologies have enabled Ionic developers and talk about my own anecdotal experience working with the Ionic community from an Android Enterprise perspective.",
        "linkButtons":
            [
                {
                    "text": "Register",
                    "link": "https://ionic.io/ioniconf"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20210623_ioniconf.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=2AezKG8_0u4"
                },
            ]
    },
	{
        "date": "May 19, 2021",
        "imgSrc": "./assets/img/speaking/devtalk_2021_05.png",
        "title": "What’s new in Mobility DNA (Revised & Updated)",
        "userDate": "19th May 2021 (EMEA / NALA)",
        "location": "Online webinar - DevTalk Community Day",
        "otherInfo": [
            "Registration Link: See below",
        ],
        "brief": "Mobility DNA gives Zebra mobile computers their distinct enterprise capabilities.  In this 1 hour session I will take a whirlwind tour of some of the latest features added to Mobility DNA to make a user’s life easier, from simpler update distribution to new APIs to the latest features of MX and DataWedge (& more!).",
        "linkButtons":
            [
                //{
                //    "text": "Register (EMEA / NALA)",
                //    "link": "https://developer.zebra.com/ZebraDevTalksCommunityDayMay2021"
                //},
                {
                    "text": "Slides",
                    "link": "./assets/slides/20210519_devtalk_day_mdna_2.pdf"
                },
                {
                    "text": "Video (EMEA / NALA)",
                    "link": "https://www.youtube.com/watch?v=WdxaW8ytU34"
                }
            ]
    },
	{
        "date": "July 29, 2021",
        "imgSrc": "./assets/img/speaking/devtalk_2021_07.png",
        "title": "What’s new in Mobility DNA (Revised & Updated)",
        "userDate": "29th July 2021 (APAC)",
        "location": "Online webinar - DevTalk Community Day",
        "otherInfo": [
            "Registration Link: See below",
        ],
        "brief": "Mobility DNA gives Zebra mobile computers their distinct enterprise capabilities.  In this 1 hour session I will take a whirlwind tour of some of the latest features added to Mobility DNA to make a user’s life easier, from simpler update distribution to new APIs to the latest features of MX and DataWedge (& more!).",
        "linkButtons":
            [
                {
                    "text": "Landing Page",
                    "link": "https://hopin.com/events/devtalks-community-day"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20210729_devtalk_day_apac_mdna.pdf"
                }
            ]
    },
	{
        "date": "April 15, 2021",
        "imgSrc": "./assets/img/speaking/droidcon_online_2021.png",
        "title": "Droidcon Online Webinar: Indoor Locationing, It should be easy, right?",
        "userDate": "15th April 2021.  I am talking at 1700 CET / 1100 EST / 1600 BST",
        "location": "Online",
        "otherInfo": [
        ],
        "brief": "\"OK Google, turn the light on\". How would you implement that use case? If I ask my Google home, it doesn’t have a problem but if I ask my Android phone the results are less impressive(!) There is almost too much choice when it comes to indoor location technologies, from WiFi signal strength to BLE beacons to the RTT technology that saw adoption in Android Pie. You can also add on top of these all manner of 3rd party solutions based on anything from light codes to virtual beacons.<br><br>In this talk I will discuss the various options available to Android developers, their advantages and disadvantages and where they fit into a larger solution. Most of the talk will be dedicated to WiFi RTT (also known as 802.11mc) focusing on its current state of development, how well it works today and what potential this technology offers for the future. I will then dive deeper into how to develop an application using WiFi RTT, how to trilaterate your location and some of the set-backs you will experience when deploying in a real-world scenario.",
        "linkButtons":
            [
                {
                    "text": "Register",
                    "link": "https://www.online.droidcon.com/webinar/indoor-locationing"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20210415_droidcon_online.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.droidcon.com/media-detail?video=537641018"
                },
            ]
    },
	{
        "date": "March 17, 2021",
        "imgSrc": "./assets/img/speaking/devtalk_2021_03.png",
        "title": "What’s new in Mobility DNA",
        "userDate": "17th March 2021",
        "location": "Online webinar",
        "otherInfo": [
            "Registration Link: See below",
        ],
        "brief": "Mobility DNA gives Zebra mobile computers their distinct enterprise capabilities.  In this 1 hour session I will take a whirlwind tour of some of the latest features added to Mobility DNA to make a user’s life easier, from simpler update distribution to new APIs to the latest features of MX and DataWedge (& more!).",
        "linkButtons":
            [
                {
                    "text": "Register",
                    "link": "https://attendee.gotowebinar.com/register/3767119664239405582?source=devportal"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20210317_devtalk_mdna.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=fWdgeM3Aid8"
                },
            ]
    },
	{
        "date": "November 27, 2020",
        "imgSrc": "./assets/img/speaking/droidcon_italy_2020.png",
        "title": "Droidcon Italy 2020: Indoor Locationing, It should be easy, right?",
        "userDate": "27th / 28th November 2020.  I am talking on 28th at 1700 CET",
        "location": "Online",
        "otherInfo": [
        ],
        "brief": "\"OK Google, turn the light on\". How would you implement that use case? If I ask my Google home, it doesn’t have a problem but if I ask my Android phone the results are less impressive(!) There is almost too much choice when it comes to indoor location technologies, from WiFi signal strength to BLE beacons to the RTT technology that saw adoption in Android Pie. You can also add on top of these all manner of 3rd party solutions based on anything from light codes to virtual beacons.<br><br>In this talk I will discuss the various options available to Android developers, their advantages and disadvantages and where they fit into a larger solution. Most of the talk will be dedicated to WiFi RTT (also known as 802.11mc) focusing on its current state of development, how well it works today and what potential this technology offers for the future. I will then dive deeper into how to develop an application using WiFi RTT, how to trilaterate your location and some of the set-backs you will experience when deploying in a real-world scenario.",
        "linkButtons":
            [
                {
                    "text": "Register",
                    "link": "https://it.droidcon.com/2020/"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20201128_droidcon_turin.pdf"
                },
                {
                    "text": "Video",
                    "link": ""
                },
            ]
    },
	{
        "date": "November 18, 2020",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "Enterprise Keyboard and the Enterprise Keyboard Designer",
        "userDate": "November 18th, 2020",
        "location": "Online webinar",
        "otherInfo": [
            "Registration Link: See below",
        ],
        "brief": "Zebra’s Enterprise Keyboard and it’s associated designer tool allow developers to create custom keyboard layouts specifically tailored for enterprise deployments on Zebra devices. For example, if your application only needs a keyboard with Function keys F1 to F5 you can do that. This DevTalk will discuss these tools and give some examples of how they can be used.",
        "linkButtons":
            [
                {
                    "text": "Register",
                    "link": "https://developer.savanna.zebra.com/blog/zebra-devtalk-whats-new-enterprise-browser-and-enterprise-browser-keyboard"
                },
                {
                    "text": "Slides",
                    "link": "./assets/slides/20201118_devtalk_ekb_ekd.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=il7MHxeJE7Y"
                },
            ]
    },
    {
        "date": "August 19, 2020",
        "imgSrc": "./assets/img/speaking/datawedge8x.png",
        "title": "Latest features in DataWedge 8.x",
        "userDate": "19th August, 2020",
        "location": "Online webinar",
        "otherInfo": [
            "Registration Link: Coming soon...",
            "Co-presented with Zebra software engineer Cathy Wei"
        ],
        "brief": "DataWedge is the recommended approach for capturing data on Zebra Android mobile computers – barcode scanning, RFID or even voice.  Over the past few months we have added even more features to DataWedge such as multiple barcode scanning, enhanced security, OCR, signature capture, new decoder support and much more including details of the 'Next Generation SimulScan'.  These features are available for free on our enterprise-series Android devices so learn how to take advantage of them in this webinar",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20200819_devtalk_datawedge_8x.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=tDFjTyxmOGA"
                },
            ]
    },
    {
        "date": "July 15, 2020",
        "imgSrc": "./assets/img/speaking/android10.png",
        "title": "DevTalk: What's new for Zebra developers in Android 10",
        "userDate": "15th July, 2020",
        "location": "Online webinar",
        "otherInfo": [
            "Related Developer portal post: <a href='https://developer.zebra.com/blog/what%E2%80%99s-new-android-10-and-impact-zebra-developers'>What's new in Android 10 & the impact on Zebra Developers</a>",
        ],
        "brief": "Android 10 comes with a slew of new features for enterprise developers as well as changes to user privacy and app behaviour. <br><BR>In this session Darryn Campbell will cover how these new privacy and behaviour changes affect enterprise applications and help you prepare for the upcoming update. <BR><BR>If you have questions about how your app should deal with device identifiers or scoped storage in Android 10 then please plan on attending",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20200715_devtalk_android10.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=iJ4FTp-CbRA"
                },
            ]
    },
    {
        "date": "May 20, 2020",
        "imgSrc": "./assets/img/speaking/devtalk_eb_2.5.jpg",
        "title": "DevTalk: Enterprise Browser 2.5",
        "userDate": "20th May 2020",
        "location": "Online webinar",
        "otherInfo": [
        ],
        "brief": " Enterprise Browser 2.5 has recently been released with a slew of new features such as multi-session support, new configuration options and enhanced SAP integration. This DevTalk will discuss the new features introduced in version 2.5 of Enterprise Browser along with some examples and demos.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20200520_devtalk_eb25.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=-QeuZ2-HIwE"
                },
            ]
    },
    {
        "date": "Dec 4. 2019",
        "imgSrc": "./assets/img/speaking/devtalk_getting_started.png",
        "title": "DevTalk: Get Started Developing for Zebra Android devices",
        "userDate": "4th December 2019",
        "location": "Online Webinar",
        "otherInfo": [
            "",
        ],
        "brief": "This session will cover the recommended approach to develop applications for Zebra’s Android devices including scanner integration, developer tools & SDKs (including DataWedge), user experience, configuration and application distribution.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20191204_devtalk_gettingstarted.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=njo9iNs2zrA"
                },
            ]
    },
    {
        "date": "Dec 19, 2019",
        "imgSrc": "./assets/img/speaking/droidcon_telaviv_2019.jpg",
        "title": "Droidcon Tel Aviv 2019: Doing work in the background - where implementation meets theory",
        "userDate": "19th December 2019",
        "location": "Tel Aviv, Israel",
        "otherInfo": [
            "Talk link: <a href='http://il.droidcon.com/2019/speakers/'>Speakers page</a>",
        ],
        "brief": "Every iteration of Android introduces new restrictions on what an application can do in the background – this is not news to developers who have been coping changes like Doze mode, background restrictions and app buckets for the past 3 years. From WorkManager to Foreground services Google have a lot of documentation and workarounds for background work, but real life is always more complicated!<BR><BR>In this talk I will discuss some of the customer scenarios I have come across where the official advice was insufficient and more innovative solutions had to be found. Is it still possible to send a push message without depending on Firebase? How does doze mode whitelisting affect Oreo background restrictions? What happens if Android cancels my application’s wake lock(s)? I will try to answer some of the questions that go beyond the generic advice available on the Android developer portal.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20191219_droidcon_telaviv.pdf"
                }
            ]
    },
    {
        "date": "September 18, 2019",
        "imgSrc": "./assets/img/speaking/devtalk_android_pie.png",
        "title": "DevTalk: What's New for Zebra Developers in Android Pie",
        "userDate": "18th September 2019",
        "location": "Online Webinar",
        "otherInfo": [
            "",
        ],
        "brief": "Learn about the new features Google have introduced in Android Pie and how they affect Zebra developers targeting our Android mobile devices.  This talk will cover the changes to power management as well as discuss what new features such as Ephemeral users can do for your Enterprise deployment.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20190918_devtalk_android9.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=XFzkg00W9Lo"
                },
            ]
    },
    {
        "date": "October 1, 2019",
        "imgSrc": "./assets/img/speaking/appforum_nala.jpg",
        "title": "AppForum 2019: North America (Zebra developer conference)",
        "userDate": "1st - 2nd October 2019",
        "location": "Las Vegas, USA",
        "otherInfo": [
            "I am presenting multiple topics at the NALA appForum for 2019",
        ],
        "brief": "<b>Latest Android Oreo & Pie features for your Enterprise App</b><br>By failing to prepare, you are preparing to fail.  Join us in an overview of the new features of Android Pie you need to be aware of in your enterprise deployment as well as reviewing some of the best practices for Oreo.<br><br><b>The Power of DataWedge Intent APIs</b><br>The capabilities of the DataWedge Intent API are now on par with our native SDK and this session will go over which APIs are available, what they do and how you can take advantage of them in your application to fully control the scanner without using the native SDK.<br><br><b>Advanced Features of DataWedge for Data Capture</b><br>DataWedge is a very powerful tool for capturing data but that is not entirely obvious by just scratching the surface. This talk will take a deep dive into the advanced features of DataWedge to help you get the most out of the tool<br><br><b>Developing Kotlin applications for Zebra Android devices</b><br>It is not news for Android developers that following Google’s announcement of Kotlin support during Google I/O 2017, Google have embraced Kotlin as the preferred development language for Android. In this talk we will discuss why you might chose to develop enterprise application in Kotlin, what advantages the language offers and walk through some real examples to get your Zebra device scanning barcodes from a Kotlin application.<br><br><b>Using JavaScript Frameworks on Zebra Devices</b><br>If you are a JavaScript developer then you undoubtedly have your favourite JavaScript mobile development framework, this talk will cover development for Zebra mobile devices with a variety of frameworks and techniques.",
        "linkButtons":
            [
                {
                    "text": "Slides (Latest Android Oreo & Pie Features for your Enterprise App)",
                    "link": "./assets/slides/20191001_appforum_latestandroidfeatures.pdf"
                },
                {
                    "text": "Slides (The Power of DataWedge Intent APIs)",
                    "link": "./assets/slides/20191001_appforum_datawedgeintents.pdf"
                },
                {
                    "text": "Slides (Advanced Features of DataWedge for Data Capture)",
                    "link": "./assets/slides/20191001_appforum_datawedgeadvanced.pdf"
                },
                {
                    "text": "Slides (Developing Kotlin applications for Zebra devices)",
                    "link": "./assets/slides/20191001_appforum_kotlin.pdf"
                },
                {
                    "text": "Slides (Using JavaScript Frameworks on Zebra Devices)",
                    "link": "./assets/slides/20191001_appforum_javascriptframeworks.pdf"
                }
            ]
    },
    {
        "date": "October 24, 2019",
        "imgSrc": "./assets/img/speaking/droidcon_london_2019.jpg",
        "title": "Droidcon London 2019: Designing an Intent-based API",
        "userDate": "24th October 2019",
        "location": "Business Design Centre, London, UK",
        "otherInfo": [
            "",
        ],
        "brief": "If you want to enable Android developers to incorporate your functionality into their app, the process is straightforward, right? Wrap your project a jar file and make it available for download. This works great for libraries targeting a single platform but not all Android developers can easily consume jar files.<br><br>In this talk you will discover how Darryn and his team implemented their APIs using Android Intents, making them accessible to most mobile frameworks as well as traditional Java / Kotlin / Xamarin developers WITHOUT having to create a new plugin for every framework. There are many advantages to this approach and they have seen enthusiastic adoption by their customers, but he will also cover the downsides including performance concerns, debugging and device dependencies.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20190704_droidcon_london.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.droidcon.com/media-detail?video=390476893"
                },
            ]
    },
    {
        "date": "Aug 13, 2019",
        "imgSrc": "./assets/img/speaking/appforum_apac_2019.jpg",
        "title": "AppForum 2019: Asia Pacific & China (Zebra developer conference)",
        "userDate": "13th - 14th August (Sydney); 20th - 21st August (Beijing)",
        "location": "Sydney, Australia / Beijing, China",
        "otherInfo": [
            "I am presenting 4 different topics at the APAC AppForums for 2019",
        ],
        "brief": "<b>The Power of DataWedge Intent APIs</b><br>The capabilities of the DataWedge Intent API are now on par with our native SDK and this session will go over which APIs are available, what they do and how you can take advantage of them in your application to fully control the scanner without using the native SDK.<br><br><b>Building Machine Learning based Mobile Device locationing with TensorFlow on Zebra Mobile Devices</b><br>Enjoy an end-to-end illustration of a complete ML solution on a mobile device. Coversdevice tracking using WiFi RSSI, RTT, BLE sensors with both server based training (Python) and device based inference (Android Kotlin/Java). The tools and approach will help you create your own ML solutions!<br><br><b>Latest Android Oreo & Pie features for your Enterprise App</b><br>By failing to prepare, you are preparing to fail.  Join us in an overview of the new features of Android Pie you need to be aware of in your enterprise deployment as well as reviewing some of the best practices for Oreo.<br><br><b>Everything Application Developers ought to know about Zebra Android device management</b><br>To maximize value to Zebra Android device customers, you should be aware of expectations device management may place on your application. Understanding the past, present, and future of Android device management should help you better position your application for adoption into customer enterprises.",
        "linkButtons":
            [
                {
                    "text": "Slides (Latest Android Oreo & Pie Features for your Enterprise App)",
                    "link": "./assets/slides/20191001_appforum_latestandroidfeatures.pdf"
                },
                {
                    "text": "Slides (The Power of DataWedge Intent APIs)",
                    "link": "./assets/slides/20191001_appforum_datawedgeintents.pdf"
                },
            ]
    },
    {
        "date": "July 3, 2019",
        "imgSrc": "./assets/img/speaking/droidcon_berlin_2019.jpg",
        "title": "Droidcon Berlin 2019: Google Data Collection on Android",
        "userDate": "3rd July (event date 1st - 3rd July) 2019",
        "location": "Droidcon Berlin, CityCube, Berlin",
        "otherInfo": [
            "Talk link: <a href='https://www.de.droidcon.com/speaker/Darryn-Campbell' target='_new'>https://www.de.droidcon.com/speaker/Darryn-Campbell</a>",
        ],
        "brief": "Exactly what data is your Android device collecting about you?  What does Google know about you?  These are some of the most clickbaity headlines around, so it can be very difficult to find the truth between the sensational headlines and the ameliorating responses from Google.<br><br>There have been some academic studies on what Google collects, how often and how much – In this talk I will go through those results as well as present findings from my own original research.  I will describe how you can go about performing your own tests on what data your phone is sending and finally discuss some of the network and on-device solutions to control what data gets sent to Google beyond just adjusting the device settings.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20190703_droidcon_berlin.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.droidcon.com/media-detail?video=352688386"
                },
            ]
    },
    {
        "date": "June 4, 2019",
        "imgSrc": "./assets/img/speaking/appforum_emea_2019.jpg",
        "title": "AppForum 2019: EMEA (Zebra developer conference)",
        "userDate": "4th - 6th June 2019",
        "location": "Warsaw, Poland",
        "otherInfo": [
            "I am presenting 5 different topics at the EMEA AppForum for 2019",
        ],
        "brief": "<b>Using JavaScript Frameworks on Zebra Devices</b><br>If you are a JavaScript developer then you undoubtedly have your favourite JavaScript mobile development framework, this talk will cover development for Zebra mobile devices with a variety of frameworks and techniques.<br><i>Video Playlist:</i> <a href='https://www.youtube.com/playlist?list=PLj8D9Diz5FBr9gwXOwYwu264rksPjMOId'>https://www.youtube.com/playlist?list=PLj8D9Diz5FBr9gwXOwYwu264rksPjMOId</a><br><br><b>Latest Oreo & Pie features for your Enterprise App</b><br>By failing to prepare, you are preparing to fail.  Join us in an overview of the new features of Android Pie you need to be aware of in your enterprise deployment as well as reviewing some of the best practices for Oreo.<br><br><b>The Power of DataWedge Intent APIs</b><br>The capabilities of the DataWedge Intent API are now on par with our native SDK and this session will go over which APIs are available, what they do and how you can take advantage of them in your application to fully control the scanner without using the native SDK.<br><i>Video Playlist: </i><a href='https://www.youtube.com/playlist?list=PLj8D9Diz5FBoNSdbj5BvqVPmrdcXpF82F'>https://www.youtube.com/playlist?list=PLj8D9Diz5FBoNSdbj5BvqVPmrdcXpF82F</a><br><br><b>Advanced Features of DataWedge for Data Capture</b><br>DataWedge is a very powerful tool for capturing data but that is not entirely obvious by just scratching the surface. This talk will take a deep dive into the advanced features of DataWedge to help you get the most out of the tool<br><br><b>Advanced Features of Enterprise Browser</b><br>Enterprise Browser 2.0 was recently released with a raft of new features helping you target SAP deployments and enhancing the capabilities of the tool. We will take a look at the advanced features of Enterprise Browser from custom scripts to page-based actions.",
        "linkButtons":
            [
                {
                    "text": "Slides (Latest Android Oreo & Pie Features for your Enterprise App)",
                    "link": "./assets/slides/20191001_appforum_latestandroidfeatures.pdf"
                },
                {
                    "text": "Slides (The Power of DataWedge Intent APIs)",
                    "link": "./assets/slides/20191001_appforum_datawedgeintents.pdf"
                },
                {
                    "text": "Slides (Advanced Features of DataWedge for Data Capture)",
                    "link": "./assets/slides/20191001_appforum_datawedgeadvanced.pdf"
                },
                {
                    "text": "Slides (Using JavaScript Frameworks on Zebra Devices)",
                    "link": "./assets/slides/20191001_appforum_javascriptframeworks.pdf"
                }
            ]
    },
    {
        "date": "April 19, 2019",
        "imgSrc": "./assets/img/speaking/devtalk_gms_restricted.png",
        "title": "DevTalk: Learn about GMS Restricted",
        "userDate": "19th April 2019",
        "location": "Online webinar",
        "otherInfo": [
            "",
        ],
        "brief": "Many customers adopting GMS in an enterprise environment will be moving from non-GMS (or AOSP) devices and for many customers making that transition it can be a daunting leap. Zebra’s new Restricted GMS feature is designed to bridge the gap between the previous generation of non-GMS (AOSP) devices and the current generation of GMS devices, providing the value-added features of GMS whilst addressing any associated privacy concerns.<br><br>This presentation will cover:<br>What GMS Restricted is exactly<br>How to configure GMS Restricted<br>What ‘profiles’ are available<br>The implications for your application development and deployment.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20190417_devtalk_gmsrestricted.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=_tD9_Jz5lHA"
                },
            ]
    },
    {
        "date": "December 1, 2018",
        "imgSrc": "./assets/img/speaking/gdg.png",
        "title": "GDG: Keeping your Android application running when the device wants to sleep",
        "userDate": "1st December 2018",
        "location": "Google Developer Group (GDG) DevFest - Warsaw, Poland",
        "otherInfo": [
            "",
        ],
        "brief": "Every iteration of Android introduces new restrictions on what an application can do in the background – this is not news to developers who have been coping changes like Doze mode, background restrictions and app buckets for the past 3 years. From WorkManager to Foreground services Google have a lot of documentation and workarounds for background work, but real life is always more complicated! In this talk I will discuss some of the customer scenarios I have come across where the official advice was insufficient and more innovative solutions had to be found. Is it still possible to send a push message without depending on Firebase? How does doze mode whitelisting affect Oreo background restrictions? What happens if Android cancels my application’s wake lock(s)? I will try to answer some of the questions that go beyond the generic advice available on the Android developer portal.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20181201_gdg_keepingdeviceawake"
                }
            ]
    },
    {
        "date": "September 12, 2018",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: Securely Synchronize Locally Stored Dta with Zebra & Couchbase",
        "userDate": "12th September 2018",
        "location": "Online webinar",
        "otherInfo": [
            "Co-presented with Hod Greeley, Developer Advocate (Mobility), Couchbase",
        ],
        "brief": "As a global leader in rugged Android Enterprise, Zebra Technologies empowers those on the front line of industry to achieve a performance edge. Couchbase Mobile extends the Couchbase Data Platform to the edge, securely managing and syncing data from any cloud with every mobile device.<br><br>This webinar reviews the Zebra and Cloud base platforms and walks through a demo application that scans asset data and looks it up in a locally stored, embedded database supporting both structured and unstructured queries. It then securely manages and synchronizes with end-to-end security to a cloud-hosted database.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20180912_devtalk_couchbase.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=SZpOIdtjfws"
                },
            ]
    },
    {
        "date": "October 17, 2018",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: What's New for Zebra Developers in Android Oreo",
        "userDate": "17th October, 2018",
        "location": "Online webinar",
        "otherInfo": [
            "",
        ],
        "brief": "In this DEVTALK we will discuss the Google features introduced in Android Oreo and how they affect Zebra developers targeting our mobile Android devices.<br><br>This DEVTALK will cover:<br>* The newly introduced background application limits in Oreo<br>* Changes to how notifications work<br>* The newly introduced Play Store policies<br><br>Discussing how these changes might impact your existing and future enterprise applications.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20181017_devtalk_androido.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=gD0gRyOlMdQ"
                },
            ]
    },
    {
        "date": "June 26, 2018",
        "imgSrc": "./assets/img/speaking/droidcon_berlin_2018.jpg",
        "title": "Droidcon Berlin 2018: Create your own device owner: Why? How? And Why Not?",
        "userDate": "26th - 27th June 2018",
        "location": "Berlin, Germany",
        "otherInfo": [
            "",
        ],
        "brief": "In Android Enterprise, much of the functionality depends on what your Enterprise Mobility Manager provides: it is their server backend and their client that acts as the Device owner (DO). We are seeing organizations of all sizes break out of this restriction and create their own DO: In this talk I will explain why you might want to create your own device owner, what is involved beyond Google’s excellent but somewhat utilitarian TestDPC, how to take full advantage of the Device Policy Manager APIs and finally perhaps save you a couple weeks of effort by covering why this approach is not best for everybody.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20180626_droidcon_berlin.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=9vwi8C7MWo0"
                },
            ]
    },
    {
        "date": "May 2, 2018",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: Building Ionic Applications for Zebra Devices",
        "userDate": "2nd May 2018",
        "location": "Online Webinar",
        "otherInfo": [
            "Co-presented with Justin Willis, Developer Relations - Ionic",
        ],
        "brief": "Are you struggling to easily build an Enterprise app across multiple platforms? Do you need to incorporate barcode scanning into your application? Are you a developer building apps with the Ionic Framework for Zebra devices?<br><br>In this joint presentation by Zebra and Ionic, you will hear from Justin Willis, Developer Relations at Ionic, on how the Ionic Framework simplifies building apps in one codebase, for any platform, with the web. Darryn Campbell, Software Architect at Zebra, will walk through the ease of building a responsive, visually appealing demo application that incorporates barcode scanning data through Zebra DataWedge.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20180501_devtalk_ionic.pdf"
                },
                {
                    "text": "Demo app",
                    "link": "https://github.com/Zebra/ZebraIonicDemo"
                },
                {
                    "text": "Accompanying Blog",
                    "link": "https://developer.zebra.com/blog/ionic-applications-zebra-devices"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=zuHkqGocOqE"
                },
            ]
    },
    {
        "date": "June 20, 2018",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: Securing your Zebra Device",
        "userDate": "20th June 2018",
        "location": "Online Webinar",
        "otherInfo": [
            "",
        ],
        "brief": "Android prides itself on the security of the operating system and every new iteration of the platform enhances the security of both the hardware and the software.  At Zebra, we take a proactive approach to Android security and in this talk we will walk you through some of the techniques we expose in addition to the standard Android security model:<Br>* Programmatically encrypt the SD card all the way back to JellyBean<br>* Detect threats such as your device being rooted or your EMM client being compromised<br>* Take countermeasures if a threat is detected such as wiping your encryption keys or factory resetting the device<br>* Sign your applications to prevent unauthorized parties from spoofing your application package name<br>* Control user access to the camera, USB, unknown app installation and more all without use of an EMM",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20180620_devtalk_securingdevice.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=W3ymxN8VCdk"
                },
            ]
    },
    {
        "date": "December 15, 2017",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "Podcast: December Developer Podcast",
        "userDate": "15th December 2017",
        "location": "Online podcast",
        "otherInfo": [
            "",
        ],
        "brief": "I’ll be featured on Zebra’s December developer podcast talking about Nougat and GMS adoption in the enterprise",
        "linkButtons":
            [
                {
                    "text": "Recording",
                    "link": "https://soundcloud.com/zebradevpodcast/zebra-dev-podcast-the-best-holiday-present-gms-and-nougat-treats"
                },
            ]
    },
    {
        "date": "January 17, 2018",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: Working with GMS in your Enterprise Deployment",
        "userDate": "17th January 2018",
        "location": "Online webinar",
        "otherInfo": [
            "Videos used in this presentation: <a href='https://www.youtube.com/playlist?list=PLj8D9Diz5FBplYnMyQJz20o1mtrHxGLPJ'>YouTube Playlist</a>",
        ],
        "brief": "Having Google Mobile Services (GMS) on your device can have a range of advantages for device administrators, software developers and end users.  As GMS is adopted more in the enterprise we are getting questions from those same groups of people on how this will affect them; in this DEV {TALK} I’ll cover the effects on your whole organisation but take a deeper dive on the developer impact.  I’ll demonstrate managed configurations & the managed Play Store, how to programmatically disable doze mode, how to verify the device with the attestation API and more.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20180117_devtalk_gms.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=l6z17VcpnKI"
                },
            ]
    },
    {
        "date": "Oct 18, 2017",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: Locking Down Your Enterprise Device",
        "userDate": "18th October 2017",
        "location": "Online webinar",
        "otherInfo": [
            "",
        ],
        "brief": "Locking your users into a single or curated list of applications is a common task for any device administrator.  There are lots of ways to achieve this but which technique works best when?   In this DEV {TALK}, we’ll demonstrate how to achieve this with Google’s LockTask mode (Kiosk mode) & device owner profile, Enterprise Home Screen, and the MX AccessManager.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20181018_devtalk_securingdevice.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=JN64hKzyhPI"
                },
                {
                    "text": "Demo videos (playlist)",
                    "link": "https://www.youtube.com/watch?v=o-UFLlrXf0w&list=PLj8D9Diz5FBrHB4Xa61u3orHgxBneMVhM"
                },
            ]
    },
    {
        "date": "September 6, 2017",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: DataWedge v6.3 - Benefits & Challenges",
        "userDate": "6th September 2017",
        "location": "Online webinar",
        "otherInfo": [
            "",
        ],
        "brief": "DataWedge is a popular way to access Zebra device hardware providing a ‘zero-code’ way to simply and easily acquire barcode data, use SimulScan capabilities or use the inbuilt card reader, where supported. DataWedge is often used in preference to Zebra’s native SDKs for Java and Xamarin (EMDK) because it offers a simpler interface that ‘just works’ but this ease of use comes at a cost of losing more fine-grained control of the hardware. The DataWedge Intent API attempts to redress this by enabling user applications to control, modify and query the current DataWedge configuration and operation.  In this DEV {TALK} we will dive into the DataWedge APIs",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20170906_devtalk_datawedge63.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=OnekcES_hNM"
                },
            ]
    },
    {
        "date": "August 16, 2017",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: Migrating from WM/CE to Android with Enterprise Browser",
        "userDate": "16th August 2017",
        "location": "Online webinar",
        "otherInfo": [
            "",
        ],
        "brief": "In this DEV { TALK } we will discuss your options when moving your existing PocketBrowser, RhoElements and Enterprise Browser applications developed for the Windows Mobile, Windows Embedded Handheld or Windows CE platforms over to Android.  We will also touch on applications targeting industrial browsers from other companies.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20170816_devtalk_enterprisebrowsermigration.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://youtu.be/dDi_Ru-SM7k"
                },
            ]
    },
    {
        "date": "August 14, 2017",
        "imgSrc": "./assets/img/speaking/londroid_2017.jpg",
        "title": "Londroid Meetup: Developing applications targeting purpose-built (COSU) Android devices",
        "userDate": "14th August 2017",
        "location": "Bloomberg offices, 39-45 Finsbury Square, London, UK",
        "otherInfo": [
            "",
        ],
        "brief": "Whilst a clear market share winner in the consumer sphere, Android has historically lagged behind iOS in Enterprise deployments with iOS being perceived as more secure, more consistent and more manageable by businesses.  Android are fighting back on multiple fronts with enterprise features coming to the fore from Marshmallow onwards and key partnerships with companies who build ruggedized, task specific devices.  These are the devices you have seen when signing for a parcel delivery or scanning your own shopping in a supermarket.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20170814_londroid_cosudevices.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.pscp.tv/w/1ypKdlPYPDNKW"
                },
            ]
    },
    {
        "date": "May 11, 2017",
        "imgSrc": "./assets/img/speaking/appforum_emea_2017_eb.jpg",
        "title": "AppForum 2017: Enterprise Browser Tips & Tricks (Zebra developer conference)",
        "userDate": "11th May 2017",
        "location": "Zebra Technologies AppForums at Prague, Czech Republic & Las Vegas, USA",
        "otherInfo": [
            "",
        ],
        "brief": " Using Enterprise Browser seems like a no brainer, but the devil is in the detail.  In this fast-paced workshop we’ll address some interesting features of this industrial browser such as DOM injection; Android intents usage and integration with other Mobility DNA utilities (Simulscan, Swipe Assist and Enterprise keyboard)",
        "linkButtons":
 [
     
        {
            "text": "Slides",
            "link": "./assets/slides/20170511_appforum_eb.pdf"
        },
        {
            "text": "Video",
            "link": "https://www.youtube.com/watch?v=sy8VwwZKprw"
        },]
    },
    {
        "date": "May 10, 2017",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "AppForum 2017: Android Alphabet Soup (Zebra developer conference)",
        "userDate": "10th May 2017",
        "location": "Zebra Technologies AppForums at Prague, Czech Republic & Las Vegas, USA",
        "otherInfo": [
            "",
        ],
        "brief": "L, M, N and now O… Every year we’ve experienced a new Android version that is better and more secure than the previous one.  In this session we’re going to analyze the more important differences between the latest Android releases from the point of view of the enterprise market",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20170510_appforum_android.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=EEUYM8N_rnQ"
                },
            ]
    },
    {
        "date": "Feb 22, 2017",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: Enterprise considerations with Android M and N",
        "userDate": "22nd February 2017",
        "location": "Online webinar",
        "otherInfo": [
            "",
        ],
        "brief": "In this DEV { TALK } we will discuss the Google features within Android Marshmallow and Android Nougat and their impact on application developers targeting enterprise use cases",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20170222_devtalk_androidnougat.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=G6iBnO0A_FE"
                },
            ]
    },
    {
        "date": "October 5, 2016",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "DevTalk: Incorporating DataWedge into your Cordova Application",
        "userDate": "5th October 2016",
        "location": "Online webinar",
        "otherInfo": [
            "",
        ],
        "brief": "In this DEV { TALK } we will explain how to integrate DataWedge and printing into your Cordova app as well as how to use barcode and printing in Cordova, Ionic and PhoneGap applications.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20161005_devtalk_cordova.pdf"
                },
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=Bk6ou_lXNGs"
                },
            ]
    },
    {
        "date": "July 23, 2014",
        "imgSrc": "./assets/img/speaking/oscon.png",
        "title": "Current Best Practices for Building Enterprise Mobile Apps",
        "userDate": "23rd July 2014",
        "location": "Portland, OR, USA",
        "otherInfo": [
            "",
        ],
        "brief": "RhoMobile Suite is the leading cross platform framework for developing mobile applications for the enterprise.  Darryn Campbell will walk you through his experience working with enterprise developers and customers and highlight where the requirements for applications designed from enterprise are fundamentally different from those you find in the consumer space.",
        "linkButtons":
            [
                {
                    "text": "Slides",
                    "link": "./assets/slides/20140723_oscon.pdf"
                }
            ]
    },
    {
        "date": "August 14, 2012",
        "imgSrc": "./assets/img/speaking/devtalk.png",
        "title": "AppForum 2012: Adding Capabilities into your web applications with RhoElements (Zebra developer conference)",
        "userDate": "14th August 2012",
        "location": "Schaumburg, IL, USA",
        "otherInfo": [
            "",
        ],
        "brief": "Darryn Campbell of the RhoElements team talks about adding device capabilities and HTML5 features to a web app with RhoElements. He’ll start by briefly talking about installing RhoElements. He’ll then demo a web app and add HTML5 features to it, as well as talking about other RhoElements APIs",
        "linkButtons":
            [
                {
                    "text": "Video",
                    "link": "https://www.youtube.com/watch?v=TWbVMZZJA9U"
                },
            ]
    },

    
];
