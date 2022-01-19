(function() {
  // Display the image to be uploaded.
  $('#dvd_image').on('change', function(e) {
    return readURL(this);
  });

  this.readURL = function(input) {
    var reader;
    
    // Read the contents of the image file to be uploaded and display it.

    if (input.files && input.files[0]) {
      reader = new FileReader();
      reader.onload = function(e) {
        var $preview;
        $('.image_to_upload').attr('src', e.target.result);
        $preview = $('.preview');
        if ($preview.hasClass('hide')) {
          return $preview.toggleClass('hide');
        }
      };
      return reader.readAsDataURL(input.files[0]);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBREE7RUFBQTtFQUVBLENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxFQUFoQixDQUFtQixRQUFuQixFQUE2QixRQUFBLENBQUMsQ0FBRCxDQUFBO1dBQzNCLE9BQUEsQ0FBUSxJQUFSO0VBRDJCLENBQTdCOztFQUdBLElBQUMsQ0FBQSxPQUFELEdBQVcsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUlULFFBQUEsTUFBQTs7OztJQUFBLElBQUksS0FBSyxDQUFDLEtBQU4sSUFBZSxLQUFLLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBL0I7TUFDRSxNQUFBLEdBQVMsSUFBSSxVQUFKLENBQUE7TUFFVCxNQUFNLENBQUMsTUFBUCxHQUFnQixRQUFBLENBQUMsQ0FBRCxDQUFBO0FBQ2QsWUFBQTtRQUFBLENBQUEsQ0FBRSxrQkFBRixDQUFxQixDQUFDLElBQXRCLENBQTJCLEtBQTNCLEVBQWtDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBM0M7UUFDQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLFVBQUY7UUFDWCxJQUFHLFFBQVEsQ0FBQyxRQUFULENBQWtCLE1BQWxCLENBQUg7aUJBQ0UsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsRUFERjs7TUFIYzthQU1oQixNQUFNLENBQUMsYUFBUCxDQUFxQixLQUFLLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBakMsRUFURjs7RUFKUztBQUxYIiwic291cmNlc0NvbnRlbnQiOlsiICAjIERpc3BsYXkgdGhlIGltYWdlIHRvIGJlIHVwbG9hZGVkLlxuJCgnI2R2ZF9pbWFnZScpLm9uICdjaGFuZ2UnLCAoZSkgLT5cbiAgcmVhZFVSTCh0aGlzKTtcblxuQHJlYWRVUkwgPSAoaW5wdXQpIC0+XG4gICNcbiAgIyBSZWFkIHRoZSBjb250ZW50cyBvZiB0aGUgaW1hZ2UgZmlsZSB0byBiZSB1cGxvYWRlZCBhbmQgZGlzcGxheSBpdC5cbiAgI1xuICBpZiAoaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXNbMF0pXG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSAtPlxuICAgICAgJCgnLmltYWdlX3RvX3VwbG9hZCcpLmF0dHIoJ3NyYycsIGUudGFyZ2V0LnJlc3VsdClcbiAgICAgICRwcmV2aWV3ID0gJCgnLnByZXZpZXcnKVxuICAgICAgaWYgJHByZXZpZXcuaGFzQ2xhc3MoJ2hpZGUnKVxuICAgICAgICAkcHJldmlldy50b2dnbGVDbGFzcygnaGlkZScpO1xuXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoaW5wdXQuZmlsZXNbMF0pOyJdfQ==
//# sourceURL=coffeescript