import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsService.create(req.user, createAlarmDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req) {
    return this.alarmsService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Req() req, @Param('id') id: string) {
    return this.alarmsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateAlarmDto: UpdateAlarmDto,
  ) {
    return this.alarmsService.update(req.user.id, id, updateAlarmDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Req() req, @Param('id') id: string) {
    return this.alarmsService.remove(req.user.id, id);
  }
}
