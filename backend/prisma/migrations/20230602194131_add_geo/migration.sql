-- CreateTable
CREATE TABLE "GeoObject" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "GeoObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "geoObjectId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoAction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GeoAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GeoActionToPoint" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GeoActionToPoint_AB_unique" ON "_GeoActionToPoint"("A", "B");

-- CreateIndex
CREATE INDEX "_GeoActionToPoint_B_index" ON "_GeoActionToPoint"("B");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_geoObjectId_fkey" FOREIGN KEY ("geoObjectId") REFERENCES "GeoObject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GeoActionToPoint" ADD CONSTRAINT "_GeoActionToPoint_A_fkey" FOREIGN KEY ("A") REFERENCES "GeoAction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GeoActionToPoint" ADD CONSTRAINT "_GeoActionToPoint_B_fkey" FOREIGN KEY ("B") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE;
