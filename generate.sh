#!/bin/bash

# "ng g c" shortcut for this project
# ex: ./generate.sh -m main-system -n users -t page

# ==== read arguments from command line ====
while getopts ":m:n:t:" opt; do
  case $opt in
    m) module="$OPTARG"
    ;;
    n) name="$OPTARG"
    ;;
    t) type="$OPTARG" # can be page or component
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

# ==== show arguments input from command line ====
printf "module=%s\n" "$module"
printf "type=%s\n" "$type" # can be page or components
printf "name=%s\n" "$name"
printf "Current dir is %s\n" "$PWD"

# ==== execute ====
ng generate component "modules/${module}/${type}s/${name}" --module="$module"

# ==== pause to show progress ====
function pause(){
        read -n 1 -p "$*" INP
        if [ $INP != '' ] ; then
                echo -ne '\b \n'
        fi
}
pause 'Press any key to continue...'
