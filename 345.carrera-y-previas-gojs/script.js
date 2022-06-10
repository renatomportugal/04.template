var $ = go.GraphObject.make;

// Diagrama de Carrera //
carrera = $(go.Diagram, "carreraDiagram", {
  initialAutoScale: go.Diagram.UniformToFill,
  //maxScale: 0.5,
  initialContentAlignment: go.Spot.Center,
  isReadOnly: false,
  "animationManager.isEnabled": false,
  "undoManager.isEnabled": true,
  layout: $(go.TreeLayout, {
    angle: 0,
    //sorting: go.TreeLayout.SortingAscending,
    layerSpacing: 40,
    nodeSpacing: 20,
    layerStyle: go.TreeLayout.LayerUniform,
    treeStyle: go.TreeLayout.StyleLayered
    //alignment: go.TreeLayout.AlignmentEnd,
    //arrangement: go.TreeLayout.ArrangementVertical,
    //sorting: go.TreeLayout.SortingAscending
  }),
  maxSelectionCount: 1,
  ChangedSelection: showLocalOnFullClick,
});

// Diagrama de Asignatura //
asignatura = $(go.Diagram, "asignaturaDiagram", {
  initialAutoScale: go.Diagram.UniformToFill,
  initialContentAlignment: go.Spot.Center,
  isReadOnly: true,
  layout: $(go.TreeLayout, {
    angle: 0,
    //sorting: go.TreeLayout.SortingAscending
    layerSpacing: 40,
    nodeSpacing: 20,
    layerStyle: go.TreeLayout.LayerUniform,
    //treeStyle: go.TreeLayout.StyleLayered,
    //alignment: go.TreeLayout.AlignmentEnd,
    //arrangement: go.TreeLayout.ArrangementVertical,
    //sorting: go.TreeLayout.SortingAscending
  }),
  LayoutCompleted: function(e) {
    var sel = e.diagram.selection.first();
    if (sel !== null) asignatura.scrollToRect(sel.actualBounds);
  },
  maxSelectionCount: 1,
  ChangedSelection: showLocalOnLocalClick
});

carrera.add(
  $(
    go.Part,
    $(go.TextBlock, "Carrera", {
      margin: 10,
      font: "bold 32px sans-serif",
      stroke: "white",
      isMultiline: false
      //editable: true
    })
  )
);

// Plantilla de Nodo //
var myNodeTemplate = $(
  go.Node,
  "Auto",
  {
    locationSpot: go.Spot.Center,
    click: function(e, node) {
      var diagram = node.diagram;
      diagram.startTransaction("highlight");
      diagram.clearHighlighteds();
      node.findLinksConnected().each(function(l) {
        l.isHighlighted = true;
      });
      node.findNodesConnected().each(function(n) {
        n.isHighlighted = true;
      });
      /*node.findNodesOutOf().each(function(n) {
        n.isHighlighted = true;
      });
      node.findLinksOutOf().each(function(l) {
        l.isHighlighted = true;
      });*/
      diagram.commitTransaction("highlight");
    }
  },
  new go.Binding("text", "key", go.Binding.toString),
  $(
    go.Shape,
    "RoundedRectangle",
    new go.Binding("fill", "color"),
    new go.Binding("stroke", "isHighlighted", function(h) {
      return h ? "black" : "grey";
    }).ofObject(),
    //new go.Binding("strokeWidth", "isHighlighted", function(h) { return h ? 2 : 2; }).ofObject(),
    {
      stroke: "grey",
      strokeWidth: 2
      //parameter1: 10,
      /*
    fill: "black",
    portId: "",
    cursor: "pointer",
    fromLinkable: true,
    fromLinkableSelfNode: true,
    fromLinkableDuplicates: true,
    toLinkable: true,
    toLinkableSelfNode: true,
    toLinkableDuplicates: true*/
    }
  ),
  {
    selectionAdornmentTemplate: $(
      go.Adornment,
      "Auto",
      $(
        go.Shape,
        "RoundedRectangle",
        {
          fill: null,
          stroke: "black" /*dimgrey,dodgerblue*/,
          strokeWidth: 4
          //parameter1: 10,
        }
        //new go.Binding("stroke", "color")
      ),
      $(go.Placeholder, { padding: -4 })
    )
  },
  $(
    go.TextBlock,
    "Default Text",
    {
      margin: 4,
      font: "bold 14px sans-serif",
      stroke: "white",
      isMultiline: false
      //editable: true
    },
    new go.Binding("text", "name").makeTwoWay()
  )
  //$("TreeExpanderButton")
  /*
  $(
    go.TextBlock,
    { margin: 5 },
    new go.Binding("text", "key", function(k) {
      return "Asignatura " + k;
    })
  )
  */
);
carrera.nodeTemplate = myNodeTemplate;
asignatura.nodeTemplate = myNodeTemplate;

