#!/bin/bash

  echo '
   ____     ______  ______   ____     ______   
  /\  _`\  /\__  _\/\  _  \ /\  _`\  /\__  _\  
  \ \,\L\_\\/_/\ \/\ \ \L\ \\ \ \L\ \\/_/\ \/  
   \/_\__ \   \ \ \ \ \  __ \\ \ ,  /   \ \ \  
     /\ \L\ \  \ \ \ \ \ \/\ \\ \ \\ \   \ \ \ 
     \ `\____\  \ \_\ \ \_\ \_\\ \_\ \_\  \ \_\
      \/_____/   \/_/  \/_/\/_/ \/_/\/ /   \/_/
                                               .'
   sleep 1
   clear 


  echo '
   ____     ______  ______   ____     ______   
  /\  _`\  /\__  _\/\  _  \ /\  _`\  /\__  _\  
  \ \,\L\_\\/_/\ \/\ \ \L\ \\ \ \L\ \\/_/\ \/  
   \/_\__ \   \ \ \ \ \  __ \\ \ ,  /   \ \ \  
     /\ \L\ \  \ \ \ \ \ \/\ \\ \ \\ \   \ \ \ 
     \ `\____\  \ \_\ \ \_\ \_\\ \_\ \_\  \ \_\
      \/_____/   \/_/  \/_/\/_/ \/_/\/ /   \/_/
                                               ..'
   sleep 1
   clear   


  echo '
   ____     ______  ______   ____     ______   
  /\  _`\  /\__  _\/\  _  \ /\  _`\  /\__  _\  
  \ \,\L\_\\/_/\ \/\ \ \L\ \\ \ \L\ \\/_/\ \/  
   \/_\__ \   \ \ \ \ \  __ \\ \ ,  /   \ \ \  
     /\ \L\ \  \ \ \ \ \ \/\ \\ \ \\ \   \ \ \ 
     \ `\____\  \ \_\ \ \_\ \_\\ \_\ \_\  \ \_\
      \/_____/   \/_/  \/_/\/_/ \/_/\/ /   \/_/
                                               ...'
   sleep 1
   clear  

echo -e "\e[37;41m Verificando se o python2.7.18 já não existe no sistema!.\e[0m"
sleep 2
clear
echo -e "\e[37;41m Verificando se o python2.7.18 já não existe no sistema!..\e[0m"
sleep 2
clear
echo -e "\e[37;41m Verificando se o python2.7.18 já não existe no sistema!...\e[0m"
sleep 2
clear

#Verifica se o python 3.7 já está instalado no sistema.

DIR=/usr/local/bin/
FILE=python2.7.18

if [ -e "$DIR$FILE" ] ; then
echo -e "\e[37;41m O python2.7.18 já está instalado no sistema!\e[0m"
sleep 2
echo ""
echo ""
echo -e "\e[37;41m Fim do Programa.\e[0m"
exit 0
else
echo -e "\e[37;41m O python2.7.18 não está instalando no sistema!\e[0m"
fi

#Se não estiver inicia o processo de instalação

sleep 1
clear
echo -e "\e[37;41mInstalando dependencias\e[0m"
sleep 1
clear
echo -e  "\e[37;41mInstalando dependencias.\e[0m"
sleep 1
clear
echo -e "\e[37;41mInstalando dependencias..\e[0m"
sleep 1
clear
echo -e "\e[37;41mInstalando dependencias...\e[0m"
sleep 1
clear

#Instalando dependencias

 apt-get update
 apt-get -y install build-essential python-dev python-setuptools python-pip python-smbus
 apt-get -y install libncursesw5-dev libgdbm-dev libc6-dev g++ make c++ 
 apt-get -y install zlib1g-dev libsqlite3-dev tk-dev
 apt-get -y install libssl-dev openssl
 apt-get -y install libffi-dev
 apt-get -y install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
clear

#Baixa, Configura e instala o python

echo -e "\e[37;41mBaixando e configurando o python 2.7.18.\e[0m"
sleep 1
clear
echo -e "\e[37;41mBaixando e configurando o python 2.7.18..\e[0m"
sleep 1
clear
echo -e "\e[37;41mBaixando e configurando o python 2.7.18...\e[0m"
sleep 1
clear

cd /tmp 
wget https://www.python.org/ftp/python/2.7.18/Python-2.7.18.tar.xz
tar -xvf Python-2.7.18.tar.xz 
cd  Python-2.7.18/
./configure --enable-optimizations
make -j 4
make altinstall
clear

#Instala o pip3 

echo -e "\e[37;41mInstalando pip3 para python2.7.18.\e[0m"
sleep 1 
clear
echo -e "\e[37;41mInstalando pip3 para python2.7.18..\e[0m"
sleep 1
clear
echo -e "\e[37;41mInstalando pip3 para python2.7.18...\e[0m"
sleep 1
clear

apt-get update
apt-get -y install python-pip
clear


INSTALL_PKGS="libgdal-dev
gdal-bin
python-gdal
python-numpy 
python-scipy
"
for i in $INSTALL_PKGS; do
    apt-get install -y $i
done

pip install GDAL

echo -e "\e[37;41mAdicionando o python2 como principal ao executar o comando: python\e[0m"
sleep 1

echo -e "alias python=\"python2.7\"" >> ~/.bashrc
exec bash
clear



