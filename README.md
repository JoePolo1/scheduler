!["Interview Scheduler Brand Logo"](https://github.com/JoePolo1/scheduler/blob/master/docs/Brand%20Logo.png?raw=true)

# Interview Scheduler

A React application that allows users to book and cancel interviews using the latest tools and techniques. Interview Scheduler combines a concise API with a WebSocket server to build a realtime experience.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

The app will be served at http://localhost:8000/.
Go to http://localhost:8000/ in your browser once your scheduler API is running.

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer
- Storybook
- Jest
- Sass

## Main Features

The Interview Scheduler provides users with a quick and simple way to book an interview between Monday and Friday from noon until 5 pm local time. Simply select a weekday in the navigation, then click on the plus **(+)** icon on an empty timeslot. Users enter their name in the text field, select an available interviewer from the photo avatars, and click **Save** to confirm the appointment. Saved appointments have a light blue background with a blue left side bar with the user's name and the interviewer's name, indicating the timeslot is now confirmed.


https://user-images.githubusercontent.com/116989045/213353046-5456041a-0e44-4cde-bbe5-a7ebffa220b2.mov


## Editing an Existing Appointment

Users may edit an existing appointment to change their name or to select another available interviewer. Click on the **Edit** icon on the bottom-right hand side of the desired appointment. Click on a new interviewer and/or type a new name. Complete the edit by clicking **Save**.


https://user-images.githubusercontent.com/116989045/213353157-a0400830-ae8b-4454-a300-6cb962290b97.mov


## Deleting an Appointment

Users may delete an existing appointment.

***NOTE: Deleting an appointment is a destructive method, and is not recoverable unless recreating from step one.***

To delete an existing appointment, Click on the **Delete** icon which is shaped like a trash can on the bottom-right hand side of the desired appointment. A confirmation notice will populate to prevent accidental deletion. To confirm cancellation, click on the **Confirm** button. The appointment will disappear from that timeslot. See the video below for visual guidance.


https://user-images.githubusercontent.com/116989045/213353203-35c37389-7cbf-4f81-94ef-f96da30c1a16.mov







