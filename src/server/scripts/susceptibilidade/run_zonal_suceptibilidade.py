import sys
import gdal, ogr, osr, numpy
from scipy import stats

def zonal_mean(input_value_raster, feature, srs):

    driver = ogr.GetDriverByName("Memory")
    
    raster = gdal.Open(input_value_raster)
    
    geometry = feature.GetGeometryRef()

    data_source = driver.CreateDataSource("tempDS")

    layer = data_source.CreateLayer("tempLayer", srs, geometry.GetGeometryType())
        
    Nfeature = ogr.Feature(layer.GetLayerDefn());
    Nfeature.SetGeometry(geometry);
    layer.CreateFeature(Nfeature);

    # Get raster georeference info
    transform = raster.GetGeoTransform()
    xOrigin = transform[0]
    yOrigin = transform[3]
    pixelWidth = transform[1]
    pixelHeight = transform[5]

    if (geometry.GetGeometryName() == 'MULTIPOLYGON'):
        count = 0
        pointsX = []; pointsY = []
        for polygon in geometry:
            geomInner = geometry.GetGeometryRef(count)
            ring = geomInner.GetGeometryRef(0)
            numpoints = ring.GetPointCount()
            for p in range(numpoints):
                    lon, lat, z = ring.GetPoint(p)
                    pointsX.append(lon)
                    pointsY.append(lat)
            count += 1
    elif (geometry.GetGeometryName() == 'POLYGON'):
        ring = geometry.GetGeometryRef(0)
        numpoints = ring.GetPointCount()
        pointsX = []; pointsY = []
        for p in range(numpoints):
                lon, lat, z = ring.GetPoint(p)
                pointsX.append(lon)
                pointsY.append(lat)

    else:
        sys.exit("ERROR: Geometry needs to be either Polygon or Multipolygon")

    xmin = min(pointsX)
    xmax = max(pointsX)
    ymin = min(pointsY)
    ymax = max(pointsY)

    # Specify offset and rows and columns to read
    xoff = int((xmin - xOrigin)/pixelWidth)
    yoff = int((yOrigin - ymax)/pixelWidth)
    xcount = int((xmax - xmin)/pixelWidth)
    ycount = int((ymax - ymin)/pixelWidth)

    if xcount > 0 and ycount > 0:

        # Create memory target raster
        target_ds = gdal.GetDriverByName('MEM').Create('', xcount, ycount, gdal.GDT_Byte)
        target_ds.SetGeoTransform((
            xmin, pixelWidth, 0,
            ymax, 0, pixelHeight,
        ))

        # Create for target raster the same projection as for the value raster
        raster_srs = osr.SpatialReference()
        raster_srs.ImportFromWkt(raster.GetProjectionRef())
        target_ds.SetProjection(raster_srs.ExportToWkt())

        # Rasterize zone polygon to raster
        gdal.RasterizeLayer(target_ds, [1], layer, burn_values=[1], options = ["ALL_TOUCHED=TRUE"]) #, options = ["ALL_TOUCHED=TRUE", "BURN_VALUE_FROM"]);

        # Read raster as arrays
        banddataraster = raster.GetRasterBand(1)
        dataraster = banddataraster.ReadAsArray(xoff, yoff, xcount, ycount).astype(numpy.int16)

        bandmask = target_ds.GetRasterBand(1)
        datamask = bandmask.ReadAsArray(0, 0, xcount, ycount).astype(numpy.int16)

        zoneraster = dataraster[numpy.logical_and(datamask==1, dataraster>0)]

        return numpy.mean(zoneraster/10000.0)

    else:
        centroid = geometry.Centroid()
        x = centroid.GetX()
        y = centroid.GetY()

        xoff = int((x - xOrigin)/pixelWidth)
        yoff = int((yOrigin - y)/pixelWidth)

        banddataraster = raster.GetRasterBand(1)
        dataraster = banddataraster.ReadAsArray(xoff, yoff, 1, 1).astype(numpy.int16)

        return numpy.mean(dataraster/10000.0)

connPostgis = "PG: host=%s port=%s dbname=%s user=%s password=%s" \
        % ('localhost', '5432', 'fip_cerrado', 'postgres',\
            'postgres')

print(connPostgis)
postgis = ogr.Open(connPostgis)

table_name = 'prodes_cerrado'
layer = postgis.GetLayer(table_name)

imageSmall = 'INPUT/deforestation_probability_small_pol_nodata.tif'
imageBig = 'INPUT/deforestation_probability_big_pol_nodata.tif'

for feature in layer:
    id = feature.GetField("gid")

    meanSmall = zonal_mean(imageSmall, feature, layer.GetSpatialRef())
    if not numpy.isnan(meanSmall):
        sql = 'UPDATE ' + table_name + ' SET sucept_desmat_peq = %s WHERE gid = %s;' % (meanSmall, id)
        postgis.ExecuteSQL(sql)
        print('Alert %s => sucept_desmat_peq %s' % (id, meanSmall) )

    meanBig = zonal_mean(imageBig, feature, layer.GetSpatialRef())
    if not numpy.isnan(meanBig):
        sql = 'UPDATE ' + table_name + ' SET sucept_desmat_grd = %s WHERE gid = %s;' % (meanBig, id)
        postgis.ExecuteSQL(sql)
        print('Alert %s => sucept_desmat_grd %s' % (id, meanBig) )


# UPDATE prodes_cerrado_2000_2018_full SET sucept_desmat = GREATEST(sucept_desmat_peq, sucept_desmat_grd) 
# WHERE sucept_desmat_peq IS NOT NULL OR sucept_desmat_grd IS NOT NULL;