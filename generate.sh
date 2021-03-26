#!/bin/bash

# "ng g c" short cut for this project

while getopts ":m:c:p:" opt; do
  case $opt in
    m) module="$OPTARG"
    ;;
    c) component="$OPTARG"
    ;;
    p) page="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done
