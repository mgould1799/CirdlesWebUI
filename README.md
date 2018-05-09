# CirdlesWebUI
This project consists of the frontend for the CIRDLES web services.

## Updating the Server
There is a simple bash script on the server that updates and deploys both the frontend and backend projects. When this file is run, it pulls in any changes that have been made on the master branch in each of the CIRDLES repositories. Once the changes are pulled, the projects are built and deployed.

This repository is deployed by copying the contents of the `dist/` folder (which is created after running `npm run build`) into the `/var/www/cirdlesserver/` directory on the server.

This script is run every night via a cron job (more can be read about this at the [CirdlesWebServices](https://github.com/CIRDLES/CirdlesWebServices) repository)

To run this script manually:
  1. ssh into [cirdlesserver.cs.cofc.edu](http://cirdlesserver.cs.cofc.edu)
  2. Execute the following command: `sudo /usr/local/bin/deploy` (Note: you must have root privileges to run this)
