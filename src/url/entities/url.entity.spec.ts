import { Url } from './url.entity';

describe('UrlEntity', () => {
  it('create a url', () => {
    const urlProps = {
      url: 'https://www.google.com',
      shortUrl: 'https://short.url',
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const url = new Url(urlProps);

    expect(url.id).toBeDefined();
    expect(url.url).toBe(urlProps.url);
    expect(url.shortUrl).toBe(urlProps.shortUrl);
    expect(url.accessCount).toBe(urlProps.accessCount);
    expect(url.createdAt).toBe(urlProps.createdAt);
    expect(url.updatedAt).toBe(urlProps.updatedAt);
    expect(url.deletedAt).toBe(urlProps.deletedAt);
  });

  it('update url', () => {
    const urlProps = {
      url: 'https://www.google.com',
      shortUrl: 'https://short.url',
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const url = new Url(urlProps);

    url.updateUrl('https://www.facebook.com');

    expect(url.url).toBe('https://www.facebook.com');
  });

  it('should not update url if deleted', () => {
    const urlProps = {
      url: 'https://www.google.com',
      shortUrl: 'https://short.url',
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const url = new Url(urlProps);

    expect(() => url.updateUrl('https://www.facebook.com')).toThrow(
      new Error('Cannot update a deleted URL'),
    );
  });

  it('increment access count', () => {
    const urlProps = {
      url: 'https://www.google.com',
      shortUrl: 'https://short.url',
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const url = new Url(urlProps);

    url.incrementAccessCount();

    expect(url.accessCount).toBe(1);
  });

  it('should not increment access count if deleted', () => {
    const urlProps = {
      url: 'https://www.google.com',
      shortUrl: 'https://short.url',
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const url = new Url(urlProps);

    expect(() => url.incrementAccessCount()).toThrow(
      new Error('Cannot update a deleted URL'),
    );
  });

  it('delete url', () => {
    const urlProps = {
      url: 'https://www.google.com',
      shortUrl: 'https://short.url',
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const url = new Url(urlProps);

    url.delete();

    expect(url.deletedAt).toBeInstanceOf(Date);
  });

  it('should not delete url if deleted', () => {
    const urlProps = {
      url: 'https://www.google.com',
      shortUrl: 'https://short.url',
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const url = new Url(urlProps);

    expect(() => url.delete()).toThrow(new Error('URL already deleted'));
  });
});
