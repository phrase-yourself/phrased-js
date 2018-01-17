#!/bin/bash

set -eu

function task_usage {
  echo "usage: $0 test | release"
  exit 1
}

function task_test {
  npm run test
}

args=${1:-}
shift || true
case "$args" in
  test) task_test ;;
  release) task_release ;;
  *) task_usage ;;
esac
