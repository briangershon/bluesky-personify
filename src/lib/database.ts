import { PrismaClient, profile } from '@prisma/client';

export interface NewProfile {
  did: string;
  handle: string;
  description?: string;
  displayname?: string;
  avatar?: string;
  postscount?: number;
  persona: string;
}

export class Database {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createProfile(profile: NewProfile) {
    return this.prisma.profile.create({ data: profile });
  }

  async getProfile(did: string): Promise<profile | null> {
    return this.prisma.profile.findUnique({
      where: {
        did,
      },
    });
  }
}
