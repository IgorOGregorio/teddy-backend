import { Url } from './entities/url.entity';
import { CreateUrlService } from './services/createUrl/createUrl.service';
import { DeleteUrlService } from './services/deleteUrl/deleteUrl.service';
import { FindUrlsByUserIdService } from './services/findUrlsByUserId/findUrlsByUserId.service';
import { UpdateUrlService } from './services/updateUrl/updateUrl.service';
import { UrlController } from './url.controller';
import { urlModuleTest } from './utils/urlModuleTest';

describe('UrlController', () => {
  let controller: UrlController;
  let createUrlService: CreateUrlService;
  let findUrlsByUserId: FindUrlsByUserIdService;
  let updateUrlService: UpdateUrlService;
  let deleteUrlService: DeleteUrlService;
  beforeEach(async () => {
    const module = await urlModuleTest();

    controller = module.get<UrlController>(UrlController);
    createUrlService = module.get<CreateUrlService>(CreateUrlService);
    findUrlsByUserId = module.get<FindUrlsByUserIdService>(
      FindUrlsByUserIdService,
    );
    updateUrlService = module.get<UpdateUrlService>(UpdateUrlService);
    deleteUrlService = module.get<DeleteUrlService>(DeleteUrlService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create Url', async () => {
    const id = crypto.randomUUID();
    const result = new Url(
      {
        url: 'https://www.google.com',
        shortUrl: '123456',
        accessCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      id,
    );

    jest.spyOn(createUrlService, 'execute').mockImplementation(async () => {
      return result;
    });

    expect(
      await controller.create({
        url: 'https://www.google.com',
      }),
    ).toStrictEqual({
      id: result.id,
      ...result.props,
      shortUrl: `http://localhost:3000/${result.shortUrl}`,
    });
  });

  it('should list Urls for a user', async () => {
    const id = crypto.randomUUID();
    const result = [
      new Url(
        {
          url: 'https://www.google.com',
          shortUrl: '123456',
          accessCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        id,
      ),
    ];

    jest.spyOn(findUrlsByUserId, 'execute').mockImplementation(async () => {
      return result;
    });

    const userPayload = {
      id: crypto.randomUUID(),
      email: 'user@example.com',
      iat: 123213123,
      exp: 3123,
    };

    expect(await controller.findUrlsByUser(userPayload)).toStrictEqual([
      {
        id: result[0].id,
        ...result[0].props,
        shortUrl: `http://localhost:3000/${result[0].shortUrl}`,
      },
    ]);
  });

  it('should update Url', async () => {
    const id = crypto.randomUUID();
    const result = new Url(
      {
        url: 'https://www.linkedin.com',
        shortUrl: '123456',
        accessCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      id,
    );

    jest.spyOn(updateUrlService, 'execute').mockImplementation(async () => {
      return result;
    });

    const userPayload = {
      id: crypto.randomUUID(),
      email: 'user@example.com',
      iat: 123213123,
      exp: 3123,
    };

    const controllerResult = await controller.updateUrl(
      {
        url: 'https://www.linkedin.com',
      },
      userPayload,
      id,
    );

    expect(controllerResult.url).toBe('https://www.linkedin.com');
  });

  it('should delete Url', async () => {
    const id = crypto.randomUUID();
    const result = { message: 'Url deleted' };

    jest.spyOn(deleteUrlService, 'execute').mockImplementation(async () => {
      return result;
    });

    const userPayload = {
      id: crypto.randomUUID(),
      email: 'user@example.com',
      iat: 123213123,
      exp: 3123,
    };

    const controllerResult = await controller.deleteUrl(userPayload, id);

    expect(controllerResult).toStrictEqual({ message: 'Url deleted' });
  });
});
