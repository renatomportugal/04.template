var farmmap = document.getElementById("farm-map"),
  zoneinfo = document.getElementById("zone-info"),
  allzones = farmmap.querySelectorAll("g");
farmmap.addEventListener("click", function(e) {
  var zone = e.target.parentNode;
  if (e.target.nodeName == "path", "polygon", "polyline", "ellipse") {
    for (var i = 0; i < allzones.length; i++) {
      allzones[i].classList.remove("active");
    }
    zone.classList.add("active");
    var zonename = zone.querySelector("title").innerHTML,
      zonepara = zone.querySelector("desc").innerHTML;
    zoneinfo.innerHTML = "";
    zoneinfo.insertAdjacentHTML("afterbegin", "<h3 id=" + zone.id + "><span>" + zonename + "</span></h3><div class='zone-content " + zone.id + "' >" + zonepara + "</div>");
    zoneinfo.classList.add("show");
  }
})

// Because IE doesn't support classList and has issues with innerHTML with SVGs, a couple of polyfills are necessary to make this work. Older versions of webkit browsers also had issues that were resolved by these:

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, https://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source https://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!("classList" in document.createElement("_")) ||
    document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

    (function(view) {

      "use strict";

      if (!('Element' in view)) return;

      var
        classListProp = "classList",
        protoProp = "prototype",
        elemCtrProto = view.Element[protoProp],
        objCtr = Object,
        strTrim = String[protoProp].trim || function() {
          return this.replace(/^\s+|\s+$/g, "");
        },
        arrIndexOf = Array[protoProp].indexOf || function(item) {
          var
            i = 0,
            len = this.length;
          for (; i < len; i++) {
            if (i in this && this[i] === item) {
              return i;
            }
          }
          return -1;
        }
        // Vendors: please allow content code to instantiate DOMExceptions
        ,
        DOMEx = function(type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        },
        checkTokenAndGetIndex = function(classList, token) {
          if (token === "") {
            throw new DOMEx(
              "SYNTAX_ERR", "An invalid or illegal string was specified"
            );
          }
          if (/\s/.test(token)) {
            throw new DOMEx(
              "INVALID_CHARACTER_ERR", "String contains an invalid character"
            );
          }
          return arrIndexOf.call(classList, token);
        },
        ClassList = function(elem) {
          var
            trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
            i = 0,
            len = classes.length;
          for (; i < len; i++) {
            this.push(classes[i]);
          }
          this._updateClassName = function() {
            elem.setAttribute("class", this.toString());
          };
        },
        classListProto = ClassList[protoProp] = [],
        classListGetter = function() {
          return new ClassList(this);
        };
      // Most DOMException implementations don't allow calling DOMException's toString()
      // on non-DOMExceptions. Error's toString() is sufficient here.
      DOMEx[protoProp] = Error[protoProp];
      classListProto.item = function(i) {
        return this[i] || null;
      };
      classListProto.contains = function(token) {
        token += "";
        return checkTokenAndGetIndex(this, token) !== -1;
      };
      classListProto.add = function() {
        var
          tokens = arguments,
          i = 0,
          l = tokens.length,
          token, updated = false;
        do {
          token = tokens[i] + "";
          if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
          }
        }
        while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.remove = function() {
        var
          tokens = arguments,
          i = 0,
          l = tokens.length,
          token, updated = false,
          index;
        do {
          token = tokens[i] + "";
          index = checkTokenAndGetIndex(this, token);
          while (index !== -1) {
            this.splice(index, 1);
            updated = true;
            index = checkTokenAndGetIndex(this, token);
          }
        }
        while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.toggle = function(token, force) {
        token += "";

        var
          result = this.contains(token),
          method = result ?
          force !== true && "remove" :
          force !== false && "add";

        if (method) {
          this[method](token);
        }

        if (force === true || force === false) {
          return force;
        } else {
          return !result;
        }
      };
      classListProto.toString = function() {
        return this.join(" ");
      };

      if (objCtr.defineProperty) {
        var classListPropDesc = {
          get: classListGetter,
          enumerable: true,
          configurable: true
        };
        try {
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) { // IE 8 doesn't support enumerable:true
          if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
      }

    }(self));

  } else {
    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.

    (function() {
      "use strict";

      var testElement = document.createElement("_");

      testElement.classList.add("c1", "c2");

      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
      // classList.remove exist but support only one argument at a time.
      if (!testElement.classList.contains("c2")) {
        var createMethod = function(method) {
          var original = DOMTokenList.prototype[method];

          DOMTokenList.prototype[method] = function(token) {
            var i, len = arguments.length;

            for (i = 0; i < len; i++) {
              token = arguments[i];
              original.call(this, token);
            }
          };
        };
        createMethod('add');
        createMethod('remove');
      }

      testElement.classList.toggle("c3", false);

      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
      // support the second argument.
      if (testElement.classList.contains("c3")) {
        var _toggle = DOMTokenList.prototype.toggle;

        DOMTokenList.prototype.toggle = function(token, force) {
          if (1 in arguments && !this.contains(token) === !force) {
            return force;
          } else {
            return _toggle.call(this, token);
          }
        };

      }

      testElement = null;
    }());

  }

}

