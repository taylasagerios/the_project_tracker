// Function to update the seconds every second
setInterval(function() {
    var todaysDate = dayjs().format('MM/DD/YYYY HH:mm:ss');
    console.log (todaysDate)
    $('#today').text(todaysDate) 
}, 1000)

// Modal Dialog
var myModal = document.getElementById('modal')
var myInput = document.getElementById('input')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})
