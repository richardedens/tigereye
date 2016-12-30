// Tigereye
(function() {

    // Configuration
    var steps = [],
        heatmap = [],
        showHeatMap = false,
        intervalHeatMap = 0,
        config = {};

    var mouseClickImg = '<svg width="24" height="24" style="vertical-align: middle; padding-right: 5px;" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <use id="Background" xlink:href="#_MouseClickImg" x="11" y="21" width="175px" height="155px"/> <defs><image id="_MouseClickImg" width="175px" height="155px" xlink:href="data:image/png;base64,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"/> </defs></svg>';
    var keyPressImg = '<svg width="24" height="24" style="vertical-align: middle; padding-right: 5px;" viewBox="0 0 197 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="Background" transform="matrix(0.0981354,0,0,0.0981354,0,0)"><g transform="matrix(10.19,-0,-0,10.19,0,0)"><use xlink:href="#_KeyPressImg" x="0.883" y="0.883" width="195.388px" height="198.332px" transform="matrix(0.996876,0,0,0.996642,0,0)"/></g></g><defs><image id="_KeyPressImg" width="196px" height="199px" xlink:href="data:image/png;base64,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"/></defs></svg>';
    var waitImg = '<svg width="24" height="24" style="vertical-align: middle; padding-right: 5px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"> <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><g><path d="M355.1,137.7C355.1,67.2,412.3,10,482.9,10c70.5,0,127.7,57.2,127.7,127.7c0,70.5-57.2,127.7-127.7,127.7C412.3,265.4,355.1,208.3,355.1,137.7z M761.3,520.9L761.3,520.9c0-57.9,46.9-104.8,104.8-104.8c57.9,0,104.8,46.9,104.8,104.8l0,0c0,57.9-46.9,104.8-104.8,104.8C808.2,625.7,761.3,578.8,761.3,520.9z M658.9,791.8c0-52.4,42.5-94.9,94.9-94.9c52.4,0,94.9,42.5,94.9,94.9c0,52.4-42.5,94.9-94.9,94.9C701.4,886.7,658.9,844.2,658.9,791.8z M396.9,904c0-47.5,38.5-86,86-86c47.5,0,85.9,38.5,85.9,86c0,47.5-38.5,86-85.9,86C435.4,990,396.9,951.5,396.9,904z M134.1,791.8c0-43,34.9-77.8,77.8-77.8c43,0,77.8,34.9,77.8,77.8s-34.9,77.8-77.8,77.8C168.9,869.7,134.1,834.8,134.1,791.8L134.1,791.8z M29.2,520.9c0-38.9,31.6-70.5,70.5-70.5c38.9,0,70.5,31.6,70.5,70.5s-31.6,70.5-70.5,70.5C60.8,591.4,29.2,559.8,29.2,520.9z M148.1,249.9L148.1,249.9c0-35.3,28.6-63.9,63.9-63.9c35.3,0,63.9,28.6,63.9,63.9l0,0c0,35.3-28.6,63.9-63.9,63.9C176.7,313.8,148.1,285.2,148.1,249.9z M869.5,249.9c0,63.9-51.8,115.7-115.7,115.7c-63.9,0-115.7-51.8-115.7-115.7c0-63.9,51.8-115.7,115.7-115.7C817.7,134.3,869.5,186.1,869.5,249.9z"/></g></g> </svg>';
    var tigerEyeImg = '<svg width="24" height="24" style="vertical-align: middle; padding-right: 5px;" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g><g><path d="M634.8,467.7C596.1,456.6 556.7,447.9 517.2,443.2C446.5,431.5 321,421.3 202.6,464.6C66.3,514.6 10,498.5 10,498.5C10,498.5 269.2,862.9 522.7,908.9C656.4,940.3 800.1,913.9 913.7,811.4L960.7,786.1L932.5,745.8C888.1,590.3 774.7,507.9 634.8,467.7ZM683.5,689.1C677.5,752.8 622.4,785.2 558.6,779.2C494.9,773.2 446.7,731.1 452.7,667.4C458.7,603.7 504,675.9 567.8,681.8C631.5,687.8 689.5,625.3 683.5,689.1ZM551.2,586.1C549.3,606.1 531.6,620.7 511.7,618.9C491.7,617 477.1,599.3 478.9,579.3C480.8,559.3 498.5,544.7 518.4,546.6C538.4,548.4 553.1,566.1 551.2,586.1ZM517.8,841.1C394,805.7 304.6,702.8 267.4,572.9C341.3,506.3 428.9,495.2 519.3,508.1C461.1,527.5 416.8,579.7 410.7,644.7C402.4,732.5 467,810.5 554.8,818.7C642.6,827 720.6,762.4 728.8,674.6C732.9,630.8 718.9,589.4 693,557.9C778.4,598 841.5,661.9 870.5,763.5C770.3,854 641.6,876.6 517.8,841.1Z" style="fill:white;fill-rule:nonzero;"/><path d="M625.4,232.7C458.4,166 252.2,203.7 106.4,86.9C72,59.4 22.8,107.9 57.6,135.7C176.3,230.8 318.5,237.5 463.2,259.7C629.8,285.3 821.9,376.7 923.8,514.1C950,549.4 1010,515.1 983.4,479.3C893.7,358.4 762.8,287.5 625.4,232.7Z" style="fill:white;fill-rule:nonzero;"/></g></g></svg>';
    var tigerEyeBlackImg = '<svg width="24" height="24" style="vertical-align: middle; padding-right: 5px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"> <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><g><g><path d="M634.8,467.7c-38.7-11.1-78.1-19.8-117.6-24.5c-70.7-11.7-196.2-21.9-314.6,21.4C66.3,514.6,10,498.5,10,498.5s259.2,364.4,512.7,410.4c133.7,31.4,277.4,5,391-97.5l47-25.3l-28.2-40.3C888.1,590.3,774.7,507.9,634.8,467.7z M683.5,689.1c-6,63.7-61.1,96.1-124.9,90.1c-63.7-6-111.9-48.1-105.9-111.8c6-63.7,51.3,8.5,115.1,14.4C631.5,687.8,689.5,625.3,683.5,689.1z M551.2,586.1c-1.9,20-19.6,34.6-39.5,32.8c-20-1.9-34.6-19.6-32.8-39.6c1.9-20,19.6-34.6,39.5-32.7C538.4,548.4,553.1,566.1,551.2,586.1z M517.8,841.1C394,805.7,304.6,702.8,267.4,572.9c73.9-66.6,161.5-77.7,251.9-64.8c-58.2,19.4-102.5,71.6-108.6,136.6c-8.3,87.8,56.3,165.8,144.1,174c87.8,8.3,165.8-56.3,174-144.1c4.1-43.8-9.9-85.2-35.8-116.7c85.4,40.1,148.5,104,177.5,205.6C770.3,854,641.6,876.6,517.8,841.1z"/><path d="M625.4,232.7c-167-66.7-373.2-29-519-145.8c-34.4-27.5-83.6,21-48.8,48.8c118.7,95.1,260.9,101.8,405.6,124c166.6,25.6,358.7,117,460.6,254.4c26.2,35.3,86.2,1,59.6-34.8C893.7,358.4,762.8,287.5,625.4,232.7z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g> </svg>';

    // Core tigereye.
    window.tigereye = {

        init: function(cfg) {

            var infoDiv = document.createElement('div');
            infoDiv.id = 'tigereye-info';
            infoDiv.className = 'tigereye';

            var contentDiv = document.createElement('div');
            contentDiv.id = 'tigereye-content';
            contentDiv.className = 'tigereye-content';
            infoDiv.appendChild(contentDiv);

            var headerDiv = document.createElement('div');
            headerDiv.id = 'tigereye-header';
            headerDiv.className = 'tigereye-header';
            headerDiv.innerHTML = tigerEyeBlackImg + 'TigerEye <div type="button" class="tigereye-btn heatmap" id="tigereye-heatmap-btn">heatmap</div><div type="button" class="tigereye-btn reset" id="tigereye-heatmap-btn">reset</div><div type="button" class="tigereye-btn copy" id="tigereye-heatmap-btn">copy</div>';
            infoDiv.appendChild(headerDiv);

            document.getElementsByTagName('body')[0].appendChild(infoDiv);

            document.querySelector('.tigereye-btn.heatmap').addEventListener('click', function(evt) {
                if (showHeatMap === false) {
                    $(this).html('close');
                    tigereye.heatmap();
                } else {
                    $(this).html('heatmap');
                    tigereye.clearHeatmap();
                }
            });

            document.querySelector('.tigereye-btn.reset').addEventListener('click', function(evt) {
                localStorage.setItem('tigereye', '{"steps":[],"heatmaps":[]}');
                steps = [];
                heatmap = [];
                document.getElementsByClassName('tigereye-content')[0].innerHTML = "";
            });

            document.querySelector('.tigereye-btn.copy').addEventListener('click', function(evt) {
                var data = JSON.parse(localStorage.getItem('tigereye'));
                window.prompt("Copy to clipboard: Ctrl+C, Enter", JSON.stringify({steps:data.steps}));
            });

            if (typeof cfg.reset === 'undefined') {
                if (localStorage.getItem('tigereye')) {
                    var data = JSON.parse(localStorage.getItem('tigereye'));
                    steps = data.steps;
                    heatmap = data.heatmap;
                }
            }
            tigereye.showJSON();

            document.querySelector('#tigereye-header').addEventListener('mousedown', function(evt){
                tigereye.startMoving('#tigereye-info', 'body', evt);
            });

            document.querySelector('#tigereye-header').addEventListener('mouseup', function(){
                tigereye.stopMoving('body');
            });
        },
        clearHeatmap: function() {
            showHeatMap = false;
            intervalHeatMap = 0;
            document.querySelector('#tigereye-heatmap').remove();
        },
        heatmap: function() {
            showHeatMap = true;
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var radius = 25;

            // Create canvas.
            canvas.id     = "tigereye-heatmap";
            canvas.className     = "tigereye-heatmap";
            canvas.width = ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 2);
            canvas.height = ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 2);
            canvas.style.zIndex   = 9999999;
            canvas.style.position = "absolute";
            canvas.style.left = "0";
            canvas.style.top = "0";
            canvas.style.right = "0";
            canvas.style.bottom = "0";
            canvas.style.border = "1px solid red";

            // Plot heatmap.
            for(var i = 0; i < heatmap.length; i++) {
                context.beginPath();
                context.arc(heatmap[i].x, heatmap[i].y, radius, 0, 2 * Math.PI, false);
                context.fillStyle = "rgba(255, 0, 0, 0.1)";
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = "red";
                context.stroke();
            }

            // Add to document
            document.querySelector('body').appendChild(canvas);

            document.querySelector('#tigereye-heatmap').addEventListener('click', function(){
                document.querySelector('.tigereye-btn.heatmap').innerHTML('heatmap');
                tigereye.clearHeatmap();
            });
        },
        information: function() {
            return {
                steps: steps,
                heatmap: heatmap
            };
        },
        getJSON: function() {
            return localStorage.getItem('tigereye');
        },
        showJSON: function() {
            var json = JSON.parse(localStorage.getItem('tigereye'));
            if (json !== '') {
                var stepsList = json.steps;

                var addRowClick = function() {
                    steps.splice(this.id.replace('addRow',''), 0, { type: 'wait', amount: 10 });
                    localStorage.setItem('tigereye', JSON.stringify(tigereye.information()));
                    tigereye.showJSON();
                };

                document.getElementsByClassName('tigereye-content')[0].innerHTML = "";
                for (var i = 0; i < stepsList.length; i++) {
                    var stepDiv = document.createElement('div');
                    stepDiv.className = 'tigereye-step';
                    if (stepsList[i].type === 'keyup') {
                        stepDiv.innerHTML = keyPressImg + stepsList[i].type + ' - ' + stepsList[i].className + ' - ' + stepsList[i].keyChar + '<div id="tigerEyeDel' + i + '" class="tigereye-delete-btn">x</div>';
                    } else {
                        if (steps[i].type === 'wait') {
                            stepDiv.innerHTML = waitImg + stepsList[i].type + ' - ' + stepsList[i].amount + '<div id="tigerEyeDel' + i + '" class="tigereye-delete-btn">x</div>';
                        } else {
                            stepDiv.innerHTML = mouseClickImg + stepsList[i].type + ' - ' + stepsList[i].className + '<div id="tigerEyeDel' + i + '" class="tigereye-delete-btn">x</div>';
                        }
                    }
                    document.getElementsByClassName('tigereye-content')[0].appendChild(stepDiv);
                    var addRowDiv = document.createElement('div');
                    addRowDiv.className = 'tigereye-add-row';
                    addRowDiv.id = 'addRow' + (i + 1);
                    addRowDiv.innerHTML = 'add time';
                    addRowDiv.onclick = addRowClick;
                    document.getElementsByClassName('tigereye-content')[0].appendChild(addRowDiv);
                }

                var deleteBtns = document.getElementsByClassName('tigereye-delete-btn');
                var deleteClick = function(){
                    var id = this.id.replace('tigerEyeDel', '');
                    steps.splice(id, 1);
                    localStorage.setItem('tigereye', JSON.stringify(tigereye.information()));
                    tigereye.showJSON();
                };
                for(var j = 0; j < deleteBtns.length; j++) {
                    deleteBtns[j].addEventListener('click', deleteClick);
                }

                document.getElementsByClassName('tigereye-content')[0].scrollTop = document.getElementsByClassName('tigereye-content')[0].scrollHeight - document.getElementsByClassName('tigereye-content')[0].getBoundingClientRect().height;
            }
        },
        move : function(divid,xpos,ypos){
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving : function(dividf, container, evt){
            var divid = document.querySelector(dividf);
            evt = evt || window.event;
            var posX = evt.pageX,
                posY = evt.pageY,
                divTop = divid.style.top,
                divLeft = divid.style.left,
                eWi = parseInt(divid.style.width),
                eHe = parseInt(divid.style.height),
                cWi = parseInt(document.querySelector(container).style.width),
                cHe = parseInt(document.querySelector(container).style.height);
            document.querySelector(container).style.cursor='move';
            divTop = divTop.replace('px','');
            divLeft = divLeft.replace('px','');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmouseup = function(evt) {
                tigereye.stopMoving('body');
            };
            document.onmousemove = function(evt){
                evt = evt || window.event;
                evt.preventDefault();
                var posX = evt.pageX,
                    posY = evt.pageY,
                    aX = posX,
                    aY = posY;
                if (aX < 0) {
                    aX = 0;
                }
                if (aY < 0) {
                    aY = 0;
                }
                if (aX + eWi > cWi) {
                    aX = cWi - eWi;
                }
                if (aY + eHe > cHe) {
                    aY = cHe -eHe;
                }
                tigereye.move(divid,aX,aY);
            };
        },
        stopMoving : function(container){
            var a = document.createElement('script');
            document.querySelector(container).style.cursor='default';
            document.onmousemove = function(){};
        }
    };

    // Track all mousemoves
    document.querySelector('body').addEventListener('mousemove',function( event ){
        intervalHeatMap++;
        if (intervalHeatMap === 50 && showHeatMap === false) {
            intervalHeatMap = 0;
            var x = event.pageX;
            var y = event.pageY;
            heatmap.push({ x: x, y: y });
            localStorage.setItem('tigereye', JSON.stringify(tigereye.information()));
            tigereye.showJSON();
        }
    });

    // Track all clicks
    document.querySelector('body').addEventListener('click', function(evt) {
        if (evt.target.className.indexOf('tigereye') === -1) {
            if (evt.target.className !== '' && evt.target.className !== 'tigereye-btn copy' && evt.target.className !== 'tigereye-btn heatmap' && evt.target.className !== 'tigereye-btn play' && evt.target.className !== 'tigereye-heatmap') {
                steps.push({type: 'click', className: evt.target.className.split(' ')[0]});
                localStorage.setItem('tigereye', JSON.stringify(tigereye.information()));
                tigereye.showJSON();
            }
        }
    });

    // Track all keyups
    document.querySelector('body').addEventListener('keypress', function(evt) {
        steps.push({ type: 'keyup', className: evt.target.className, keyCode: evt.keyCode, keyChar: String.fromCharCode(evt.which) });
        localStorage.setItem('tigereye', JSON.stringify(tigereye.information()));
        tigereye.showJSON();
    });

}());