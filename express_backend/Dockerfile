# Definieren des Basis Docker Images (waaaay mor elightweight than the official node :) )
FROM alpine

# Install node on alpine Linux
RUN apk add --update nodejs npm

# Erstellen des Anwendungsverzeichnisses
WORKDIR /usr/src/app

# Kopieren der Konfigurationsdateien
# package.json und package-lock.json
COPY package*.json ./

# Installieren der Abhängigkeiten
RUN npm install
# Alternativ im Produktivsystem:
# RUN npm install --production

# Kopieren der Quelltextdateien
COPY . .

# Freigeben des Ports, unter dem der
# Express-Server läuft
EXPOSE 10091-10093
EXPOSE 10095-10096

# Starten des definierten npm-Scripts
CMD [ "npm", "start" ]
# Alternativ Starten im Debug-Modus
# CMD [ "npm", "start:debug" ]
