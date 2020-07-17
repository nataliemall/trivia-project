<html>
<head>
<title>Confirmation Page of Web Form</title>
</head>
<h1>Confirmation Page of Customer Info</h1>

<p>Thank you for submitting this form. 

<p>We have successfully received it. 

<p>Below is a summary of the information you provided.<br><br>  
<?php
echo 'First Name: ' . $_POST ["FirstName"] . '<br>';
echo 'Last Name: ' . $_POST ["LastName"] . '<br>';
echo 'Email Address: ' . $_POST ["EmailAddress"] . '<br>';
echo 'Telephone Number: ' . $_POST ["TelephoneNumber"];
?>
