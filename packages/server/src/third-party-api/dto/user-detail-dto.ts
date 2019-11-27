export interface UserDetailDto {
  readonly email: string;
  readonly avatar: string;
  readonly location?: string;
  readonly reposUrl?: string;
  readonly company?: string;
  readonly githubId?: number;
}
