//listen for form submit 
document.getElementById('myForm').addEventListener('submit', saveBookmark); 

//Save Bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName, 
        url: siteUrl
    }

    //Test if bookmark is null 
    if(localStorage.getItem('bookmarks') === null) {
        //Init array
        var bookmarks = []; 
        bookmarks.push(bookmark); 
        //Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear Form
    document.getElementById('myForm').reset();

    //Re-fetch bookmarks
    fetchBookmarks();

    
    //Prevent form from submitting
    e.preventDefault();
}

    //Delete Bookmarks
    function deleteBookmark(url) {
        //Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Loop through bookmarks 
        for(var i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].url == url) {
                //Remove from array
                bookmarks.splice(i, 1);
            }
        }
        //Re-set back to localStorage 
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        //Re-fetch bookmarks
        fetchBookmarks();
    }

    // fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    // build output
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += 
        '<div class="well">' +
        '<h3 id="siteName">' + name + '</h3>' +
        '<div class="buttons">' +
        ' <a id="visit" class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
        ' <button id="delete" onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</button>' +
        '</div>' +
        '</div>';
    }
}


//Validate Form
function validateForm(siteName, siteUrl){
    if (!siteName || !siteUrl) {
        alert('Please Fill in the Form');
        return false;
    }

     var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
     var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    return true;
}