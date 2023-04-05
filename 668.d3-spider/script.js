$(document).ready(function () {

    var spiderChart = {
        data: [
            { "label": "Theme Score 1", "score": 14 },
            { "label": "Theme Score 2", "score": 64 },
            { "label": "Theme Score 3", "score": 94 },
            { "label": "Theme Score 4", "score": 54 },
            { "label": "Theme Score 5", "score": 4 },
            { "label": "Theme Score 6", "score": 24 },
        ],
        meta: {
            awards: null

        }
    }

    if (spiderChart && spiderChart['data'].length > 2) {

        var data = [];
        var awards = JSON.parse(spiderChart['meta']['awards']);
        var spiderChartData = spiderChart['data'];
        
        var height = "100%";
        var width = "100%";
        var viewBoxHeight = 400;
        var viewBoxWidth = 500;
        var labelFontSize = "12px";
        var labelToGraphSpacing =12;

        spiderChartData.push(spiderChartData.shift());
        spiderChartData.reverse();
        for (var i = 0; i < 1; i++) {
            var point = {};
            for (var i = 0; i < spiderChartData.length; i++) {
                point[spiderChartData[i]['label']] = parseInt(spiderChartData[i]['score']) / 10;
            };
            data.push(point);
        };
        var svg = d3.select("#d3_spider_graph_div").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", "-50 10 " + viewBoxWidth + " " + viewBoxHeight)
            .attr("display", "block")
            .attr("margin", "auto");

        var graphCentre_x = 200;
        var graphCentre_y = 220;
        var radialScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, 140]);
        var ticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        ticks.reverse();

        var defs = svg.append("defs");
        //var gradient = defs.append("radialGradient")
        var gradient = defs.append("linearGradient")
            .attr("id", "svgGradient")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "100%");

        awards = {
            'red': '30',
            'yellow': '70',
            'green': '90'
        };
        for (var award in awards) {
            gradient.append("stop")
                .attr('class', 'start')
                .attr("offset", awards[award] + "%")
                .attr("stop-color", award)
                .attr("stop-opacity", 1);
        }

        var polys = findCoordinate(radialScale(ticks[0]), 200, 220, spiderChartData.length);

        function findCoordinate(radius, x, y, sides) {
            var increment = 360 / sides;
            var points = [];
            for (var angle = 0; angle < 361; angle += increment) {
                var radians = angle / 180 * Math.PI;
                points.push({ 'x': Math.sin(radians) * radius + x, 'y': Math.cos(radians) * radius + y });
            }
            return points;
        }

        var poly_color = ['green', 'green', 'yellow', 'yellow', 'yellow', 'orange', 'red', 'red'];
        //var new_polys = polys.reverse();
        //console.log(new_polys);
        svg.selectAll("polygon")
            .data([polys])
            .enter().append("polygon")
            .attr("points", function (d) {
                return d.map(function (d) {
                    return [d.x, d.y].join(",");
                }).join(" ");
            })
            .attr("transform", "rotate(180, 200, 220)")
            .attr("stroke", "black");

        var line = d3.line()
            .x(function (d) { return d.x })
            .y(function (d) { return d.y });

        for (var i = 0; i < data.length; i++) {
            ///var d = data[i];
            //var color = colors[i];
            var coordinates = getPathCoordinates(10);
            svg.append("path")
                .datum(coordinates)
                .attr("d", line)
                .attr("stroke-width", 1)
                .attr("stroke", 'grey')
                .attr("fill", 'green')
                .attr("stroke-opacity", 0.5)
                .attr("opacity", 0.5);
        }

        ticks.forEach(function (t, index) {
            var polys = findCoordinate(radialScale(t), 200, 220, spiderChartData.length);
            var new_polys = polys.reverse();
            svg.append("polygon")
                .data([new_polys])
                .attr("points", function (d) {
                    return d.map(function (d) {
                        return [d.x, d.y].join(",");
                    }).join(" ");
                })
                .attr("stroke", "gray")
                .attr("opacity", 1)
                .attr("fill", 'white')
                // .attr("fill", function (d, i) {
                //     return poly_color[index];
                // })
                .attr("transform", "rotate(180, 200, 220)")
                .attr("fill-opacity", "1.0");
        });

        ticks.forEach(function (t) {
            return svg.append("text")
                .attr("x", graphCentre_x + 5)
                .attr("y", graphCentre_y - radialScale(t))
                .attr("font-size", "10px")
                .text((t * 10).toString() + "%")
        });

        function angleToCoordinate(angle, value) {
            var x = Math.cos(angle) * radialScale(value);
            var y = Math.sin(angle) * radialScale(value);
            //return {"x": 200 + x, "y": 200 - y};
            return { "x": graphCentre_x + x, "y": graphCentre_y - y };
        };

        for (var i = spiderChartData.length - 1; i >= 0; i--) {
            var ft_name = spiderChartData[i]['label'];
            var angle = (Math.PI / 2) + (2 * Math.PI * i / spiderChartData.length);
            var line_coordinate = angleToCoordinate(angle, 10);
            var label_coordinate = angleToCoordinate(angle, labelToGraphSpacing);

            svg.append("line")
                .attr("x1", graphCentre_x)
                .attr("y1", graphCentre_y)
                .attr("x2", line_coordinate.x)
                .attr("y2", line_coordinate.y)
                .attr("stroke", "black");

            var text_anchor = "";
            if (angle < 2 || (angle < 5 && angle > 4.6)) {
                text_anchor = "middle";
            } else if (angle > 4.5) {
                text_anchor = "start";
            } else {
                text_anchor = "end";
            };

            svg.append("text")
                .attr("class", "labelText")
                .attr("x", label_coordinate.x)
                .attr("y", label_coordinate.y)
                .attr("font-size", labelFontSize)
                .attr("text-anchor", text_anchor)
                .text(ft_name);
        };

        svg.selectAll(".labelText")
            .call(wrap, 80, 1.1);

        function wrap(text, width, spacing) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    //lineHeight = 2.1,
                    x = text.attr("x")
                y = text.attr("y"),
                    dx = parseFloat(text.attr("dx")),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);
                //.attr("dy", dy + "em").attr("dx", dx + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        //tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dx", (lineNumber * lineHeight + dx) + "em").attr("dy", (lineNumber * lineHeight + dy) + "em").text(word);
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", (lineNumber * lineHeight + spacing) + "em").text(word);
                        lineNumber++;
                    }
                }
            });
        }

        var line = d3.line()
            .x(function (d) { return d.x })
            .y(function (d) { return d.y });


        var colors = ["black", "gray", "navy"];

        function getPathCoordinates(data_point) {
            var coordinates = [];
            for (var i = 0; i < spiderChartData.length; i++) {
                var ft_name = spiderChartData[i]['label'];
                var angle = (Math.PI / 2) + (2 * Math.PI * i / spiderChartData.length);

                // will check to make sure score is not greater than or less than the range of the spider graph 
                if (data_point[ft_name] < 0) {
                    data_point[ft_name] = 0;
                }
                if (data_point[ft_name] > 10) {
                    data_point[ft_name] = 10;
                }
                coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
            }
            return coordinates;
        }

        //var d = {};
        /*
        var degs = 0;
        for (var i = 0; i < spiderChartData.length; i++){
                var d = {};
                for (var j = 0; j < spiderChartData.length; j++){
                        d[spiderChartData[j]['label']] = 0;       
                }
        
                d[spiderChartData[i]['label']] = 10;
                
                if (i == spiderChartData.length - 1) {  
                        d[spiderChartData[0]['label']] = 10; 
                } else {
                        d[spiderChartData[i+1]['label']] = 10;  
                }
        
                
                var coordinates = getPathCoordinates(d);
                        svg.append("path")
                                .datum(coordinates)
                                .attr("d",line)
                                .attr("stroke-width", 1)
                                .attr("transform", "rotate(" +degs+ ", 200, 220)")
                                .attr("fill", "url(#svgGradient)")
                                //.attr("fill", "none") 
                                ;
                degs += 90; 
        }
        //console.log(d);
        /*
        var coordinates = getPathCoordinates(d);
        svg.append("path")
                .datum(coordinates)
                .attr("d",line)
                .attr("stroke-width", 1)
                .attr("fill", "url(#svgGradient)");
        */

        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var color = colors[i];
            var coordinates = getPathCoordinates(d);
            svg.append("path")
                .datum(coordinates)
                .attr("d", line)
                .attr("stroke-width", 1)
                .attr("stroke", color)
                //.attr("fill", "#242424")
                .attr("fill", "lightblue")
                .attr("stroke-opacity", 0.5)
                .attr("opacity", 0.9);
        }
    }
});