# Installation Notes
1. Clone the repo to your system
2. Create a new file in the root of the app called ```vcap-local.json```
3. Copy and Paste the contents of the VCAP_SERVICES from the commsCalendar app into 'vcap-local.json' [SCREEN CAP](docs/vcapservices.png)
4. Run npm install
5. Run: node app.js

**Note:** Do not Push your ```vcap-local.json``` file to the repo, it contains sensitive credentials!

# Contirubtion Notes

See [CONTRIBUTING.md](CONTRIBUTING.md) for infomation on how to contribute to this project. 

# Don't Break the App

Pushing to Master results in immediate build/deploy.. **test your code first!**