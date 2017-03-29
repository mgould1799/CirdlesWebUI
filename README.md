# CirdlesWebUI
Angular project for hosting CIRDLES' services.

To update the server:
  1. Push changes and ssh into cirdlesserver.cs.cofc.edu
  2. Navigate to /home/tnewman16/CirdlesWebUI
  3. Pull changes into project
  4. Build production version with the command "ng build --prod"
  5. Undeploy /, /prawn, and /home on cirdlesserver.cs.cofc.edu/manager
  6. Deploy them again using the route (/, /prawn, etc.) for Context Path and "/home/tnewman16/CirdlesWebUI/dist" for WAR or Directory URL
