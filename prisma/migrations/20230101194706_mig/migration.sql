-- CreateTable
CREATE TABLE "journey" (
    "id" SERIAL NOT NULL,
    "departure" TIMESTAMP(6) NOT NULL,
    "return" TIMESTAMP(6) NOT NULL,
    "departure_station_id" INTEGER NOT NULL,
    "departure_station_name" VARCHAR NOT NULL,
    "return_station_id" INTEGER NOT NULL,
    "return_station_name" VARCHAR NOT NULL,
    "covered_distance" DOUBLE PRECISION,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "journey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stationDetails" (
    "id" INTEGER NOT NULL,
    "station_id" INTEGER NOT NULL,
    "nimi" VARCHAR NOT NULL,
    "namn" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "osoite" VARCHAR NOT NULL,
    "adress" VARCHAR NOT NULL,
    "kaupunki" VARCHAR,
    "stad" VARCHAR,
    "operaattor" VARCHAR,
    "Kapasiteet" VARCHAR NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "stationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stationDetails_station_id_key" ON "stationDetails"("station_id");
