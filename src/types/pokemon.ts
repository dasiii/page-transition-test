export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface ListResponse {
  name: string;
  url: string;
}

export interface DetailResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        "front-default": string;
      };
    };
  };
}
