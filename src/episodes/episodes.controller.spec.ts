import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from '../config/config.module';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();

  const mockEpisodesService = {
    findAll: async () => [{id: '1', title: 'Find All Episode'}],
    findFeatured: async () => [{id: '1', title: 'Featured Episode', featured: true}],
    findOne: mockFindOne,
    // findOne: async (id: string) => ({id, title: 'Find One Episode'}),
    create: async (input: {title: string}) => ({id: '1', ...input}),
    updateOne: async (id: string, input: {title: string}) => ({id, ...input}),
    deleteOne: async (id: string) => ({id, title: 'Deleted Episode'})
  }

  beforeEach(async () => {
    jest.clearAllMocks(); // to clear and have fresh mocks values for each test
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{
        provide: EpisodesService, 
        useValue: mockEpisodesService
      }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of episodes', async () => {
      expect(await controller.findAll('asc', 10)).toEqual([{id: '1', title: 'Find All Episode'}]);
    });
  });

  describe('findFeatured', () => {
    it('should return an array of featured episodes', async () => {
      expect(await controller.findFeatured()).toEqual([{id: '1', title: 'Featured Episode', featured: true}]);
    });
  });

  describe('findOne', () => {
    describe('when episode exists', () => {
      const episodeId = '1';
      const mockResult = {id: episodeId, title: 'New Episode'};

      beforeEach(() => {
        mockFindOne.mockReturnValueOnce(mockResult); // to mock the return value of findOne method
      });

      it('should call findOne with the correct id', async () => {
        await controller.findOne(episodeId);
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      });

      it('should return an episode', async () => {
        expect(await controller.findOne(episodeId)).toEqual(mockResult);
      });
      
      // it('should return an episode', async () => {
      //   expect(await controller.findOne('1')).toEqual({id: '1', title: 'Find One Episode'});
      // });
    });

    describe('when episode does not exist', () => {
      const episodeId = '2';

      beforeEach(() => {
        mockFindOne.mockResolvedValue(null); // to mock the return value of findOne method
      });

      it('should throw an error', async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow('Episode not found');
      });
    });
    
  });
  
  describe('create', () => {
    it('should create an episode', async () => {
      expect(await controller.create({title: 'New Episode'} as any)).toEqual({id: '1', title: 'New Episode'});
    });
  });

  describe('updateOne', () => {
    it('should update an episode', async () => {
      expect(await controller.updateOne('1', {title: 'Updated Episode'} as any)).toEqual({id: '1', title: 'Updated Episode'});
    });
  });

  describe('deleteOne', () => {
    it('should delete an episode', async () => {
      expect(await controller.deleteOne('1')).toEqual({id: '1', title: 'Deleted Episode'});
    });
  });
});
