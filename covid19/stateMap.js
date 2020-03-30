(function () {
    d3.queue()
        .defer(d3.json, "ne_10m_admin_1_India_Official.json")
        .await(function (error, topoMap) {
            if (error) throw error;
            var states = topojson.feature(topoMap, topoMap.objects.ne_10m_admin_1_India_Official);

            // Map render
            var map = stateMap(states.features).width(800).height(700).scale(1200);
            d3.select("#map").call(map);
        });
}());



function stateMap(states) {

    var width = 400, height = 350, scale = 600;
    var color = ["#edfaff", "#d4f2ff", "#cff2ff", "#b3eaff", "#82dcff", "#57d0ff", "#6a51a3"];

    function render(selection) {
        selection.each(function () {

            d3.select(this).select("svg").remove();
            var svg = d3.select(this).append("svg")
                .attr("width", width)
                .attr("height", height);

            var projection = d3.geo.mercator()
                .center([83, 23])
                .scale(scale)
                .translate([width / 2, height / 2]);

            var path = d3.geo.path().projection(projection);
            var selectState = svg.selectAll("g").data(states).enter().append("g").attr("class", "state");

            selectState.append("path")
                .style("fill", function (d) { 
                    console.log (data[d.properties.name]);
                    if ( data[d.properties.name].confirmed < 50 ){
                        level = 0;
                    } else if ( data[d.properties.name].confirmed > 50 && data[d.properties.name].confirmed <= 100){
                        level = 1
                    } else if ( data[d.properties.name].confirmed > 100 && data[d.properties.name].confirmed <= 150){
                        level = 2
                    }else if ( data[d.properties.name].confirmed > 150 && data[d.properties.name].confirmed <= 200){
                        level = 3
                    }else if ( data[d.properties.name].confirmed > 200 && data[d.properties.name].confirmed <= 250){
                        level = 4
                    }else if ( data[d.properties.name].confirmed > 250 && data[d.properties.name].confirmed <= 300){
                        level = 5
                    }
                    return color[level]; 
                })
                .attr("d", path)
                .on("mouseover", function (d, i) {
                   processState(d.properties.name);
                });

            svg.selectAll("text").data(states).enter().append("text")
                .attr("class", function (d) { return "label " + d.id; })
                .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .text(function (d) { return d.properties.name; });
        });
    } // render
    render.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return render;
    };
    render.width = function (value) {
        if (!arguments.length) return width;
        width = value;
        return render;
    };
    render.scale = function (value) {
        if (!arguments.length) return scale;
        scale = value;
        return render;
    };

    return render;
} // stateMap