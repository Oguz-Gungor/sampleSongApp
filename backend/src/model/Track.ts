export interface ITrack {
  track: string;
  album: string;
  artist: string;
}

export const tracks: { [key: number]: ITrack[] } = {
  1: [
    {
      track: "Under A Violet Moon",
      album: "Under A Violet Moon",
      artist: "Blackmore's Night",
    },
    { track: "City of the Dead", album: "Arcadia", artist: "Eurielle" },
  ],
  2: [
    {
      track: "Fade To Black",
      album: "Ride The Lightning",
      artist: "Metallica",
    },
    { track: "One", album: "And Justice for All", artist: "Metallica" },
    {
      track: "Wasted Years",
      album: "Somewhere in Time",
      artist: "Iron Maiden",
    },
  ],
};
