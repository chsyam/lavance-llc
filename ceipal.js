var apikey = '';

(function () {

    // Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else { // Other browsers
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {
            /******* Load CSS *******/
            /* var css_link = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: "style.css"
            });
            css_link.appendTo('head'); */

            var me = document.querySelector('script[data-ceipal-api-key]');
            // var scripttags = document.querySelector('script[data-theme-id]');
            // var scripttagsColor = document.querySelector('script[data-bg-color]');

            var id = me.getAttribute('data-ceipal-api-key');
            var theme_id = me.getAttribute('data-theme-id');
            var bgColor = me.getAttribute('data-bg-color');
            var career_portal_id = me.getAttribute('data-ceipal-career-portal-id');
            var strThemeId = ''
            if (theme_id !== null) {
                strThemeId = theme_id.toString()
            }
            if (bgColor == null) {
                bgColor = ''
            }

            apikey = id;
            // console.log(api_key);
            // const colorCode = {
            //     api_key: api_key,
            // };
            // export { colorCode };

            // localStorage.setItem("api_key", api_key);

            /******* Load HTML *******/
            var job_id = getParameterByName('job_id', '')
            if (job_id) {
                job_id.replace(/\ /g, '+');
            }
            //console.log("Madhu Pilla");
            var api_url = "https://api.ceipal.com/" //URL of production
            //var api_url = "https://apistg.ceipal.com/" //URL of staging

            var jsonp_url = api_url + "careerPortalWidget/?themeid=" + strThemeId + "&bgcolor=" + bgColor + "&job_id=" + job_id + "&apikey=" + apikey + "&cp_id=" + career_portal_id;
            $.getJSON(jsonp_url, function (data) {
                //console.log(data.html);
                //console.log("data");
                $('#example-widget-container').html(data.html).css({ 'min-height': 900 });
            });
            // data_to_send = {'ThemeId':ThemeId, 'bgColor':bgColor, 'job_id':job_id, 'apikey':apikey}
            // $.ajax({
            // method: "GET",
            // url: jsonp_url,
            // crossDomain: true,
            // dataType: 'jsonp',
            // data : data_to_send,
            // // beforeSend: function(request) {
            // //   request.setRequestHeader("X-ceipal-api-key", apikey);
            // // },
            // success: function(data) {
            //     //Your code
            //     console.log(data);
            //     $('#example-widget-container').html(data.html);
            // }
            // });


        });
    }

})(); // We call our anonymous function immediately
function fn() {
    return apikey;
}


// Adding the event listeners from child iframe urls start
if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}
function onMessage(event) { // Check sender origin to be trusted
    if (event.origin !== "https://careerbot.ceipal.com") {
        //console.log('Check sender origin to be trusted https://careerbot.ceipal.com ');
        // return false;
    }
    var data = event.data;
    if (typeof (window[data.func]) == "function") {
        window[data.func].call(null, data);
    }
}
function getJobsListForChatbot(data) {
    //console.log('chat boat called from chat');
    //console.log(data);
    document.getElementById('careers_api_source').contentWindow.postMessage(data, '*');
}
function showChatBotConversation(data) {
    $('#chatbot_conversation_block').animate({ right: '-520' });
    if (data.display == 1) {
        $("#chatbot_conversation_block").animate({ right: '0' });
    }
}
// function showChatBotTooltip(data){
//    $('#show_chatbot_tooltip').hide();
// }
function changeIframeHeight(data) {
    var height_px = data.height_px;
    document.getElementById('careers_api_source').style.minHeight = height_px + 'px';
    document.getElementById('careers_api_source').height = (height_px + 20) + 'px';
    /*$('html, body').animate({
                 scrollTop: 0
    }, 100);*/
}
function updateQueryString(data) {
    //console.log(data.job_id);
    // var job_id = data.job_id;
    // if (job_id) {
    //   var careers_api_src = document.getElementById("careers_api_source").src
    //   if (!careers_api_src.includes('&job_id=')) {
    //       document.getElementById("careers_api_source").src = careers_api_src+'&job_id='+job_id;
    //   }
    //
    //   // $('#careers_api_source').attr('src', careers_api_src+'?job_id='+job_id);
    // }
    // else{
    //   console.log("empty job id");
    //   var careers_api_src = document.getElementById("careers_api_source").src
    //   if (careers_api_src.includes('&job_id=')) {
    //       var n = careers_api_src.indexOf("&job_id=");
    //       careers_api_src = careers_api_src.slice(0, n);
    //       document.getElementById("careers_api_source").src = careers_api_src;
    //   }
    // }
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?job_id=' + data.job_id;
        window.history.pushState({ path: newurl }, '', newurl);
    }
}


/*window.addEventListener('load', function() {
  var job_id = getParameterByName('job_id');
  console.log(job_id);
  console.log('job_id');
  // var careers_api_src = document.getElementById("careers_api_source").src
  // console.log(careers_api_src);
  if (job_id) {
    // var careers_api_src = document.getElementById("careers_api_source").src
    // document.getElementById("careers_api_source").src = careers_api_src+'?job_id='+job_id;
    // window.parent.postMessage({ 'func': 'loadJobDescription', 'job_id': job_id }, '*');

    document.getElementById('careers_api_source').contentWindow.postMessage({ 'func': 'loadJobDescription', 'job_id': job_id }, '*');
    // $('#careers_api_source').attr('src', careers_api_src+'?job_id='+job_id);
  }
})*/

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return results[2];
}

function scrollToCareerWidget() {
    //console.log("TEST");
    //console.log((document.getElementById('example-widget-container').offsetTop - 50));
    //window.scrollTo({ top: (document.getElementById('example-widget-container').offsetTop + 250), behavior: 'smooth' });
    document.getElementById('example-widget-container').scrollIntoView({ behavior: 'smooth' });
}


function scrollToIFrame() {
    //window.scrollTo({ top: (document.getElementById('careers_api_source').offsetTop - 50), behavior: 'smooth' });
    document.getElementById('example-widget-container').scrollIntoView({ behavior: 'smooth' });
}
function sharetosocilamedia(data) {
    // alert(document.URL);
    // alert(window.location);
    var share_media = data.media;
    // var job_id = data.job_id;
    // job_id = job_id.replace(/\ /g,'+');
    // var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?api_key='+data.api_key+'&job_id='+job_id;

    var pageUrl = encodeURIComponent(document.URL);
    //console.log(share_media);
    // var url = "https://api.whatsapp.com/send?phone=919000581491&text=" + pageUrl;
    var url = ''
    if (share_media === "facebook") {
        //console.log("FB");
        url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
        var left = (screen.width - 570) / 2;
        var top = (screen.height - 570) / 2;
        var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
        window.open(url, "NewWindow", params);
    }
    else if (share_media === "twitter") {
        url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=jobshare";
        var left = (screen.width - 570) / 2;
        var top = (screen.height - 570) / 2;
        var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
        window.open(url, "NewWindow", params);
    }
    else if (share_media === "linkedin") {
        url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
        var left = (screen.width - 570) / 2;
        var top = (screen.height - 570) / 2;
        var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
        window.open(url, "NewWindow", params);
    }
    else if (share_media === "copyurl") {
        // copyToClipboard(pageUrl);
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = document.URL;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
}
//
function socialWindow(url) {
    var left = (screen.width - 570) / 2;
    var top = (screen.height - 570) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
    window.open(url, "NewWindow", params);
}
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}