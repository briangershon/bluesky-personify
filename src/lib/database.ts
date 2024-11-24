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

export interface ProfileAbbreviatedFields {
  handle: string;
  displayname: string | null;
  updated_at: string;
  description: string | null;
  avatar: string | null;
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

  /**
   * Grabs latest 20 profiles.
   */
  async mostRecentProfiles(): Promise<ProfileAbbreviatedFields[]> {
    const profiles = await this.prisma.profile.findMany({
      select: {
        handle: true,
        displayname: true,
        updated_at: true,
        postscount: true,
        description: true,
        avatar: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
      take: 20,
    });

    return profiles.map((profile) => ({
      ...profile,
      updated_at: profile.updated_at.toISOString(),
    }));
  }
}
