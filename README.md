#CSC 591/791 Milestone-1
      Krishna Teja Dinavahi (kdinava)
      Aneesh Kher  (aakher)
      Anurag Sadanand Shendge (ashendg)


##Project used to test the builds
###[jbehave](https://github.com/aneeshkher/jbehave-web)
>   JBehave is a collection of extension for JBehave that extend its capabilities in ways related to HTTP and the web.
    We forked this application and using it to test our builds.


### Build section
>	***Ability to trigger a build in response to git commit via git post-commit hook***
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
	
