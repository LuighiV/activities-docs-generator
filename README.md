# Google Docs generator for activities registered in Google SpreadSheet

Generates a google docs from a list of activities registered in SpreadSheet. 
Employs [clasp](https://github.com/google/clasp) to sync and manage the
deployment of the App Script project.

To use clasp, make sure you have a `package.json` in the directory of your
project. Then, perform the following instruction:

```
clasp login 
```

To login into the Google App script service. Then you can use the `clasp push` or
`clasp pull` to grab the changes from the Google platform.
