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

