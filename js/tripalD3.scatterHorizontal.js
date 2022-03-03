tripalD3.scatterHorizontal = {
    drawScatterHorizontal: function(svg, data, options) {
        var max = d3.max(data),
            min = d3.min(data);

         

        //set xaxis scale
        var x = d3.scale.linear()
                .domain([0,max]) //swap with max of data
                .range(0, options.width);

        //set yaxis scale
        var y = d3.scale.linear()
                .domain(0,max)
                .range(0+options.xAxisPadding, options.width)

        //create xaxis
        var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

        //create yaxis
        var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");


        // sets threshold starting place
        var thresholdOrigin = [
        {
            'x1': 5,
            'y1': 400,
            'x2': 955,
            'y2': 400

        }
    ];

        //Generate the threshold lines' attributes




        //create and append datapoints
        svg.selectAll("circle")
                .data(data).enter()
                .append("circle")
                .attr("cx", function(d){return x(d[0])})
                .attr("cy", function(d){return y(d[1])})

        //append xaxis to svg
        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + options.height + ")")
                .call(xAxis);

        //append yaxis to svg
        svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(0",+options.height+")")
                .call(yAxis);

        var lineAttributes = {
                'x1': function(d) {return d.x1;},
                'y1': function(d) {return d.y1;},
                'x2': function(d) {return d.x2;},
                'y2': function(d) {return d.y2;}
        
      };

        var drag = d3.behavior.drag()
          .origin(function(d) {return d;})
          .on('drag', dragged);

        var line1 = svg.append('line').data(upperThresholdOrigin).attr(lineAttributes).call(drag);
        function dragged() {
                var x = d3.event.dx;
                var y = d3.event.dy;
                var line = d3.select(this);
              
                //Convert svg coordinates to x-axis coordinates
                var xAxisScale = d3.scale.linear().domain([0, options.width]).range([min, max]);
                var upperLinePosition = Math.floor(xAxisScale(line1.attr("x2")));
                var attributes = {
                        x1: parseInt(line.attr('x1')) + x,
                        y1: parseInt(line.attr('y1')),
          
                        x2: parseInt(line.attr('x2')) + x,
                        y2: parseInt(line.attr('y2')),
                    };
                }

        }
}