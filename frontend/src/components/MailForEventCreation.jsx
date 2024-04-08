import axios from 'axios';
import sendMail from '../../../servercode/utils/sendMail'; // Assuming this is the file where the sendMail function is defined

// Function to fetch all users from the API
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/get-all-users');
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw new Error('Failed to fetch users.');
  }
};

// Function to send emails to all users
export const sendEmailToAllUsers = async () => {
  try {
    // Fetch all users
    const users = await fetchAllUsers();

    // Extract email addresses of all users
    const emailAddresses = users.map(user => user.email);

    // Compose email content
    const subject = 'New Event Created';
    const template = 'newEventCreated.ejs'; // Assuming you have an email template named 'new_event_created.ejs'
    const data = {
      // Any dynamic data you want to include in the email template
      // You can customize this based on your template structure
    };

    // Send email to each user
    for (const email of emailAddresses) {
      await sendMail({ email, subject, template, data });
    }

    console.log('Emails sent to all users for the new event.');
  } catch (error) {
    console.error('Error sending emails to all users:', error.message);
  }
};

// Call the function to send email to all users when a new event is created
sendEmailToAllUsers();


