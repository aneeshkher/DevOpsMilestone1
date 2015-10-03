#CSC 591/791 Milestone-1
#### Krishna Teja Dinavahi (kdinava)
      	1. Setup Jenkins
      	2. Wrote main.js to access the RESTful API
      	3. email configuration
      	4. Readme.md
#### Aneesh Kher  (aakher)
      	1. Setup Jenkins
      	2. Post commit hook and email configuration
      	3. Screencast
      	4. Readme.md
#### Anurag Sadanand Shendge (ashendg)
      	1. Setup Jenkins
      	2. branch specific build and email configuration	
      	3. Readme.md
      	4. Screencast


###Project used to test the builds
***[jbehave](https://github.com/aneeshkher/jbehave-web) forked from [this](https://github.com/jbehave/jbehave-web) link***
>   JBehave is a collection of extension for JBehave that extend its capabilities in ways related to HTTP and the web.
    We forked this application and using it to test our builds.

###Build Setup
>   We installed Tomcat,Jenkins,git, maven on our local machine. We used the follwing plugins in Jenkins:   
	1. **Github Plugin**: The github plugin helps us to use our repo by specifying git clone url for build process    
	2. **Mailer Plugin**: The mailer plugin is used to send emails from Jenkins to notify about the build status



### Build section
>	***1. Ability to trigger a build in response to git commit via git post-commit hook***
>>	Post Commit contents:   We used a perl script in the post commit file to trigger the build on either 'dev' or 'release' branches


```perl
#!/usr/bin/perl
my $branch = `git rev-parse --abbrev-ref HEAD`;
chomp($branch);
print "Committing to branch $branch\n";

my $curlString;

if ($branch eq "release") {
	$curlString = 'curl -s "http://localhost:8080/jenkins/job/M1-release/buildWithParameters?token=build-release&branch=release"';
} elsif ($branch eq "dev") {
	$curlString = 'curl -s "http://localhost:8080/jenkins/job/M1-dev/buildWithParameters?token=build-dev&branch=dev"';
}
print "Sending curl string: $curlString\n";
`$curlString`;

```	

>	***2. The ability to execute a build job via a script or build manager (e.g., shell, maven), which ensures a clean build each time.***
>>	As jbehave is a Java application, we installed maven and integrated it with Jenkins to ensure a clean build each time. pom.xml was provided by Authors of jbehave.


>   ***3. The ability to determine failure or success of a build job and trigger an external event [email]***
>>	For this task, we configured the email plugin on Jenkins. Here are a few screenshots that demonstrate some of the configuration.   

![Screenshot1](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/ExtendedEmailPlugin.png)   

>>  Another screenshot showing more configuration   

![Screenshot2](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/EmailPlugin.png)   

>>	

>	***4. The ability to have multiple jobs corresponding to multiple branches in a repository***	
>>	We added one job in Jenkins which corresponds to each job in git. The post-commit git hook will get the current branch on which the commit is made and will trigger the respective job on Jenkins. Each job of jenkins is configured as a parameterized build, which will accept the build string from the git post-commit hook and run the build on the local repository according to that.   
   
>>  Here is a screenshot showing the 'parameterized' field enabled   

![Screenshot4](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/M1-Release-config-1.png)   
   
>>  Another screenshot showing the build trigger configuration in Jenkins   
 
![Screenshot5](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/M1-release-config-2.png)   

 

>	***5. The ability to track and display a history of past builds.***
>> 	The following code snippet helps us dispaly the history of past builds by making a GET request to the REST API provided by Jenkins

```javascript
var git = require('git-rev');
var needle = require("needle");

var brnc;

var client =
{
    listBuilds: function( onResponse )
    {
        git.branch(function (str) {
        if(str=="dev")
        	needle.get("http://localhost:8080/jenkins/job/M1-dev/api/json?pretty=true", onResponse)
        else if(str=="release")
         	needle.get("http://localhost:8080/jenkins/job/M1-release/api/json?pretty=true", onResponse)
		})
    },
}

client.listBuilds(function(error, response)
{
        var data = response.body;
        console.log(data['builds']);
});

```  
  
>>  Here is a screenshot of the list of the builds   

![Screenshot3](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/BuildsList.png)


#Screencast   
###(Click the image below  and you will be redirected to YouTube)
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/uwU8yQDhyNE/0.jpg)](https://youtu.be/uwU8yQDhyNE)

