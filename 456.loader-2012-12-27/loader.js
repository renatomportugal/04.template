/*
 * JavaScript Loader
 * Copyright (c) 2012-2013 Rafael Lúcio (poste9@gmail.com)
 * licensed under the GPL (GPL-LICENSE.txt) license.
 */
var Loader = (function(){
    
    var self = this;
    var callback = function(){};
    
    /**
     * Call a function asynchronously 
     * @param {Function} func
     */
    function asyncThis(func) {
        setTimeout(func, 50);
    };
    
    /**
     * Sets the custom callback of the loader
     * @param {Function} handler
     * @returns null
     */
    self.then = function(handler) {
        callback = handler;
    };
    
    /**
     * Default callback of the loader
     */
    function defaultCallback() {
        callback.apply(window, arguments);
        callback = function(){};
    };
    
    /**
     * Loads the script and append it to the body 
     */
    self.load = function(file) {
        var dom = document.createElement("script");
            dom.setAttribute("async", true);
            dom.addEventListener("load", defaultCallback);
            dom.src = file;
        document.body.appendChild(dom);
    };
    
    return {
        /**
         * @param {String} file
         * @returns loader instance
         */
        load : function(file) {
            
            asyncThis(function(){
                self.load(file);
            });
            
            return self;
        }
    };
    
})();