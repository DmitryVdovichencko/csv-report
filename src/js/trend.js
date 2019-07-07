import * as d3 from "d3";

export let createSVG = (id,parent,width=800,height=400,margin={top: 15, right: 20, bottom: 15, left: 100}) => {
	const newDiv = document.createElement('div');
	newDiv.setAttribute("id", id);
	parent.appendChild(newDiv);
	width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;
    const svg = d3.select(`#${id}`)
  	.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    return svg;
}

export let YAxis = (yMin, yMax, translateX = 0,height,className,svgEl) => {
    let y = d3.scaleLinear()
    	.domain( [yMin, yMax])
    	.range([ height, 0 ]);
    const create = () =>{
        svgEl.append("g")
    	.attr("transform", `translate(${translateX},0)`)
    	.attr("class", className)
    	.call(d3.axisLeft(y));
    };
    return {y:y,create:create};
}

export let XAxis = (data, width, height, svgEl, ticksCount = 5,timeFormat = "%H:%M:%S .%L", xMin = 0, xMax = 0) => {
    let x = 
    	d3.scaleTime()
     	.domain(d3.extent(data, (d) => d.date))
        .range([ 0, width ]);
       // {
    // 	d3.scaleTime()
    //  	.domain([xMin,xMax])
    //     .range([ 0, width ])
    // };
    const create = () =>{
       svgEl.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(ticksCount,timeFormat));
    }
    return {x:x, create:create};
}




export let createTrend = (dataPath, color, x, y, svgEl ) => {

  d3.csv(dataPath,
  // When reading the csv, I must format variables:
  	function(d){
    	return ({ date : d3.timeParse("%d.%m.%Y_%H:%M:%S:%L")(d.date), value : +d.value });
  	},
  	// Now I can use this dataset:
  	function(data) {
      
    // Add the line
    svgEl.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
    // Add the points
    svgEl
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.date) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 2)
        .attr("fill", color)
	})
}
