$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonArea');
})

//Initial Buttons to populate page when page is called
var searchArray = ['Dog', 'Cat', 'Bird', 'Cheetah','Falcon', 'Corgis'];


//Populates buttons to the page 
function populateButtons (searchArray, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for (i=0; i<searchArray.length; i++){
        var a = $('<button type="button" class="btn btn-primary">');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}


//AJAX and API call to Giphy and also reading of data-type from click event
$(document).on('click', '.searchButton', function(){
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=R31Haiea6XFfzAPdWRvM9iTw27fFElRW&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).done(function(response){
        for(var i=0; i < response.data.length; i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: ' + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img class="image-fluid" alt="Responsive-image">');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state','still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').prepend(searchDiv);
        }
    })
})

//Animates GIFS on click
$(document).on('click', '.searchImage',function(){
    var state =$(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else{
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

//Adds new buttons to page from search bar
$('#addSearch').on('click', function(){
    var newSearch =$('input').eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttonArea');
    return false;
    
})