/**
 * innerHTML property for SVGElement
 * Copyright(c) 2010, Jeff Schiller
 *
 * Licensed under the Apache License, Version 2
 *
 * Works in a SVG document in Chrome 6+, Safari 5+, Firefox 4+ and IE9+.
 * Works in a HTML5 document in Chrome 7+, Firefox 4+ and IE9+.
 * Does not work in Opera since it doesn't support the SVGElement interface yet.
 *
 * I haven't decided on the best name for this property - thus the duplication.
 */

(function() {
  var serializeXML = function(node, output) {
      var nodeType = node.nodeType;
      if (nodeType == 3) { // TEXT nodes.
        // Replace special XML characters with their entities.
        output.push(node.textContent.replace(/&/, '&amp;').replace(/</, '&lt;').replace('>', '&gt;'));
      } else if (nodeType == 1) { // ELEMENT nodes.
        // Serialize Element nodes.
        output.push('<', node.tagName);
        if (node.hasAttributes()) {
          var attrMap = node.attributes;
          for (var i = 0, len = attrMap.length; i < len; ++i) {
            var attrNode = attrMap.item(i);
            output.push(' ', attrNode.name, '=\'', attrNode.value, '\'');
          }
        }
        if (node.hasChildNodes()) {
          output.push('>');
          var childNodes = node.childNodes;
          for (var i = 0, len = childNodes.length; i < len; ++i) {
            serializeXML(childNodes.item(i), output);
          }
          output.push('</', node.tagName, '>');
        } else {
          output.push('/>');
        }
      } else if (nodeType == 8) {
        // TODO(codedread): Replace special characters with XML entities?
        output.push('<!--', node.nodeValue, '-->');
      } else {
        // TODO: Handle CDATA nodes.
        // TODO: Handle ENTITY nodes.
        // TODO: Handle DOCUMENT nodes.
        throw 'Error serializing XML. Unhandled node of type: ' + nodeType;
      }
    }
    // The innerHTML DOM property for SVGElement.
  Object.defineProperty(SVGElement.prototype, 'innerHTML', {
    get: function() {
      var output = [];
      var childNode = this.firstChild;
      while (childNode) {
        serializeXML(childNode, output);
        childNode = childNode.nextSibling;
      }
      return output.join('');
    },
    set: function(markupText) {
      // Wipe out the current contents of the element.
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }

      try {
        // Parse the markup into valid nodes.
        var dXML = new DOMParser();
        dXML.async = false;
        // Wrap the markup into a SVG node to ensure parsing works.
        sXML = '<svg xmlns=\'http://www.w3.org/2000/svg\'>' + markupText + '</svg>';
        var svgDocElement = dXML.parseFromString(sXML, 'text/xml').documentElement;

        // Now take each node, import it and append to this element.
        var childNode = svgDocElement.firstChild;
        while (childNode) {
          this.appendChild(this.ownerDocument.importNode(childNode, true));
          childNode = childNode.nextSibling;
        }
      } catch (e) {
        throw new Error('Error parsing XML string');
      };
    }
  });

  // The innerSVG DOM property for SVGElement.
  Object.defineProperty(SVGElement.prototype, 'innerSVG', {
    get: function() {
      return this.innerHTML;
    },
    set: function(markupText) {
      this.innerHTML = markupText;
    }
  });

})();