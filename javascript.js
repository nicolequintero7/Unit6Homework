$(function() {
    //all of the new buttons are added to this page with this code below
    populateButtons(searchArray,'searchButton','#buttonsArea');
    console.log("Page Loaded");

})

//initial search array buttons
var searchArray = ['Dog', 'Cat', 'Bird',];

//Function to run through the array, a class to add them to, and a place to add new buttons
function populateButtons(searchArray,classToAdd,areaToAddTo){
    //using this function to add in new buttons, empties the button area each time we add a new button
    $(areaToAddTo).empty();
    //for loop to run through array 
    for(var i=0;i<searchArray.length;i++){
    //creating a new variable for the new buttons
    var a =$('<button>');
    //adds a class name to the element, in this case the button element
    a.addClass(classToAdd);
    //attr returns values from the selected element, the "i" is in there so it goes into the same array
    a.attr('data-type',searchArray[i])
    //updates the text in a selected element
    a.text(searchArray[i]);
    //appends that updated text to the area that I told it to go
    $(areaToAddTo).append(a);
    }
}


$(document).on('click','.searchButton', function(){
    var type =$(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=BycTRqoosA38H6cJNRZL96QodYDVVkrX&limit=10';
      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"})
        .done(function(response) {
          console.log(response);
      })
})