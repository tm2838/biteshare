## Description
<!-- A short description for the purpose of this PR -->
Testing for PR for the first time
Implement UI for HostQR screens by adding "react-native-qrcode-svg": "^6.1.2",
    "react-native-svg": "^12.1.1" (Will research more on how to implement with data passing as props)
Adding 2 fonts - 'open sans' and 'Montserrat' using "@expo-google-fonts/montserrat": "^0.2.0",
    "@expo-google-fonts/open-sans": "^0.2.0" (please feel free to change it since I don't know how to add to infrastructure fonts.js)

## How to test
<!-- How could this PR be tested? (e.g. unit tests, instructions for manual test) -->
run 'npm start' or 'npm run ios' to see the QR code
## Notes
<!-- Additional things reviewers should be aware of -->
I noticed we don't have ios folder or androis folder..is it something we should be concern about?
'react-native.config.js' is added for adding fonts - might not need it since this is using expo...
## Issue tracking
<!-- Link to Trello ticket -->