export interface PostObject {
	Id: string | null;
	Url: string;
	Title: string;
	Tags: string[];
	Date: Date;
	MarkDown: string;
	Html: string;
	Visibility: string;
}

export interface ListEntry {
	Id: string;
	Url: string;
	Title: string;
	Date: Date;
	Tags: string[];
}

export interface StaticPost {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	visibility: string;
}

export interface StaticPostDetail extends StaticPost {
	html: string;
}
