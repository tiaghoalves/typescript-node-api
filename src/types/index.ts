/* eslint-disable camelcase */
export interface ApiResponse {
  data: ApiData;
}

export interface ApiData {
  login: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  techs?: string[];
  latitude?: number;
  longitude?: number;
}

export interface IPostRequestBody {
  github_username: string;
  techs: string;
  latitude: number;
  longitude: number;
}

export interface IRequestQuery {
  latitude?: number;
  longitude?: number;
  techs?: string;
}

export interface IPutRequestParams {
  id?: string;
}

export interface IPutRequestBody {
  name?: string;
  techs?: string;
  bio?: string;
  avatar_url?: string;
  latitude?: number;
  longitude?: number;
}
