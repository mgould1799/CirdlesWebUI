# CirdlesWebUI
React project for hosting CIRDLES' web services.

To update the server:
  1. Push changes and ssh into cirdlesserver.cs.cofc.edu
  2. Navigate to wherever the project is located on the server
  3. Pull changes into the project
  4. Build production version with the command "npm run build"
  5. Copy everything from the dist/ folder into /var/www/cirdlesserver

This process will soon be expedited through the use of a simple bash script.