// Plantilla de Enlace //
var myLinkTemplate = $(
  go.Link,
  {
    click: function (e, link) {
      const diagram = link.diagram;
      diagram.startTransaction('highlight');
      diagram.clearHighlighteds();
      link.isHighlighted = true;
      link.fromNode.isHighlighted = true;
      link.toNode.isHighlighted = true;
      diagram.commitTransaction('highlight');
    },
    routing: go.Link.AvoidsNodes /*Normal*/,
    selectable: true,
    corner: 10,
    //relinkableFrom: true,
    //relinkableTo: true,
    curve: go.Link.JumpGap
  },
  $(
    go.Shape,
    new go.Binding("stroke", "isHighlighted", function(h) {
      return h ? "black" : "grey";
    }).ofObject(),
    new go.Binding("strokeWidth", "isHighlighted", function(h) {
      return h ? 4 : 2;
    }).ofObject(),
    //{ stroke: "silver", strokeWidth: 2 }
    new go.Binding("strokeDashArray", "isHighlighted", function(h) {
      return h ? [10,6] : [0,0]
    }).ofObject(),
    { name: "PIPE", strokeCap: 'round' }
  ),
  $(
    go.Shape,
    {
      toArrow: "Triangle" /*Standard,Boomerang,Block,Circle,Diamond,Fork*/,
      //fill: "grey",
      //stroke: "grey",
      strokeWidth: 2
    },
    new go.Binding("fill", "isHighlighted", function(h) {
      return h ? "black" : "grey";
    }).ofObject(),
    new go.Binding("stroke", "isHighlighted", function(h) {
      return h ? "black" : "grey";
    }).ofObject(),
    new go.Binding("strokeWidth", "isHighlighted", function(h) {
      return h ? 4 : 2;
    }).ofObject()
  ),
  {
    selectionAdornmentTemplate: $(
      go.Adornment,
      'Auto'
    )
  }
);
carrera.linkTemplate = myLinkTemplate;
asignatura.linkTemplate = myLinkTemplate;
//setupDiagram();

function loop() {
  var diagram = carrera;
  setTimeout(function() {
    var oldskips = diagram.skipsUndoManager;
    diagram.skipsUndoManager = true;
    diagram.links.each(function(link) {
      var shape = link.findObject("PIPE");
      var off = shape.strokeDashOffset - 1;
      shape.strokeDashOffset = off <= 0 ? 16 : off;
    });
    diagram.skipsUndoManager = oldskips;
    loop();
  }, 50);
}

// Resaltador de Asignatura
highlighter = $(
  go.Part,
  "Auto",
  {
    layerName: "Background",
    selectable: false,
    //isInDocumentBounds: false,
    locationSpot: go.Spot.Center
  },
  $(go.Shape, "Ellipse", {
    fill: "white",
    stroke: "lightgrey",
    strokeWidth: 4
  })
);
carrera.add(highlighter);
carrera.addDiagramListener("InitialLayoutCompleted", function(e) {
  var node0 = carrera.findPartForKey(0);
  if (node0 !== null) node0.isSelected = true;
  showLocalOnFullClick();
});

carrera.click = function(e) {
  carrera.startTransaction("no highlighteds");
  carrera.clearHighlighteds();
  carrera.commitTransaction("no highlighteds");
};

// Cambio de Asignatura en Diagrama de Asignatura
function showLocalOnLocalClick() {
  var selectedLocal = asignatura.selection.first();
  if (selectedLocal !== null) {
    carrera.select(carrera.findPartForKey(selectedLocal.data.key));
  }
}

