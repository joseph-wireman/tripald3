tripalD3.scatter = {

    drawSimpleScatter: function(svg, data, options) {

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

        var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

        var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

        svg.selectAll("circle")
                .data(data).enter()
                .append("circle")
                .attr("cx", function(d){return x(d[0])})
                .attr("cy", function(d){return y(d[1])})

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + options.height + ")")
                .call(xAxis);
                
        svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(0",+options.height+")")
                .call(yAxis)
          
    }
}