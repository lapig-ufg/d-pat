INPUT_DIR_VIDEO='dados/fotos_drone/Campo_03'
INPUT_DIR_FOTO='dados/fotos_drone/'

# COMPRESS VIDEOS .MP4
for file in $(find $INPUT_DIR_VIDEO -name '*.MP4'); do
	output_dir=$(echo $(dirname $file) | sed 's/fotos_drone/videos_drone/')
	output_file="$output_dir"/$(basename $file)
	mkdir -p $output_dir
	mv $file $output_dir
	#echo ffmpeg -y -i $file -b:v 2.0M -c:v libx264 -threads 0 -an $output_file
done