// Cambio de Asignatura en Diagrama de Carrera
function showLocalOnFullClick() {
  var node = carrera.selection.first();
  if (node !== null && node instanceof go.Node) {
    //highlighter.visible = true;
    carrera.scrollToRect(node.actualBounds);
    highlighter.location = node.location;
    
    var model = new go.GraphLinksModel();
    var nearby = node.findTreeParts(2);
    //var parent = node.findTreeParentNode();
    var links = node.findLinksConnected();
    var nodes = node.findNodesInto();
    //nearby.add(nodes);
    
    nearby.each(function(n) {
      if (n instanceof go.Node) model.addNodeData(n.data);
      //model.addLinkData(n.data);
    });
    
    links.each(function(l) {
      model.addLinkData(l.data);
    })
    nodes.each(function(n) {
      model.addNodeData(n.data);
    })
    
    asignatura.model = model;
    var selectedLocal = asignatura.findPartForKey(node.data.key);
    if (selectedLocal !== null) selectedLocal.isSelected = true;
  } else {
    //asignatura.clearSelection();
    highlighter.visible = false;
    asignatura.clear();
  }
}

// Crear Diagrama Aleatorio
function setupDiagram(total) {
  if (total === undefined) total = 20;
  var nodeDataArray = [];
  for (var i = 0; i < total; i++) {
    nodeDataArray.push({
      key: nodeDataArray.length,
      color: go.Brush.randomColor()
    });
  }
  var j = 0;
  for (var i = 1; i < total; i++) {
    var data = nodeDataArray[i];
    data.parent = j;
    if (Math.random() < 0.3) j++;
  }
  carrera.model = new go.TreeModel(nodeDataArray);
}

// Caso de Prueba
var prueba = $(go.GraphLinksModel);
prueba.nodeDataArray = [
  {
    key: "1020",
    name: "Cálculo 1",
    color: "blue"
  },
  {
    key: "1022",
    name: "Cálculo 2",
    color: "green"
  },
  {
    key: "1030",
    name: "Algebra 1",
    color: "blue"
  },
  {
    key: "1031",
    name: "Algebra 2",
    color: "green"
  },
  {
    key: "1023",
    name: "Discreta 1",
    color: "blue"
  },
  {
    key: "1026",
    name: "Discreta 2",
    color: "green"
  },
  {
    key: "1322",
    name: "Programación 1",
    color: "blue"
  },
  {
    key: "1321",
    name: "Programación 2",
    color: "green"
  },
  {
    key: "1323",
    name: "Programación 3",
    color: "darkorange"
  },
  {
    key: "1324",
    name: "Programación 4",
    color: "red"
  },
  {
    key: "1025",
    name: "Probabilidad",
    color: "darkorange"
  },
  {
    key: "1027",
    name: "Logica",
    color: "green"
  },
  {
    key: "1033",
    name: "Metodos",
    color: "darkorange"
  },
  {
    key: "1443",
    name: "Arquitectura",
    color: "darkorange"
  },
  {
    key: "1325",
    name: "Lenguajes",
    color: "red"
  },
  {
    key: "1532",
    name: "Sistemas",
    color: "red"
  },
  {
    key: "1327",
    name: "Taller",
    color: "purple"
  },
  {
    key: "1446",
    name: "Redes",
    color: "purple"
  }
];

prueba.linkDataArray = [
  { from: "1020", to: "1022" },
  { from: "1023", to: "1026" },
  { from: "1030", to: "1031" },
  { from: "1322", to: "1321" },
  { from: "1022", to: "1025" },
  { from: "1022", to: "1033" },
  { from: "1030", to: "1026" },
  { from: "1031", to: "1033" },
  { from: "1321", to: "1443" },
  { from: "1023", to: "1443" },
  { from: "1027", to: "1443" },
  { from: "1020", to: "1443" },
  { from: "1023", to: "1027" },
  { from: "1321", to: "1323" },
  { from: "1323", to: "1324" },
  { from: "1020", to: "1324" },
  { from: "1030", to: "1324" },
  { from: "1026", to: "1911" },
  { from: "1027", to: "1911" },
  { from: "1323", to: "1911" },
  { from: "1023", to: "1323" },
  { from: "1030", to: "1025" },
  { from: "1322", to: "1033" },
  { from: "1324", to: "1327" },
  { from: "1023", to: "1327" },
  { from: "1020", to: "1325" },
  { from: "1030", to: "1325" },
  { from: "1027", to: "1325" },
  { from: "1323", to: "1325" },
  { from: "1020", to: "1532" },
  { from: "1030", to: "1532" },
  { from: "1323", to: "1532" },
  { from: "1443", to: "1532" },
  { from: "1443", to: "1446" },
  { from: "1532", to: "1446" }
];

carrera.model = prueba;

function init() {
  loop();
}