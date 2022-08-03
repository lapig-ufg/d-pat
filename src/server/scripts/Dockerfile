FROM debian:buster-slim

#If you change ubuntu version, don't forget to change 3 echo lines 
LABEL Renato Gomes<renatogomessilverio@gmail.com>

ENV LANG C.UTF-8

# Update and upgrade system
RUN apt-get -qq update --fix-missing && apt-get -qq --yes upgrade

# Clone app and npm install on server
ENV URL_TO_APPLICATION_GITHUB="https://github.com/lapig-ufg/d-pat.git"
ENV BRANCH="master"

WORKDIR /APP

# Install GDAL dependencies
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y wget git bzip2 curl build-essential libgdal-dev libcurl4 \
                                                    python3.7 python3-pip gdal-bin=2.4.0+dfsg-1+b1 \
                                                    procps net-tools r-base libudunits2-dev libgdal-dev \
                                                    libgeos-dev libproj-dev libfontconfig1-dev  r-base-dev \
                                                    r-cran-raster && \ 
                                                    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \ 
                                                    apt-get update && apt-get install -y nodejs && \
                                                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
                                                    apt-get clean && rm -rf /var/lib/apt/lists/* && \
                                                    rm -rf /tmp/* /var/tmp/* && \ 
                                                    cd /APP && git clone -b ${BRANCH} ${URL_TO_APPLICATION_GITHUB} && \
                                                    Rscript -e 'install.packages("rgdal", repos="https://cloud.r-project.org")' && \
                                                    pip3 install GDAL==2.4.0


# Update C env vars so compiler can find gdal
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
