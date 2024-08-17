#!/bin/bash
set -e

WORKDIR="$(pwd)"

function run_server() {
    echo "Starting server"
    cd "${WORKDIR}/server"
    npm install
    npm run start:dev &
    SERVER_PID=$!
    trap "kill $SERVER_PID" INT TERM EXIT
}

function run_ui() {
    echo "Starting UI"
    cd "${WORKDIR}/weather-ui"
    npm install
    npm run start &
    UI_PID=$!
    trap "kill $UI_PID" INT TERM EXIT
}

echo "Starting runner"

trap 'exit' INT TERM EXIT

run_server
run_ui

wait

echo "Runner finished"

