# HomeAssistant Guest Thermostat

## Overview
This project provides a static HTML page that will display a thermostat widget to users in order to control a home assistant thermostat. This could be used as a receipe for other types of readonly dashboards or control panels. Be sure to read the security considerations section before proceeding.

## Setup
1. Create a read-only home assistant user, hereafter referred to as \<READONLY_USER>\, first create user from the home asisstant UI, then follow the steps [here](https://community.home-assistant.io/t/add-user-to-read-only-users-group/399401/7) to make it a read only user.
2. Obtain a long lived access token for your read only user, hereafter refered to as \<TOKEN\>. To do this login as READONLY_USER, then follow [these steps](https://community.home-assistant.io/t/how-to-get-long-lived-access-token/162159/5), *make sure you get a token for the readonly user and not your owner account*.
3. Create a webhook trigger in automations to accept new thermostat settings an example .yaml file is included, but it will need to be modified at minimum to match your entity ids. Note the \<WEBHOOK_ID\>.
  * If you want to post this on the internet rather than LAN, you'll need to hit the gear next to the webhook id and uncheck "Only Accessible form the local network". 
5. Customize the files as needed to fit your needs, use your entity id's etc.
6. Copy the project files HTML, CSS, and JS files to a suitable webserver. This could be hosted either from the HomeAssistant WWW directory, or from any other webserver. The only hosting requirement is that the user accessing the webpage is also able to connect to the home assistant instance. If you want the user to have access from anywhere then you'll need to allow access to HomeAssistant over the internet, see "Security Considerations" below.
7. Lastly, create a link with query string that contains the following information replacing the items in \<\> https://\<URL_TO_WEBPAGE\>?room=\<room_name\>&token=\<TOKEN\>&hook_id=\<WEBHOOK_ID\>
8. [Optional] Generate a QR code of the link above print it out and put it in the room to be controlled, for ease of use.

## How it works
This project makes use of the HomeAssistant API and webhooks to perform limited access control of widgets publicly(internet), or semi-publicly (lan only).
1. The guest user is provided with the read only users access token via the URL, this allows pages to display state. Note that unless you setup more fine grained read access the guest could read data from any HA entities. See Security Considerations.
2. Webhooks and automations are used to enable specific actions on behalf of the guest user, this means that even if the read only account is compromised an attacker can't perform any actions not available via a webhook triggered automation.

Pages have java scripts that fetch relevant data from the home asisstant rest api, and then call the necessary webhooks when users interact.

## Security Considerations
This project involves doing things to provide access to home assistant that bypasses the ordinary login process, that alone should warrant due consideration, in order to stay safe here are a few things to do and to avoid and you should be safe. That being said I'm just a guy not an expert this may be totally unsecure, use at your own risk.

1. *SETUP A READONLY_USER* If you don't setup a readonly user then the long lived access token will have full read write access to your home assistant, that's alot of permission for anyone.
2. *DO NOT POST THE GENERATED URL PUBLICLY* In this project all keys/credentials are stored in the URL string, so if you post this URL online anywhere and your instance is accessible from the internet, anyone will have read-only *access to all your home asssistant data* or worse full access if you didn't setup the READONLY_USER, they'll also be able to change your thermostat setttings.
3. *DO NOT HARDCODE CREDENTIALS* The reason for storing credentials in the URL rather than in the webpage/code itself is so that the code can be freely shared and modified improved etc, it's easy to forget to strip out a credential when sharing code.
4. If you want a public internet wide dashboard/control, consider setting up a user group with access limited to the entities needed. See [Auth Permissions](https://developers.home-assistant.io/docs/auth_permissions/) I'm not sure how well enforced these permissions are in HA so use at your own risk.
5. Only share the full link with credentials with people who need it.
