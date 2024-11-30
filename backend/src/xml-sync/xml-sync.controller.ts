import { Controller, Post } from '@nestjs/common';
import { XmlSyncService } from './xml-sync.service';

@Controller('xml-sync')
export class XmlSyncController {
  constructor(private readonly xmlSyncService: XmlSyncService) {}

  @Post('manual-sync')
  async triggerSync() {
    await this.xmlSyncService.syncData();
    return { message: 'Sync triggered successfully' };
  }
} 