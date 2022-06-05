export class Principal {
  token: string;
  user: {email?: string}
  logo: string;
  safeLogo: any;

	authorities : string[];
	indexInMultiUsers: number;
}
