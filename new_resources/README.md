Plugin to display a list of newly published resources on the homepage of the public site.

Configuration
------------------
Add the following lines to config.rb and adjust as necessary
```
#repository to be searched
AppConfig[:new_resource_repo] = 3

#number of items to be displayed
AppConfig[:new_resource_display_number] = 5

#username and password for account with API access
AppConfig[:new_resource_username] = ""
AppConfig[:new_resource_password] = ""
```
