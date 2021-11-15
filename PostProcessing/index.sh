#!/bin/bash
cd src

node deleteFiles.js

node processLog.js

node createArray.js

node formatArray.js

node outputResolvedOrder.js

node formatOutput.js

node openFile.js

cd ..