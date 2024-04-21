class BypassCorsService {
  async fetchBypassingCors(url: string, init?: RequestInit) {
    return await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      init,
    );
  }
}

export const bypassCorsService = new BypassCorsService();
