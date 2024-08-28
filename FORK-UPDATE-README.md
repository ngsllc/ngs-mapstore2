# NGS MapStore2 Fork Update Process
To update our NGS MapStore2 fork with latest changes from geosolutions-it's MapStore2 repo, you can just create a Pull Request to merge their repo into ours. This should be relatively straight forward. 

However, you should check their Patcher repo (https://github.com/geosolutions-it/Patcher) to see if any new commits have been merged into this repo. If there have been new commits that we want in our fork, you will need to update ngsllc/MapStore2/package.json to point to the latest commit hash. 

This was done in our fork because in the geosolutions-it repo they just point to the Patcher master branch, which caused problems during our ci process in ngs-mapstore. 