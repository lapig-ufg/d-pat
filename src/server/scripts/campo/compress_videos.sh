#!/bin/bash

#

INPUT_DIR_VIDEO='dados/videos_drone/'
INPUT_DIR_FOTO='dados/fotos_drone/'

# COMPRESS VIDEOS .MP4
 for file in $(find $INPUT_DIR_VIDEO -name '*.MP4'); do
 	output_dir=$(echo $(dirname $file) | sed 's/videos_drone/videos_drone_c/')
 	output_file="$output_dir"/$(basename $file)
 	mkdir -p $output_dir
	if [ -e $output_file ]
 	then
 		echo "skiping" $output_file
 	else
 		ffmpeg -y -i $file -b:v 2.0M -c:v libx264 -threads 0 -an $output_file
 	fi
 done

# # COMPRESS VIDEOS .MOV
 for file in $(find $INPUT_DIR_VIDEO -name '*.MOV'); do
 	output_dir=$(echo $(dirname $file) | sed 's/videos_drone/videos_drone_c/')
 	output_file="$output_dir"/$(basename $file)
 	mkdir -p $output_dir
 	if [ -e $output_file ]
 	then
 		echo "skiping" $output_file
 	else
 		ffmpeg -y -i $file -b:v 2.0M -c:v libx264 -threads 0 -an $output_file
 	fi
 done

for file in $(find $INPUT_DIR_FOTO -name '*.JPG'); do
	output_dir=$(echo $(dirname $file) | sed 's/fotos_drone/fotos_drone_c/')
	output_file="$output_dir"/$(basename $file)
	mkdir -p $output_dir
	jpegoptim --stdout --size=1024k $file > $output_file
done
