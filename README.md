# chainapi-google-mail

1) Create new Google cloud project https://console.cloud.google.com/projectcreate or choose existing one. We will be referncing our project under "GoogleDriveProject"
2) Go into  APIs & Services -> Library , search and enable "Cloud Build API"
3) Go in google functions https://console.cloud.google.com/functions/list ,
- Create new function, its better to make the name of the function of 16-32 symbols, in order to make it more protected from being found ever.
- Choose whatever region suits you more
- Leave Http trigger
- Copy URL somewhere you'll need it later
- In Authentication choose "Allow unauthenticated invocations", click on Save button
- leave Memory allocated at 256 Mb if you are not planning on mass sending mails
- leave latest Node.js under runtime, copy past contents of index.js and package.json to the function files
- change "from" constant with your google mail
- Before sending email using Gmail you have to allow non-secure apps to access Gmail you can do this by going to your Gmail settings https://myaccount.google.com/lesssecureapps
- change "pass" constant with your google mail password or with the app password (it is created when you have two factor auth, you can find full instruction on how to create it over here https://support.google.com/accounts/answer/185833)
- change entry point in the upper right corner to the "sendMail"
- deploy your function
4) After deployment copy and paste its address into widget

