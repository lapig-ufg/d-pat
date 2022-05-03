suppressMessages(library(rgdal))
suppressMessages(library(parallel))
suppressMessages(library(raster))

source('maxmin.R')

args = commandArgs(trailingOnly=TRUE)

layername = tools::file_path_sans_ext(args[1]) 

#layername = args[1]
#layername = '/home/lapig/DPAT/bfast/shape/'
#caminho para shapefile gerado a partir da intersecção dos pixels modis/prodes2019

# print("Reading shapefile")
features <- suppressMessages(readOGR(dsn = ".", layer = layername, verbose=FALSE, stringsAsFactors=FALSE))
#features <- shapefile(layername)
coordinates <- features@coords
coordinates <- coordinates[args[2]:args[3],]
#coordinates <- coordinates[1:2,]
#args[2] e args[3] limites para leitura de coordenadas a serem processadas (1, qnt_coordenadas do shape)

bfast_apply = function(coordinate) {
	source('maxmin.R')
	run_bfast_monitor = function(ndvi_ts) {
		
		monitor <- bfastmonitor(ndvi_ts, start = c(2015, 12), formula = response ~ harmon + trend, history = "all")

		monitor_breakpoint = monitor$breakpoint
		monitor_magnitude = monitor$magnitude

		return(data.frame( 
				"monitor_breakpoint" = monitor_breakpoint,
				"monitor_magnitude" = monitor_magnitude
			))
	}

	ndvi <- brick("/mnt/HD01/containers/MDC_LAPIG/APP/BIG-TIF/pa_br_mod13q1_ndvi_250_2000_2021.tif")
	#ndvi <- brick("/data/DADOS_GRID/pa_br_ndvi_maxmin_250_lapig/pa_br_ndvi_maxmin_250.vrt")

	lon <- coordinate[1]
	lat <- coordinate[2]
	cell <- cellFromXY(ndvi, c(lon, lat))
	ndvi_vals <- as.numeric(ndvi[cell])
	
	
	# ndvi_vals <- ndvi_vals[1:414]
	ndvi_valsMM <- maxminFilter(ndvi_vals)


	 if(any(is.na(ndvi_valsMM))){ ###
    #do nothing
    print(c(lon = lon, lat = lat))
    } else { 
	ndvi_ts <- ts(ndvi_valsMM, start= c(2000, 2), frequency = 23)

	result_bfastmonitor <- run_bfast_monitor(ndvi_ts)

	result = data.frame(
		"lon" = lon,
		"lat" = lat
	)

	m <- cbind(result, result_bfastmonitor)

	write.table( m,  
             file="./tmp.csv", 
             append = T, 
             sep=';', 
             row.names=F, 
             col.names=F )

	cbind(result, result_bfastmonitor)
	}
}

ncores = detectCores()
clusterPool = makeCluster(ncores)

hideOutput <- capture.output(output <- clusterEvalQ(clusterPool, {
  	suppressMessages(library(bfast))
	suppressMessages(library(raster))
	suppressMessages(library(rgdal))
}))

 startTime <- Sys.time()
 print("Running bfast")

bfastResultList <- parApply(cl = clusterPool, coordinates, 1, bfast_apply)
bfastResult <- do.call('rbind', bfastResultList)

 endTime <- Sys.time()
 cat("time:\n")
 print((endTime - startTime))

 print("Write CSV file")
bfastResultListTableFormated <- write.table(bfastResult, col.names = FALSE, row.names = FALSE, sep = ";", file = paste0("result", ".csv"))

 #write.table(bfastResult, col.names = FALSE, row.names = FALSE, sep = ";", file = paste0(layername,".csv"))
