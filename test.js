window.addEventListener("DOMContentLoaded", function(event){
    // Once DOM is loaded add onclick function
    // Select all buttons with class "btn-delete"
    document.querySelectorAll('button.btn-delete').forEach(el => {
      // Walk each selected button and set onclick function
      // remember to declare event function within a wrapper if you're gonna pass a var
      el.onclick = () => deleteItem(el)
      /* "() => Code" is called arrow function
      * it's the same as a regular anonymous function
        function(){Code}
      */
      // if you want to just execute the function
      // el.onclick = deleteItem
    })
  });
  // Declare your function outer the DOMContentLoaded event listener
  function deleteItem(e){
    // e is the element object, so you do not need to get .target
    e.parentElement.remove()
  }