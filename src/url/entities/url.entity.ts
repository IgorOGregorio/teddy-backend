import { BadRequestException } from '@nestjs/common';

export interface urlProps {
  url: string;
  shortUrl: string;
  accessCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Url {
  id: string;
  props: urlProps;

  constructor(props: urlProps, id?: string) {
    this.id = id || crypto.randomUUID();
    this.props = props;
  }

  get url() {
    return this.props.url;
  }

  get shortUrl() {
    return this.props.shortUrl;
  }

  get accessCount() {
    return this.props.accessCount;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  updateUrl(url: string) {
    if (this.props.deletedAt)
      throw new BadRequestException('Cannot update a deleted URL');

    this.props.url = url;
  }

  incrementAccessCount() {
    if (this.props.deletedAt)
      throw new BadRequestException('Cannot update a deleted URL');
    this.props.accessCount += 1;
  }

  delete() {
    if (this.props.deletedAt)
      throw new BadRequestException('URL already deleted');
    this.props.deletedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      url: this.url,
      shortUrl: this.shortUrl,
      accessCount: this.accessCount,
      createdAt: this.createdAt.toLocaleString(process.env.TZ),
      updatedAt: this.updatedAt.toLocaleString(process.env.TZ),
      deletedAt: this.deletedAt
        ? this.deletedAt.toLocaleString(process.env.TZ)
        : null,
    };
  }
}
