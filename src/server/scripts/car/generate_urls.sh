#!/bin/bash

max_features=500000
total_features=5500000

echo "Generating file car_urls.in"
echo -n "" > car_urls.in
for start_index in $(seq 0 $max_features $total_features); do
	for layer in sfb_car:atlas_26_imovel sfb_car:atlas_32_rl sfb_car:atlas_30_app sfb_car:atlas_15_nasc; do
		filepath=$(echo $layer | sed s/\:/\_/)_$start_index.zip
		echo "wget -O $filepath \"http://sistemas.florestal.gov.br/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=$layer&maxFeatures=$max_features&startIndex=$start_index&outputFormat=SHAPE-ZIP\"" >> car_urls.in
	done	
done

echo "Now execute:"
echo " parallel -j8 < car_urls.in"