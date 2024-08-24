import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const KnowledgeGraph = ({ data }) => {
  const svgRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 1200;
    const height = 800;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    svg.selectAll("*").remove();

    // Define arrow markers for graph links
    svg
      .append("defs")
      .selectAll("marker")
      .data(["end"])
      .enter()
      .append("marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5");

    const g = svg.append("g");

    // Add zoom functionality
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    const link = g
      .append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value))
      .attr("marker-end", "url(#end)");

    const node = g
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => 10 + d.value / 5)
      .attr("fill", (d) => color(d.group))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    const label = g
      .append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("font-size", 10)
      .attr("dx", 12)
      .attr("dy", 4);

    node.append("title").text((d) => d.name);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    // Hover and click functionality
    node
      .on("mouseover", function (event, d) {
        highlightConnections(d);
      })
      .on("mouseout", function () {
        if (!selectedNode) resetHighlight();
      })
      .on("click", function (event, d) {
        if (selectedNode === d) {
          setSelectedNode(null);
          resetHighlight();
        } else {
          setSelectedNode(d);
          highlightConnections(d);
        }
      });

    // Double-click to zoom
    node.on("dblclick", (event, d) => {
      event.stopPropagation();
      const dcx = event.x - width / 2;
      const dcy = event.y - height / 2;
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(2)
            .translate(-d.x, -d.y)
        );
    });

    svg.on("dblclick", () => {
      svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    });

    function highlightConnections(d) {
      const connectedNodes = new Set();
      connectedNodes.add(d.id);
      link.each(function (l) {
        if (l.source.id === d.id) connectedNodes.add(l.target.id);
        if (l.target.id === d.id) connectedNodes.add(l.source.id);
      });

      node.attr("opacity", (n) => (connectedNodes.has(n.id) ? 1 : 0.1));
      link.attr("opacity", (l) =>
        connectedNodes.has(l.source.id) && connectedNodes.has(l.target.id)
          ? 1
          : 0.1
      );
      label.attr("opacity", (n) => (connectedNodes.has(n.id) ? 1 : 0.1));

      node.attr("r", (n) =>
        connectedNodes.has(n.id) ? 15 + n.value / 3 : 10 + n.value / 5
      );
      label.attr("font-size", (n) => (connectedNodes.has(n.id) ? 14 : 10));
    }

    function resetHighlight() {
      node.attr("opacity", 1).attr("r", (d) => 10 + d.value / 5);
      link.attr("opacity", 0.3);
      label.attr("opacity", 1).attr("font-size", 15);
    }

    // Drag functionality
    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, [data, selectedNode]);

  return (
    <div>
      <svg ref={svgRef} width="100%" height="800"></svg>
      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "white",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h3>{selectedNode.name}</h3>
          <p>Group: {selectedNode.group}</p>
          <p>Value: {selectedNode.value}</p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
