#!/bin/bash
url=https://hooks.slack.com/services/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

if [ $# -ge 1 ]; then
	msg=$@
else
	msg="nunu"
fi

payload='{"text": "'$msg'"}'
echo Try send $payload to Slack channel
curl -X POST -H 'Content-type: application/json' \
--data "$payload" $url
