import { Body, Controller, DefaultValuePipe, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from 'src/pipes/is-positive.pipe';
import { ApiKeyGuard } from 'src/guards/api-key/api-key.guard';

// @UseGuards(ApiKeyGuard)
@Controller('episodes')
export class EpisodesController {
    constructor(
        private episodeService: EpisodesService,
        private configService: ConfigService
    ) {}

    @Get()
    findAll(
        @Query('sort') sort: 'asc' | 'desc' = 'desc',
        @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number
    ) {
        console.log(sort, limit);
        return this.episodeService.findAll(sort, limit);
    }

    @Get('featured')
    findFeatured() {
        return this.episodeService.findFeatured();
    }

    @Get(':id')
    async findOne(@Param() id: string) {
        console.log(id);
        const episode = await this.episodeService.findOne(id);

        if (!episode) {
            throw new NotFoundException('Episode not found');
        }

        return episode;
    }

    @UseGuards(ApiKeyGuard)
    @Post()
    create(@Body(ValidationPipe) input: CreateEpisodeDto) {
        console.log(input);
        return this.episodeService.create(input);
    }

    @Put(':id')
    updateOne(@Param() id: string, @Body() input: CreateEpisodeDto) {
        console.log(id);
        return this.episodeService.updateOne(id, input);
    }

    @Delete(':id')
    deleteOne(@Param() id: string) {
        console.log(id)
        return this.episodeService.deleteOne(id);
    }
}
