export interface PostObject {
    Id: string | null,
    Url: string,
    Title: string,
    Tags: string[],
    Date: Date,
    MarkDown: string,
    Html: string
}

export interface ListEntry {
    Id: string,
    Url: string,
    Title: string,
    Date: Date,
    Tags: string[]
}