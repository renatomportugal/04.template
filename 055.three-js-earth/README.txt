A Pen created at CodePen.io. You can find this one at https://codepen.io/qkevinto/pen/EVGrGq.

 Wait a bit for the textures to load!

Made with the help of http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/.

Textures from http://planetpixelemporium.com/planets.html

Though some of the information there is outdated or omitted. Use THREE.TextureLoader() instead of THREE.ImageUtils.loadTexture(), and instead of using the unexplained canvasCloud, use alphaMap property on the cloud material to add a transparency map, making sure the blacks in the image corresponds to 100% transparency, white is 0% transparency, and everything in between.