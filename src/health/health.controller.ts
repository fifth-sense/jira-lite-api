import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
    constructor(private readonly dataSource: DataSource){}

    @Get()
    check(){
        return {
            status: 'ok',
            uptime: Math.round(process.uptime()),
            timestamp: new Date().toISOString()
        }
    }

    @Get('ready')
    async ready(){
        try{
            await this.dataSource.query('SELECT 1 ');
            return {status: 'ready', database: 'Up'};
        }catch{
            throw new ServiceUnavailableException({satus:'not ready', database: 'down'})
        }

    }
}
