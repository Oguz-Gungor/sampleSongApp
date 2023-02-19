export interface IPlaylist {
  id: number;
  name: string;
  trackCount: number;
}

export const playlists: IPlaylist[] = [
  {
    id: 1,
    name: "Bard",
    trackCount: 2,
  },
  {
    id: 2,
    name: "Metal",
    trackCount: 3,
  },
];
