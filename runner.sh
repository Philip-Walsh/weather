#!/bin/bash
set -e

WORKDIR="$(pwd)"

function run_server() {
    echo "Starting server 🧠"
    cd "${WORKDIR}/server"
    npm install
    npm run start:dev
}

function run_ui() {
    echo "Starting UI 👁‍🗨"
    cd "${WORKDIR}/front-end"
    npm install
    npm run start
}

trap 'echo "Stopping processes..."; kill $(jobs -p); wait' SIGINT SIGTERM

echo "Starting runner"

run_server &
run_ui &

wait

echo "Runner finished"
