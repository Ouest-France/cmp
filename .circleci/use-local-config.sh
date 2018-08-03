#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=8639a138b31a89ad1ac6b82f5cad1b57fe5389e8 \
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/Ouest-France/cmp
