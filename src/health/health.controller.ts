import { Controller, Get } from '@nestjs/common';
import { timestamp } from 'rxjs';

@Controller('health')
export class HealthController {
    @Get()
    check(){
        return {
            status: 'ok',
            uptime: Math.round(process.uptime()),
            timestamp: new Date().toISOString()
        }
    }
}
