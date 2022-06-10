//Copying code from go page https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/DOMTree.html

var names = {}; // hash to keep track of what names have been used
  function init() {
    //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates
    myDiagram =
      $(go.Diagram, "myDiagram",
        {
          initialAutoScale: go.Diagram.UniformToFill,
          // define the layout for the diagram
          layout: $(go.TreeLayout, { nodeSpacing: 5, layerSpacing: 30 })
        });
    // Define a simple node template consisting of text followed by an expand/collapse button
    myDiagram.nodeTemplate =
      $(go.Node, "Horizontal",
        { selectionChanged: nodeSelectionChanged },  // this event handler is defined below
        $(go.Panel, "Auto",
          $(go.Shape, { fill: "#1F4963", stroke: null }),
          $(go.TextBlock,
            { font: "bold 13px Helvetica, bold Arial, sans-serif",
              stroke: "white", margin: 3 },
            new go.Binding("text", "key"))
        ),
        $("TreeExpanderButton")
      );
    // Define a trivial link template with no arrowhead.
    myDiagram.linkTemplate =
      $(go.Link,
        { selectable: false },
        $(go.Shape));  // the link shape
    var nodeDataArray = [];
    // Walk the DOM, starting at document
    function traverseDom(node, parentName) {
      // skip everything but HTML Elements
      if (!(node instanceof Element)) return;
      // Ignore the menu on the left of the page
      if (node.id === "menu") return;
      // add this node to the nodeDataArray
      var name = getName(node);
      var data = { key: name, name: name };
      nodeDataArray.push(data);
      // add a link to its parent
      if (parentName !== null) {
        data.parent = parentName;
      }
      // find all children
      var l = node.childNodes.length;
      for (var i = 0; i < l; i++) {
        traverseDom(node.childNodes[i], name);
      }
    }
    // Give every node a unique name
    function getName(node) {
      var n = node.nodeName;
      if (node.id) n = n + " (" + node.id + ")";
      var namenum = n;
      var i = 1;
      while (names[namenum] !== undefined) {
        namenum = n + i;
        i++;
      }
      names[namenum] = node;
      return namenum;
    }
    // build up the tree
    traverseDom(document.activeElement, null);
    // create the model for the DOM tree
    myDiagram.model = new go.TreeModel(nodeDataArray);
  }
  // When a Node is selected, highlight the corresponding HTML element.
  function nodeSelectionChanged(node) {
    if (node.isSelected) {
      names[node.data.name].style.backgroundColor = "lightblue";
    } else {
      names[node.data.name].style.backgroundColor = "";
    }
  }
init();