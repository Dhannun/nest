import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
    private episodes: Episode[] = [];

    async findAll(sort: 'asc' | 'desc' = 'desc', limit: number): Promise<Episode[]> {
        const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
        const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

        return sort === 'asc' 
        ? this.episodes.sort(sortAsc).slice(0, limit) 
        : this.episodes.sort(sortDesc).slice(0, limit);
    }

    async findFeatured(): Promise<Episode[]> {
        return this.episodes.filter(episode => episode.featured);
    }

    async findOne(id: string): Promise<Episode> {
        return this.episodes.find(episode => episode.id === id);
    }

    async create(input: CreateEpisodeDto): Promise<Episode> {
        const newEpisode: Episode = { id: randomUUID(), ...input };
        this.episodes.push(newEpisode);

        return newEpisode;
    }

    async updateOne(id: string, input: CreateEpisodeDto): Promise<Episode> {
        const episode = this.episodes.find(episode => episode.id === id);

        if (!episode) {
            throw new NotFoundException('Episode not found');
        }

        Object.assign(episode, input);

        return episode;
    }

    async deleteOne(id: string): Promise<Episode> {
        const episode = this.episodes.find(episode => episode.id === id);

        if (!episode) {
            throw new NotFoundException('Episode not found');
        }

        this.episodes = this.episodes.filter(episode => episode.id !== id);

        return episode;
    }
}
