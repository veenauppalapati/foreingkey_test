$(document).ready(function() {
   alert('i loaded');

   $('.next-button').click(function(){
    $('.nav-tabs > .active').next('li').find('a').trigger('click');
    //trigger the click on the tab same like we click on the tab
});
$('.previous-button').click(function(){
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    //trigger the click on the tab same like we click on the tab
})

// submit button is triggered
$('#submitbutton').click(function(event){
    event.preventDefault();
    console.log('submit button is triggered');
    formSubmit();
})
    // A function to handle what happens when the form is submitted to create a new Author
    function formSubmit() {       
        // // Don't do anything if the name fields hasn't been filled out
        // if (!.val().trim().trim()) {
        //   return;
        console.log("function is called");

        var submitThisData = {
            // Grabbing the values of user data in an object called userData
            userData :{
                first_name: $('#firstname').val().trim(),
                last_name: $('#lastname').val().trim(),
                email: $('#email').val().trim(),
                password: $('#Password').val().trim(),
                gender: $('#gender').val().trim(),
                pet: $('#pet').val().trim(),
               
            },
            // Grabbing the values of profession data that will go into profession table in an object called userData
            professionData : {
                // UserId: 1,
                category: $("#category").val().trim()
        } 
        }
                   

        // Ajax post request for creating a member in our database. 
        
        $.post("/api/members", submitThisData).then(function(result){
            alert('user stored');
            console.log(result);
        })
           
          
         }
      });

