#!/bin/sh

rsync --delete --exclude ".git" -r . dh:/home/yanigisawa/valleyclockworks.com
