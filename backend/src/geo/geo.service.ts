import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LogsService } from 'src/logs/logs.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GeoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logsService: LogsService,
  ) {}

  async listGeoObjects() {
    const geoObjects = await this.prismaService.geoObject.findMany({
      include: {
        points: {
          include: {
            geoActions: true,
          },
        },
      },
    });
    this.logsService.createLog({
      title: 'listGeoObjects',
      content: JSON.stringify(geoObjects),
    });
    return geoObjects;
  }

  async createGeoObject(data: Prisma.GeoObjectCreateInput) {
    const geoObject = await this.prismaService.geoObject.create({
      data,
    });
    this.logsService.createLog({
      title: 'createGeoObject',
      content: JSON.stringify(geoObject),
    });
    return geoObject;
  }

  async addGeoActionsToGeoPoint(
    geoPointId: string,
    geoAction: Prisma.GeoActionCreateInput,
  ) {
    console.log(geoPointId, geoAction);
    const geoPoint = await this.prismaService.point.update({
      where: {
        id: parseInt(geoPointId),
      },
      data: {
        geoActions: {
          create: geoAction,
        },
      },
      include: {
        geoActions: true,
      },
    });

    this.logsService.createLog({
      title: 'addGeoActionsToGeoPoint',
      content: JSON.stringify(geoPoint),
    });

    return geoPoint;
  }
}
