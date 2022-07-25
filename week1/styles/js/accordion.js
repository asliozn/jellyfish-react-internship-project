/**
 *
 */
console.log("Loaded!");

function showHide(id) {

    var element = document.getElementById(id);
    if( element && element.style.display == 'block')    
        element.style.display = 'none';
    else 
        element.style.display = 'block';
}