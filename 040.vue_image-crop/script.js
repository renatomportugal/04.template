"use strict";
Vue.component('image-crop', {
    template: "\n<div class=\"crop-component\">\n    <div class=\"crop-container\" ref=\"cropContainer\">\n      <img class=\"crop-image-bg\" :src=\"imageSrc\"  />\n      <div class=\"crop-frame noselect\" @mousedown=\"dragFrame\" ref=\"cropFrame\" :style=\"frameStyles\">\n        <div class=\"crop-frame-handle corner nw\" @mousedown=\"resizeFrame($event, 'nw')\">&nbsp;</div>\n        <div class=\"crop-frame-handle n\" @mousedown=\"resizeFrame($event, 'n')\">&nbsp;</div>\n        <div class=\"crop-frame-handle corner ne\" @mousedown=\"resizeFrame($event, 'ne')\">&nbsp;</div>\n        <div class=\"crop-frame-handle e\" @mousedown=\"resizeFrame($event, 'e')\">&nbsp;</div>\n        <div class=\"crop-frame-handle corner se\" @mousedown=\"resizeFrame($event, 'se')\">&nbsp;</div>\n        <div class=\"crop-frame-handle s\" @mousedown=\"resizeFrame($event, 's')\">&nbsp;</div>\n        <div class=\"crop-frame-handle corner sw\" @mousedown=\"resizeFrame($event, 'sw')\">&nbsp;</div>\n        <div class=\"crop-frame-handle w\" @mousedown=\"resizeFrame($event, 'w')\">&nbsp;</div>\n        <div class=\"crop-frame-lines horizontal\">\n          <div class=\"crop-line\">&nbsp;</div>\n          <div class=\"crop-line\">&nbsp;</div>\n        </div>\n        <div class=\"crop-frame-lines vertical\">\n          <div class=\"crop-line\">&nbsp;</div>\n          <div class=\"crop-line\">&nbsp;</div>\n        </div>\n        <img :src=\"imageSrc\" ref=\"cropImage\" class=\"crop-frame-img\" :style=\"'top:-' + dy + 'px;left:-' + dx + 'px;'\" alt=\"Your Image\" @load=\"initializeFrame\" />\n      </div>\n    </div>\n<button type=\"button\" class=\"crop-button\" @click=\"cropImage\">Crop</button>\n<img :src=\"croppedImageSrc\" class=\"cropped-img\"/>\n<canvas class=\"cropped-canvas\" ref=\"croppedCanvas\"></canvas>\n</div>\n  ",
    computed: {
        frameStyles: function () {
            return 'top:' + this.dy + 'px; left:' + this.dx + 'px;width:' + this.frameWidth + 'px;height:' + this.frameHeight + 'px;';
        }
    },
    data: function () {
        return {
            //imageSrc: "https://www.hawaii.com/wp-content/uploads/2016/03/Alena-Nicholas-Na-Pali-Coast.jpg",
            imageSrc: "LARGE_elevation.jpg",
            dx: 0,
            dy: 0,
            cursorX: 0,
            cursorY: 0,
            frameWidth: null,
            frameHeight: null,
            frameAdjustmentOptions: {
                n: {
                    adjustWidth: false,
                    adjustHeight: true,
                    moveFrameHorizontally: false,
                    moveFrameVertically: true,
                    reverseX: false,
                    reverseY: false
                },
                s: {
                    adjustWidth: false,
                    adjustHeight: true,
                    moveFrameHorizontally: false,
                    moveFrameVertically: false,
                    reverseX: false,
                    reverseY: true
                },
                e: {
                    adjustWidth: true,
                    adjustHeight: false,
                    moveFrameHorizontally: false,
                    moveFrameVertically: false,
                    reverseX: true,
                    reverseY: false
                },
                w: {
                    adjustWidth: true,
                    adjustHeight: false,
                    moveFrameHorizontally: true,
                    moveFrameVertically: false,
                    reverseX: false,
                    reverseY: false
                },
                nw: {
                    adjustWidth: true,
                    adjustHeight: true,
                    moveFrameHorizontally: true,
                    moveFrameVertically: true,
                    reverseX: false,
                    reverseY: false
                },
                ne: {
                    adjustWidth: true,
                    adjustHeight: true,
                    moveFrameHorizontally: false,
                    moveFrameVertically: true,
                    reverseX: true,
                    reverseY: false
                },
                sw: {
                    adjustWidth: true,
                    adjustHeight: true,
                    moveFrameHorizontally: true,
                    moveFrameVertically: false,
                    reverseX: false,
                    reverseY: true
                },
                se: {
                    adjustWidth: true,
                    adjustHeight: true,
                    moveFrameHorizontally: false,
                    moveFrameVertically: false,
                    reverseX: true,
                    reverseY: true
                }
            },
            croppedImageSrc: ""
        };
    },
    methods: {
        dragFrame: function (e) {
            e = e || window.event;
            e.preventDefault();
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
            document.onmouseup = this.removeDragEventListeners;
            document.onmousemove = this.adjustFramePosition;
        },
        adjustFramePosition: function (e) {
            e = e || window.event;
            e.preventDefault();
            var deltaX = this.cursorX - e.clientX;
            var deltaY = this.cursorY - e.clientY;
            var newX = this.$refs.cropFrame.offsetLeft - deltaX;
            var newY = this.$refs.cropFrame.offsetTop - deltaY;
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
            if (newX + this.$refs.cropFrame.clientWidth < this.$refs.cropContainer.clientWidth && newX > 0) {
                this.dx = newX;
            }
            if (newY + this.$refs.cropFrame.clientHeight < this.$refs.cropContainer.clientHeight && newY > 0) {
                this.dy = newY;
            }
        },
        removeDragEventListeners: function (e) {
            document.onmouseup = null;
            document.onmousemove = null;
        },
        resizeFrame: function (e, direction) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
            var frameAdjustmentOptions = this.frameAdjustmentOptions[direction];
            if (frameAdjustmentOptions !== undefined) {
                document.onmouseup = this.removeDragEventListeners;
                document.onmousemove = function (event) {
                    this.adjustFrameSize(event, frameAdjustmentOptions);
                }.bind(this);
            }
        },
        adjustFrameSize: function (e, options) {
            e = e || window.event;
            e.preventDefault();
            var deltaX = e.clientX - this.cursorX;
            var deltaY = e.clientY - this.cursorY;
            if (options.reverseX)
                deltaX = deltaX * -1;
            if (options.reverseY)
                deltaY = deltaY * -1;
            var newWidth = this.frameWidth - deltaX;
            var newHeight = this.frameHeight - deltaY;
            var newX = (options.moveFrameHorizontally) ? this.dx + deltaX : this.dx;
            var newY = (options.moveFrameVertically) ? this.dy + deltaY : this.dx;
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
            console.log(newX);
            if (options.adjustWidth
                && newWidth > 0
                && newWidth < this.$refs.cropContainer.clientWidth
                && newWidth + this.dx < this.$refs.cropContainer.clientWidth
                && newX >= 0) {
                this.frameWidth = newWidth;
                if (options.moveFrameHorizontally) {
                    this.dx = newX;
                }
            }
            if (options.adjustHeight
                && newHeight > 0
                && newHeight < this.$refs.cropContainer.clientHeight
                && newHeight + this.dy < this.$refs.cropContainer.clientHeight
                && newY >= 0) {
                this.frameHeight -= deltaY;
                if (options.moveFrameVertically) {
                    this.dy = newY;
                }
            }
        },
        initializeFrame: function () {
            if (this.frameHeight == null) {
                this.frameHeight = this.$refs.cropFrame.clientHeight;
            }
            if (this.frameWidth == null) {
                this.frameWidth = this.$refs.cropFrame.clientWidth;
            }
        },
        cropImage: function () {
            this.$refs.croppedCanvas.width = this.frameWidth;
            this.$refs.croppedCanvas.height = this.frameHeight;
            var scaleRatio = this.$refs.cropImage.naturalWidth / this.$refs.cropImage.width;
            var ctx = this.$refs.croppedCanvas.getContext('2d');
            ctx.drawImage(this.$refs.cropImage, this.dx * scaleRatio, this.dy * scaleRatio, this.frameWidth * scaleRatio, this.frameHeight * scaleRatio, 0, 0, this.frameWidth, this.frameHeight);
            this.croppedImageSrc = this.$refs.croppedCanvas.toDataURL();
        }
    }
});
new Vue({
    el: "#page-wrap"
});