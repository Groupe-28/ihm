import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GeoService } from './geo.service';

@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get()
  async listGeoObjects() {
    return this.geoService.listGeoObjects();
  }

  @Post()
  async createGeoObject(@Body() data: Prisma.GeoObjectCreateInput) {
    return this.geoService.createGeoObject(data);
  }

  @Post('point/actions/:geoPointId')
  async addGeoActionsToGeoPoint(
    @Body() geoAction: Prisma.GeoActionCreateInput,
    @Param('geoPointId') geoPointId: string,
  ) {
    return this.geoService.addGeoActionsToGeoPoint(geoPointId, geoAction);
  }
}
