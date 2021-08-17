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

## References for multilingual documentation

As required for the OAuth team, the pages should be in English, but as the
public of this add-on are Spanish speakers, then I must setup a multilingual
page for the documentation.

For my references I took as examples this articles, which help me a lot to
understand how to add this feature to the Jekyll generated site:

* https://forestry.io/blog/creating-a-multilingual-blog-with-jekyll/
* http://chocanto.me/2016/04/16/jekyll-multilingual.html
