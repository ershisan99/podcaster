class BypassCorsService {
  async fetchBypassingCors(url: string) {
    return await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    );
  }
}

export const bypassCorsService = new BypassCorsService();
