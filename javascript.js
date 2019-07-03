
//jquery function to run upon the page loading
$(function(){
  console.log("Page Loaded");
  //all of the new buttons are added to this page with this code below
  populateButtons(searchArray, 'searchButton', '#buttonsArea');
  console.log(populateButtons);
 
})

//initial search array buttons
var searchArray = ['Dog', 'Cat', 'Lizard'];

//Function to run through the array, a class to add them to, and a place to add new buttons
function populateButtons(searchArray, classToAdd, areaToAddTo) {
  //using this function to add in new buttons, empties the button area each time we add a new button. Avoid adding in copies of buttons
  $(areaToAddTo).empty();
  //for loop to run through array 
  for (var i = 0; i < searchArray.length; i++) {
    //creating a new variable for the new buttons
    var a = $('<button>');
    //adds a class name to the element, in this case the button element
    a.addClass(classToAdd);
    //attr returns values from the selected element, the "i" is in there so it goes into the same array
    a.attr('data-type', searchArray[i]);
    //updates the text in a selected element
    a.text(searchArray[i]);
    //appends that updated text to the area that I told it to go
    $(areaToAddTo).append(a);
  }
}


$(document).on('click', '.searchButton', function () {
  var type = $(this).data('type');
  $('#searches').empty();
  
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=BycTRqoosA38H6cJNRZL96QodYDVVkrX&limit=10';
  // Creating an AJAX call for the specific button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"})
    .done(function (response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {




        
        var searchDiv = $('<div class="search-item">');
        //current giphy that is being looped through
        var rating = response.data[i].rating;
        //reference a paragraph tag and put the rating into the paragraph
        var p = $('<p>').text('Rating: ' + rating);
        // set the animated and the still images
        var animated = response.data[i].images.fixed_height.url;
        //change to the still version of the gif
        var still = response.data[i].images.fixed_height_still.url;
        //new variable for an image 
        var image = $('<img>');
        //load images as still first
        image.attr('src', still);
        image.attr('data-still', still);
        image.attr('data-animated', animated);
        //reference the sting
        image.attr('data-state', 'still')
        image.addClass('searchImage');
        searchDiv.append(p);
        //adding in the giphy images
        searchDiv.append(image);
        //add in the searches into the html
        $('#searches').append(searchDiv);
      }

    })
})

//make image to animate
$(document).on('click', '.searchImage', function () {
  //telling the image to have a state of still
  var state = $(this).attr('data-state');
  //if state = still then
  if (state == 'still') {
    $(this).attr('src', $(this).data('animated'));
    $(this).attr('data-state', 'animated');

  } else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }
})

//add in new buttons
$('#addSearch').on('click', function(){
//grabs whatever is stored within this text box, eq0, looking for the first version of an input
  var newSearch = $('input').eq(0).val();
  searchArray.push(newSearch);
  populateButtons(searchArray, 'searchButton', '#buttonsArea');
  $("#buttonsArea").append(populateButtons);
  console.log(populateButtons);
  return false;
});


