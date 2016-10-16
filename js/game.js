var xprediction = 0;
var yprediction = 0;

$(document).ready(function () {


    $("#MainButton").click(function () {
        if ($("#MainButton").text() === "Start!") {

            if (confirm("Do you want to play?")) {

                webgazer.setRegression('ridge').setTracker('clmtrackr')
                .setGazeListener(function (data, elapsedTime) {
                    if (data == null) {
                        return;
                    }
                    xprediction = data.x; //these x coordinates are relative to the viewport 
                    yprediction = data.y; //these y coordinates are relative to the viewport
                }).begin().showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

                drawStuffOnScreen();
                
                ChangeButtonBehaviour(true);
            }
        }
        else {
            if (confirm("Do you want to stop playing?")) {
                webgazer.end();
                ChangeButtonBehaviour(false);
            }
        }
    });

    function ChangeButtonBehaviour(shouldStart) {
        $("#MainButton").text(shouldStart === true ? "Stop!" : "Start!");
        $("#MainButton").prop('class', shouldStart === true ? "btn btn-danger" : "btn btn-success");
    }

    function drawStuffOnScreen() {

        var width = 320;
        var height = 240;
        var topDist = '0px';
        var leftDist = '0px';

        var setup = function () {
            var video = document.getElementById('webgazerVideoFeed');
            video.style.display = 'block';
            video.style.position = 'absolute';
            video.style.top = topDist;
            video.style.right = leftDist;
            video.width = width;
            video.height = height;
            video.style.margin = '0px';

            webgazer.params.imgWidth = width;
            webgazer.params.imgHeight = height;

            var overlay = document.createElement('canvas');
            overlay.id = 'overlay';
            overlay.style.position = 'absolute';
            overlay.width = width;
            overlay.height = height;
            overlay.style.top = topDist;
            overlay.style.right = leftDist;
            overlay.style.margin = '0px';

            document.body.appendChild(overlay);

            var cl = webgazer.getTracker().clm;

            function drawLoop() {
                requestAnimFrame(drawLoop);
                overlay.getContext('2d').clearRect(0, 0, width, height);
                if (cl.getCurrentPosition()) {
                    cl.draw(overlay);
                }
            }
            drawLoop();
        };

        function checkIfReady() {
            if (webgazer.isReady()) {
                setup();
            } else {
                setTimeout(checkIfReady, 100);
            }
        }
        setTimeout(checkIfReady, 100);

    }


    //Onclick: start
    //Onclick: stop
    //Show webcam on screen
    //show demo on screen

});



