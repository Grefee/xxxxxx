Basic version of react app which has login screen and home page.

To initiate the project you need to have pre-instalaled nodejs and dotnet.

To initiate the project download the repo and in terminal go to /backend/BackendApi and run "dotnet run" it should start on http on this url .. it could be changed in BackendApi.http file.. http://localhost:5260

This backend is serving POST /api/login and GET /api/clients.

To run and server the react frontend, you need to open another terminal from root of project you go to /frontend then you need to install node modules so you run "npm install" and to server in dev mode you run "npm run dev".

You need to create firstly .env file where you specify the backend URL and PORT as these strings VITE_BACK_URL=xxx  , VITE_BACK_PORT=xxx. After that the project should be able to communicate between frontend and backend.. 
